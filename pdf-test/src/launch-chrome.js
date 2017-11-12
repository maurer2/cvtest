const chromeLauncher = require('chrome-launcher');

module.exports = {
    launchChrome: () => {
        return chromeLauncher.launch({
            startingUrl: 'about:blank',
            chromeFlags: ['--headless', '--disable-gpu'],
            port: 10000
        }).then((chrome) => {
            console.log(`Port: ${chrome.port}`);
        }).catch(() => {
            console.log('Error launching Chrome');
        })
    }
}

if (require.main == module) {
    module.exports.launchChrome();
}