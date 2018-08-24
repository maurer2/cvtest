const chromeLauncher = require('chrome-launcher');

module.exports = {
    launchChrome: ({ port }) => {
        return chromeLauncher.launch({
            startingUrl: 'about:blank',
            chromeFlags: ['--headless', '--disable-gpu'],
            port: port
        }).then((chrome) => {
            // console.log(`Port: ${chrome.port}`);
        }).catch(() => {
            console.log('Error launching Chrome');
        })
    }
}

if (require.main == module) {
    module.exports.launchChrome();
}
