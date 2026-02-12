const puppeteer = require('puppeteer');

const BASE_URL = 'http://localhost:3000';

async function runTests() {
  console.log('Starting cursor removal tests...\n');

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // Collect console errors
  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  let allTestsPassed = true;
  const results = [];

  try {
    // Navigate to the page
    console.log('Navigating to', BASE_URL);
    await page.goto(BASE_URL, { waitUntil: 'networkidle0', timeout: 30000 });

    // Test 1: Check that custom cursor element does not exist
    console.log('\n[Test 1] Checking custom cursor element...');
    const customCursor = await page.$('div[style*="z-index: 9999"]');
    if (customCursor === null) {
      console.log('  ✓ Custom cursor element does not exist');
      results.push({ name: 'No custom cursor element', passed: true });
    } else {
      console.log('  ✗ Custom cursor element still exists!');
      results.push({ name: 'No custom cursor element', passed: false });
      allTestsPassed = false;
    }

    // Test 2: Check that body cursor style is not 'none'
    console.log('\n[Test 2] Checking body cursor style...');
    const bodyCursor = await page.evaluate(() => {
      return window.getComputedStyle(document.body).cursor;
    });
    console.log('  Body cursor style:', bodyCursor);
    if (bodyCursor !== 'none') {
      console.log('  ✓ Body cursor is not "none"');
      results.push({ name: 'Body cursor not none', passed: true });
    } else {
      console.log('  ✗ Body cursor is still "none"!');
      results.push({ name: 'Body cursor not none', passed: false });
      allTestsPassed = false;
    }

    // Test 3: Check that page renders correctly
    console.log('\n[Test 3] Checking page rendering...');
    const pageTitle = await page.title();
    const hasContent = await page.evaluate(() => {
      return document.body.innerHTML.length > 100;
    });
    if (pageTitle && hasContent) {
      console.log('  ✓ Page renders correctly (title:', pageTitle + ')');
      results.push({ name: 'Page renders correctly', passed: true });
    } else {
      console.log('  ✗ Page did not render correctly');
      results.push({ name: 'Page renders correctly', passed: false });
      allTestsPassed = false;
    }

    // Test 4: Check for console errors
    console.log('\n[Test 4] Checking console errors...');
    // Filter out common non-critical errors
    const criticalErrors = consoleErrors.filter(err =>
      !err.includes('favicon') &&
      !err.includes('DevTools') &&
      !err.includes('net::ERR')
    );
    if (criticalErrors.length === 0) {
      console.log('  ✓ No critical console errors');
      results.push({ name: 'No console errors', passed: true });
    } else {
      console.log('  ✗ Console errors found:');
      criticalErrors.forEach(err => console.log('    -', err));
      results.push({ name: 'No console errors', passed: false });
      allTestsPassed = false;
    }

  } catch (error) {
    console.error('\nTest execution failed:', error.message);
    allTestsPassed = false;
  } finally {
    await browser.close();
  }

  // Summary
  console.log('\n' + '='.repeat(50));
  console.log('TEST SUMMARY');
  console.log('='.repeat(50));
  results.forEach(r => {
    console.log(`${r.passed ? '✓' : '✗'} ${r.name}`);
  });
  console.log('='.repeat(50));
  console.log(allTestsPassed ? '\n✓ ALL TESTS PASSED' : '\n✗ SOME TESTS FAILED');

  process.exit(allTestsPassed ? 0 : 1);
}

runTests();
