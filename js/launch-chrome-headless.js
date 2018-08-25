const chromeLauncher = require('chrome-launcher');

module.exports = {
  launchChrome: ({ port }) => chromeLauncher.launch({
    startingUrl: 'about:blank',
    chromeFlags: ['--headless', '--disable-gpu'],
    port,
  }).then(() => {
    // console.log(`Port: ${chrome.port}`);
  }).catch(() => {
    console.log('Error launching Chrome');
  }),
};

if (require.main === module) {
  module.exports.launchChrome();
}
