module.exports = {
    launchChrome: () => {
        const chromeLauncher = require('chrome-launcher');
        //const hasLoaded = new Promise();

        return chromeLauncher.launch({
            startingUrl: 'about:blank',
            chromeFlags: ['--headless', '--disable-gpu'],
            port: 10000
        }).then((chrome) => {
            console.log(`Port: ${chrome.port}`);
            //hasLoaded.resolve();
        }).catch(() => {
            console.log('Error launching Chrome');
            //hasLoaded.reject();
        })

        //return hasLoaded;
    }
}

if(require.main == module) {
    module.exports.launchChrome();
}