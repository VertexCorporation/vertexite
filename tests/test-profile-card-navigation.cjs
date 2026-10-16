const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const path = require('node:path');
const http = require('node:http');
const fs = require('node:fs');

const root = path.resolve(__dirname, '..');

// Production Cloud Function JSON response fixture
const prodApiResponse = {
  result: {
    staff: [{ name: 'Mustafa Çakı' }, { name: 'Ekin Burçak Korkmaz' }],
    mods: [{ name: 'Emir Atik' }],
    chefs: [{ name: 'Mustafa Çakı' }],
    honors: [{ name: 'Selim Doğan' }],
    cards: [
      {
        name: 'Mustafa Çakı',
        position: 'Kurucu',
        imageUrl: 'https://firebasestorage.googleapis.com/v0/b/vertex-ai-1618.firebasestorage.app/o/site-team%2Fphotos%2Fdb872ce9a22c4f2a23157b2d49be75c7231428d6776171c00d98c9c59b7811ff.webp?alt=media&token=532f86d8-fc9a-4b33-b709-20bc5bab4e96',
        links: [
          { label: 'LinkedIn', url: 'https://www.linkedin.com/in/mustawtfa/' },
          { label: 'Instagram', url: 'https://www.instagram.com/mustawtfa/' }
        ]
      },
      {
        name: 'Uras Baz',
        position: 'CTO',
        imageUrl: 'https://vertexishere.com/assets/team/mehmet_uras.jpg',
        links: []
      },
      {
        name: 'Ekin Burçak Korkmaz',
        position: 'Chief Operating Officer',
        imageUrl: 'https://vertexishere.com/assets/team/ekin_burcak.jpeg',
        links: [
          { label: 'LinkedIn', url: 'https://www.linkedin.com/in/ekin-bur%C3%A7ak-korkmaz-1aa9ba3a7' }
        ]
      }
    ]
  }
};

// Start local test server
const server = http.createServer((req, res) => {
  let pathname = new URL(req.url, 'http://localhost').pathname;
  if (pathname.includes('/team/mustafa-caki')) {
    pathname = pathname.replace('/team/mustafa-caki', '/mustafa-caki');
  }
  let file = path.resolve(root, '.' + pathname);
  if (!file.startsWith(root + '/')) { res.statusCode = 403; return res.end(); }
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) {
    file = path.join(file, 'index.html');
  } else {
    const clean = file.replace(/\/+$/, '');
    if (!path.extname(clean) && fs.existsSync(clean + '.html')) file = clean + '.html';
    else if (!path.extname(file) && fs.existsSync(file + '.html')) file += '.html';
  }
  fs.readFile(file, (e, b) => {
    res.statusCode = e ? 404 : 200;
    res.setHeader('Content-Type', ({
      '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
      '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp',
      '.woff2': 'font/woff2', '.xml': 'application/xml'
    })[path.extname(file)] || 'text/html');
    res.end(e ? '' : b);
  });
});

(async () => {
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const port = server.address().port;
  const baseUrl = `http://127.0.0.1:${port}`;
  console.log(`Test server running at ${baseUrl}`);

  const browser = await chromium.launch({
    headless: true,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
  });

  try {
    // ----------------------------------------------------
    // TEST 1: URL routing and 404 prevention
    // ----------------------------------------------------
    console.log('\n--- TEST 1: Direct URL Routing & 404 Prevention ---');
    const testUrls = [
      '/en/mustafa-caki',
      '/en/mustafa-caki/',
      '/en/team/mustafa-caki',
      '/en/team/mustafa-caki/',
      '/tr/mustafa-caki',
      '/tr/mustafa-caki/',
      '/tr/team/mustafa-caki',
      '/tr/team/mustafa-caki/'
    ];
    for (const u of testUrls) {
      const page = await browser.newPage();
      const res = await page.goto(`${baseUrl}${u}`);
      assert.equal(res.status(), 200, `Expected 200 for ${u}, got ${res.status()}`);
      assert(await page.locator('.profile-bio').isVisible(), `Profile bio should be visible on ${u}`);
      await page.close();
      console.log(`PASS: Direct access ${u} returned 200 OK`);
    }

    // ----------------------------------------------------
    // TEST 2: Dynamic team rendering in TR & EN
    // ----------------------------------------------------
    for (const lang of ['tr', 'en']) {
      console.log(`\n--- TEST 2: Dynamic Team Rendering (${lang.toUpperCase()}) ---`);
      const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

      // Route the backend endpoint with real production JSON fixture
      await page.route('https://listsiteteam-o5h7dmtija-ew.a.run.app/', route => {
        route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(prodApiResponse)
        });
      });

      await page.goto(`${baseUrl}/${lang}/`);
      await page.waitForSelector('#teamTrack .team-card:not(.skeleton)');

      // Card 0 is Mustafa Çakı
      const mustafaCard = page.locator('#teamTrack .team-card').nth(0);
      assert(await mustafaCard.evaluate(el => el.classList.contains('has-profile')), 'Mustafa card must have has-profile class');
      assert.equal(await mustafaCard.evaluate(el => getComputedStyle(el).cursor), 'pointer', 'Mustafa card cursor should be pointer');

      // Check URL on the profile link
      const profileLink = mustafaCard.locator('.team-profile-link').last();
      const expectedHref = `/${lang}/mustafa-caki`;
      const actualHref = await profileLink.getAttribute('href');
      assert.equal(actualHref, expectedHref, `Expected link href ${expectedHref}, got ${actualHref}`);

      // Card 1 is Uras Baz (no profile)
      const urasCard = page.locator('#teamTrack .team-card').nth(1);
      assert(await urasCard.evaluate(el => el.classList.contains('profile-unavailable')), 'Uras card must have profile-unavailable class');
      assert.equal(await urasCard.evaluate(el => getComputedStyle(el).cursor), 'default', 'Uras card cursor should be default');
      assert.equal(await urasCard.locator('.team-profile-link').count(), 0, 'Uras card must not have profile link');

      console.log(`PASS: Dynamic cards properly classified in ${lang}`);

      // ----------------------------------------------------
      // TEST 3: Click tests on Mustafa Çakı's card
      // ----------------------------------------------------
      console.log(`\n--- TEST 3: Click behavior tests on Mustafa Card (${lang.toUpperCase()}) ---`);

      // 3A: Click on PHOTO region
      console.log('Testing click on photo region...');
      await mustafaCard.click({ position: { x: 50, y: 50 } });
      await page.waitForURL(new RegExp(`/${lang}/mustafa-caki`));
      console.log('PASS: Click on photo region navigated to profile');

      // Go back
      await page.goBack();
      await page.waitForSelector('#teamTrack .team-card:not(.skeleton)');

      // 3B: Click on NAME
      console.log('Testing click on name text...');
      const mustafaCard2 = page.locator('#teamTrack .team-card').nth(0);
      await mustafaCard2.locator('h3 a').click();
      await page.waitForURL(new RegExp(`/${lang}/mustafa-caki`));
      console.log('PASS: Click on name navigated to profile');

      // Go back
      await page.goBack();
      await page.waitForSelector('#teamTrack .team-card:not(.skeleton)');

      // 3C: Click on EMPTY AREA / CARD CORNER
      console.log('Testing click on card corner/empty area (8, 8)...');
      const mustafaCard3 = page.locator('#teamTrack .team-card').nth(0);
      await mustafaCard3.click({ position: { x: 8, y: 8 } });
      await page.waitForURL(new RegExp(`/${lang}/mustafa-caki`));
      console.log('PASS: Click on empty area navigated to profile');

      // Go back
      await page.goBack();
      await page.waitForSelector('#teamTrack .team-card:not(.skeleton)');

      // 3D: Click on SOCIAL MEDIA icon
      console.log('Testing click on social media icon...');
      const mustafaCard4 = page.locator('#teamTrack .team-card').nth(0);
      const socialLink = mustafaCard4.locator('.team-social a').first();
      assert(await socialLink.isVisible(), 'Social link must be visible');
      
      // Clicking social link should NOT navigate the current page to profile
      const [popup] = await Promise.all([
        page.waitForEvent('popup').catch(() => null),
        socialLink.click()
      ]);
      assert(!page.url().includes('mustafa-caki'), 'Main page must NOT navigate to profile when social icon is clicked');
      if (popup) {
        assert(popup.url().includes('linkedin.com'), 'Popup URL should be LinkedIn');
        await popup.close();
      }
      console.log('PASS: Social media icon click isolated from card profile navigation');

      // 3E: Keyboard Navigation (Tab + Enter/Space)
      console.log('Testing keyboard navigation...');
      await mustafaCard4.locator('.team-profile-link').last().focus();
      assert(await page.evaluate(() => document.activeElement.classList.contains('team-profile-link')));
      await page.keyboard.press('Enter');
      await page.waitForURL(new RegExp(`/${lang}/mustafa-caki`));
      console.log('PASS: Keyboard navigation (Enter) navigated to profile');

      await page.close();
    }

    // ----------------------------------------------------
    // TEST 4: Profile Page Content & Responsiveness
    // ----------------------------------------------------
    console.log('\n--- TEST 4: Profile Page Content & Responsiveness ---');
    for (const [lang, titleExpected] of [['en', 'Co-Founder & CEO · Vertex'], ['tr', 'Kurucu Ortak & CEO · Vertex']]) {
      const page = await browser.newPage({ viewport: { width: 1200, height: 900 } });
      await page.goto(`${baseUrl}/${lang}/mustafa-caki`);

      // 4A: Header elements
      const name = await page.locator('.profile-heading h1').innerText();
      assert.equal(name, 'Mustafa Çakı');

      const title = await page.locator('.profile-heading p').innerText();
      assert.equal(title, titleExpected);

      const photo = page.locator('.profile-heading img');
      assert(await photo.isVisible());
      assert((await photo.getAttribute('src')).includes('MUSTAFACAKI.webp'));

      // 4B: Biography paragraphs
      const pCount = await page.locator('.profile-bio p').count();
      assert.equal(pCount, 6, `Expected 6 biography paragraphs, got ${pCount}`);

      if (lang === 'en') {
        const p1 = await page.locator('.profile-bio p').nth(0).innerText();
        assert(p1.includes('Moving constantly with my teacher father'));
        const p6 = await page.locator('.profile-bio p').nth(5).innerText();
        assert(p6.includes('In ten years, I intend to lead one of the world\'s largest companies'));
      } else {
        const p1 = await page.locator('.profile-bio p').nth(0).innerText();
        assert(p1.includes('Öğretmen babamla sürekli yer değiştirirken'));
        const p6 = await page.locator('.profile-bio p').nth(5).innerText();
        assert(p6.includes('On yıl içinde dünyanın en büyük şirketlerinden birine liderlik etmeyi'));
      }

      // 4C: Desktop Layout - Links panel on right
      const bioBox = await page.locator('.profile-bio').boundingBox();
      const linksBox = await page.locator('.profile-links').boundingBox();
      assert(linksBox.x > bioBox.x, 'On desktop (1200px), links panel must be to the right of bio');

      // 4D: Mobile Layout (390px) - Links panel stacks below bio
      await page.setViewportSize({ width: 390, height: 844 });
      await page.waitForTimeout(100);
      const bioBoxM = await page.locator('.profile-bio').boundingBox();
      const linksBoxM = await page.locator('.profile-links').boundingBox();
      assert(linksBoxM.y > bioBoxM.y + bioBoxM.height - 10, 'On mobile (390px), links panel must be below bio');
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1), 'No horizontal scroll overflow on mobile');

      // 4E: Navigation back to home / sections
      const homeLink = page.locator('header a.brand');
      await homeLink.click();
      await page.waitForURL(new RegExp(`/${lang}/#home|/${lang}/`));
      console.log(`PASS: Profile page verified in ${lang} on desktop & mobile, return link works`);

      await page.close();
    }

    console.log('\n======================================');
    console.log('ALL PROFILE CARD VERIFICATION TESTS PASSED!');
    console.log('======================================');
  } finally {
    await browser.close();
    server.close();
  }
})().catch(err => {
  console.error('TEST FAILED:', err);
  process.exitCode = 1;
});
