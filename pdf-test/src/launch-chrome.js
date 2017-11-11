const chromeLauncher = require('chrome-launcher');

chromeLauncher.launch({
 startingUrl: 'about:blank',
 chromeFlags: ['--headless', '--disable-gpu'],
 port: 10000
}).then(chrome => {
 console.log(`Port: ${chrome.port}`);
});