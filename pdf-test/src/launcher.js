const chromeLauncher = require('chrome-launcher');

chromeLauncher.launch({
 startingUrl: 'https://google.com',
 chromeFlags: ['--headless', '--disable-gpu'],
 port: 10000
}).then(chrome => {
 console.log(`Chrome headless running on ${chrome.port}`);
});