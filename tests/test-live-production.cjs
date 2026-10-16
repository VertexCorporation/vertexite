const { chromium } = require('playwright');
const assert = require('assert');

async function testLiveProduction() {
  console.log('--- STARTING LIVE PRODUCTION VERIFICATION (https://vertexishere.com) ---');
  const browser = await chromium.launch({
    headless: true,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
  });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  const page = await context.newPage();

  // Test 1: Turkish home page card click & profile details
  console.log('\n[1/5] Navigating to https://vertexishere.com/tr/ ...');
  await page.goto('https://vertexishere.com/tr/', { waitUntil: 'networkidle', timeout: 30000 });

  const teamSection = page.locator('#team');
  await teamSection.scrollIntoViewIfNeeded();

  await page.waitForSelector('#teamTrack .team-card', { timeout: 15000 });
  const mustafaCard = page.locator('#teamTrack .team-card').filter({ hasText: 'Mustafa Çakı' });
  await mustafaCard.waitFor({ state: 'visible', timeout: 5000 });
  console.log('Found Mustafa Çakı card on live site.');

  const hasProfileClass = await mustafaCard.evaluate((el) => el.classList.contains('has-profile'));
  const profileSlug = await mustafaCard.getAttribute('data-profile-slug');
  assert.strictEqual(hasProfileClass, true);
  assert.strictEqual(profileSlug, 'mustafa-caki');

  console.log('Clicking Mustafa Çakı card on live site...');
  await Promise.all([
    page.waitForURL((url) => url.pathname.includes('/tr/mustafa-caki'), { timeout: 15000 }),
    mustafaCard.click({ position: { x: 50, y: 50 } })
  ]);

  console.log(`Navigated to: ${page.url()}`);
  assert(page.url().includes('/tr/mustafa-caki'));

  // Verify photo box
  const photoBox = page.locator('.profile-heading .profile-photo-box');
  await photoBox.waitFor({ state: 'visible', timeout: 5000 });
  const photoImg = photoBox.locator('img');
  const photoSrc = await photoImg.getAttribute('src');
  console.log(`Photo box verified with src: ${photoSrc}`);
  assert(photoSrc.includes('MUSTAFACAKI.webp'));

  // Verify links & logos
  const linkIcons = await page.locator('.profile-links .profile-link-icon').count();
  console.log(`Found ${linkIcons} link logos on profile sidebar.`);
  assert.strictEqual(linkIcons, 2, 'Should have exactly 2 logos (LinkedIn and Instagram)');

  const pCount = await page.locator('.profile-bio p').count();
  assert.strictEqual(pCount, 6, 'Must have 6 bio paragraphs');

  // Test 2: English home page card click & profile
  console.log('\n[2/5] Navigating to https://vertexishere.com/en/ ...');
  await page.goto('https://vertexishere.com/en/', { waitUntil: 'networkidle', timeout: 30000 });
  await page.locator('#team').scrollIntoViewIfNeeded();
  await page.waitForSelector('#teamTrack .team-card', { timeout: 15000 });

  const enMustafaCard = page.locator('#teamTrack .team-card').filter({ hasText: 'Mustafa Çakı' });
  await Promise.all([
    page.waitForURL((url) => url.pathname.includes('/en/mustafa-caki'), { timeout: 15000 }),
    enMustafaCard.locator('h3 a.team-profile-link').click()
  ]);

  console.log(`Navigated to: ${page.url()}`);
  assert(page.url().includes('/en/mustafa-caki'));
  assert.strictEqual(await page.locator('.profile-heading .profile-photo-box').count(), 1);
  assert.strictEqual(await page.locator('.profile-links .profile-link-icon').count(), 2);

  // Test 3: Other language profiles (e.g., German, French, Arabic, Japanese)
  console.log('\n[3/5] Testing other language profiles across the globe...');
  const testLangs = ['de', 'fr', 'ar', 'ja', 'es', 'zh'];
  for (const l of testLangs) {
    const langUrl = `https://vertexishere.com/${l}/mustafa-caki`;
    const res = await page.goto(langUrl, { waitUntil: 'domcontentloaded', timeout: 20000 });
    console.log(`Checked ${langUrl} -> status: ${res.status()}`);
    assert.strictEqual(res.status(), 200, `Profile page for ${l} should return 200`);
    assert.strictEqual(await page.locator('.profile-heading .profile-photo-box').count(), 1);
    assert.strictEqual(await page.locator('.profile-links .profile-link-icon').count(), 2);
  }

  // Test 4: Redirects across languages
  console.log('\n[4/5] Testing clean redirects across languages...');
  await page.goto('https://vertexishere.com/de/team/mustafa-caki', { waitUntil: 'domcontentloaded' });
  console.log(`/de/team/mustafa-caki redirected to: ${page.url()}`);
  assert(page.url().includes('/de/mustafa-caki'));

  // Test 5: Mobile viewport layout
  console.log('\n[5/5] Testing mobile layout on production...');
  const mobileContext = await browser.newContext({
    viewport: { width: 375, height: 812 },
    isMobile: true
  });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto('https://vertexishere.com/tr/mustafa-caki', { waitUntil: 'networkidle' });

  const bioBox = await mobilePage.locator('.profile-bio').boundingBox();
  const linksBox = await mobilePage.locator('.profile-links').boundingBox();
  console.log(`Mobile Bio bottom: ${bioBox.y + bioBox.height}, Links top: ${linksBox.y}`);
  assert(linksBox.y >= bioBox.y + bioBox.height - 20, 'Links must be stacked below bio on mobile');

  await mobileContext.close();
  await context.close();
  await browser.close();

  console.log('\n>>> ALL LIVE PRODUCTION VERIFICATIONS PASSED SUCCESSFULLY! <<<');
}

testLiveProduction().catch((err) => {
  console.error('LIVE PRODUCTION TEST FAILED:', err);
  process.exit(1);
});
