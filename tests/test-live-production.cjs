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

  // Test 1: Turkish home page card click
  console.log('\n[1/4] Navigating to https://vertexishere.com/tr/ ...');
  await page.goto('https://vertexishere.com/tr/', { waitUntil: 'networkidle', timeout: 30000 });

  // Scroll to #team section
  const teamSection = page.locator('#team');
  await teamSection.scrollIntoViewIfNeeded();

  // Wait for team cards to render dynamically
  await page.waitForSelector('#teamTrack .team-card', { timeout: 15000 });
  const cardCount = await page.locator('#teamTrack .team-card').count();
  console.log(`Found ${cardCount} team cards rendered on #teamTrack.`);
  assert(cardCount > 0, 'No team cards were rendered');

  // Locate Mustafa Çakı's card
  const mustafaCard = page.locator('#teamTrack .team-card').filter({ hasText: 'Mustafa Çakı' });
  await mustafaCard.waitFor({ state: 'visible', timeout: 5000 });
  console.log('Found Mustafa Çakı card on live site.');

  // Verify attributes and classes
  const hasProfileClass = await mustafaCard.evaluate((el) => el.classList.contains('has-profile'));
  const profileSlug = await mustafaCard.getAttribute('data-profile-slug');
  const profileLink = mustafaCard.locator('h3 a.team-profile-link');
  const href = await profileLink.getAttribute('href');
  console.log(`Card attributes: has-profile=${hasProfileClass}, data-profile-slug=${profileSlug}, href=${href}`);

  assert.strictEqual(hasProfileClass, true, 'Card must have .has-profile class');
  assert.strictEqual(profileSlug, 'mustafa-caki', 'Card data-profile-slug must be mustafa-caki');
  assert.strictEqual(href, '/tr/mustafa-caki', 'Profile link href must be /tr/mustafa-caki');

  // Verify social link isolation on a card with social links
  const cardWithSocial = page.locator('#teamTrack .team-card').filter({ hasText: 'Ekin Burçak' });
  if (await cardWithSocial.count() > 0) {
    const socialLink = cardWithSocial.locator('.team-social a').first();
    const socialHref = await socialLink.getAttribute('href');
    console.log(`Found social link on team card: ${socialHref}`);
    assert(socialHref.startsWith('http'), 'Social link should have valid http href');
  }

  // Click Mustafa Çakı's card (clicking photo area on the card via stretched-link)
  console.log('Clicking Mustafa Çakı card on live site...');
  await Promise.all([
    page.waitForURL((url) => url.pathname.includes('/tr/mustafa-caki'), { timeout: 15000 }),
    mustafaCard.click({ position: { x: 50, y: 50 } })
  ]);

  console.log(`Navigated to: ${page.url()}`);
  assert(page.url().includes('/tr/mustafa-caki'), 'Target URL should be /tr/mustafa-caki');

  // Verify profile page contents
  const trTitle = await page.title();
  console.log(`Page title: ${trTitle}`);
  assert(trTitle.includes('Kurucu Ortak & CEO'), 'Title must contain Kurucu Ortak & CEO');

  const h1 = await page.locator('.profile-heading h1').textContent();
  const roleText = await page.locator('.profile-heading p').textContent();
  console.log(`Heading: ${h1}, Role: ${roleText}`);
  assert.strictEqual(h1.trim(), 'Mustafa Çakı');
  assert(roleText.includes('Kurucu Ortak & CEO'), 'Role text must be Kurucu Ortak & CEO');

  const pCount = await page.locator('.profile-bio p').count();
  console.log(`Bio paragraphs count: ${pCount}`);
  assert.strictEqual(pCount, 6, 'Must have exactly 6 paragraphs in bio');

  // Test 2: English home page card click
  console.log('\n[2/4] Navigating to https://vertexishere.com/en/ ...');
  await page.goto('https://vertexishere.com/en/', { waitUntil: 'networkidle', timeout: 30000 });
  await page.locator('#team').scrollIntoViewIfNeeded();
  await page.waitForSelector('#teamTrack .team-card', { timeout: 15000 });

  const enMustafaCard = page.locator('#teamTrack .team-card').filter({ hasText: 'Mustafa Çakı' });
  await enMustafaCard.waitFor({ state: 'visible', timeout: 5000 });

  const enHref = await enMustafaCard.locator('h3 a.team-profile-link').getAttribute('href');
  console.log(`EN profile link href: ${enHref}`);
  assert.strictEqual(enHref, '/en/mustafa-caki');

  // Click card on name
  console.log('Clicking name on EN card...');
  await Promise.all([
    page.waitForURL((url) => url.pathname.includes('/en/mustafa-caki'), { timeout: 15000 }),
    enMustafaCard.locator('h3 a.team-profile-link').click()
  ]);

  console.log(`Navigated to: ${page.url()}`);
  assert(page.url().includes('/en/mustafa-caki'), 'Target URL should be /en/mustafa-caki');

  const enTitle = await page.title();
  const enRole = await page.locator('.profile-heading p').textContent();
  console.log(`EN Title: ${enTitle}, EN Role: ${enRole}`);
  assert(enTitle.includes('Co-Founder & CEO'), 'EN Title must contain Co-Founder & CEO');
  assert(enRole.includes('Co-Founder & CEO'), 'EN Role must contain Co-Founder & CEO');

  const enPCount = await page.locator('.profile-bio p').count();
  assert.strictEqual(enPCount, 6, 'EN Bio must have 6 paragraphs');

  // Test 3: Redirects in production
  console.log('\n[3/4] Testing clean redirects in production...');
  await page.goto('https://vertexishere.com/en/team/mustafa-caki', { waitUntil: 'domcontentloaded' });
  console.log(`/en/team/mustafa-caki redirected to: ${page.url()}`);
  assert(page.url().includes('/en/mustafa-caki'), 'Clean redirect to /en/mustafa-caki failed');

  await page.goto('https://vertexishere.com/tr/team/mustafa-caki', { waitUntil: 'domcontentloaded' });
  console.log(`/tr/team/mustafa-caki redirected to: ${page.url()}`);
  assert(page.url().includes('/tr/mustafa-caki'), 'Clean redirect to /tr/mustafa-caki failed');

  // Test 4: Mobile viewport layout
  console.log('\n[4/4] Testing mobile layout on production...');
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
