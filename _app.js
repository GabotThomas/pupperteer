import puppeteer from 'puppeteer';
console.log("browser");
const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    timeout: 120000,
    protocolTimeout: 120000,
});
console.log('new page');
const page = await browser.newPage();

try {
    console.log("start");
    // Navigate to the page
    await page.goto('https://blog.apify.com', { waitUntil: 'load', timeout: 60_000 }); // 60 seconds timeout

    // Take a screenshot
    await page.screenshot({ path: 'apify.jpeg', fullPage: true });

    console.log('Puppeteer script executed successfully.');
} catch (error) {
    console.error('Error running Puppeteer script:', error);
} finally {
    // Close the browser
    await browser.close();
}
