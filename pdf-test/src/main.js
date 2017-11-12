const Promise = require('bluebird');
const chromeLauncher = require('./launch-chrome.js');
const htmlpdf = require('./launch-htmlpdf.js');
const wkthmltopdf = require('./launch-wkhtml');
const pdftopng = require('./generate-image');

chromeLauncher.launchChrome().then(() => {
    console.log('headless chrome running');

    const htmlpdfGenerator = htmlpdf.generatePDF();
    const wkthmltopdfGenerator = wkthmltopdf.generatePDF();

    // create pdf via htmlpdfGenerator
    htmlpdfGenerator.then(() => {
        console.log('done htmlgenerator');
    });

    // create pdf via wkthmltopdf
    wkthmltopdfGenerator.then(() => {
        console.log('done wkthmltopdf');
    });

    // generate pngs
    Promise.all([htmlpdfGenerator, wkthmltopdfGenerator]).then(() => {
        console.log('pdf generation done');

        const fileNames = ['wkhtmltopdf.pdf','chrome2pdf.pdf'];
        const promisesArray = fileNames.map((fileName) => pdftopng.generateImage(fileName));

        Promise.all(promisesArray).then(() => {
            console.log('png generation done');
        });
    }).catch((error) => {
        console.log('Error', error);
    });
})