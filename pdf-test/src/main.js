const chromeLauncher = require('./launch-chrome.js');
const htmlpdf = require('./launch-htmlpdf.js');
const wkthmltopdf = require('./launch-wkhtml');

chromeLauncher.launchChrome().then(() => {
    console.log('headless chrome running');

    const htmlpdfGenerator = htmlpdf.generatePDF();
    const wkthmltopdfGenerator = wkthmltopdf.generatePDF();

    htmlpdfGenerator.then(() => {
        console.log('done htmlPDFgenerator');
    });

    // create pdf via wkthmltopdf
    wkthmltopdfGenerator.then(() => {
        console.log('done wkthmltopdf');
    });

    Promise.all([htmlpdfGenerator, wkthmltopdfGenerator]).then(() => {
        console.log('generation done');
    }).catch((error) => {
        console.log('Error', error);
    });
})