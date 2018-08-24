const Promise = require('bluebird');
const chromeLauncher = require('./src/launch-chrome.js');
const htmlpdf = require('./src/launch-htmlpdf.js');
const wkthmltopdf = require('./src/launch-wkhtml');
const pdftopng = require('./src/generate-image');
const compareImage = require('./src/compare-images');

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
        const promiseArray = fileNames.map((fileName) => pdftopng.generateImage(fileName));

        Promise.all(promiseArray).then(() => {
            console.log('png generation done');

            // generate comparison image
            compareImage.generateComparisonImage().then(() => {
                console.log('Finished');
                //process.exit(1);
            });
        });
    }).catch((error) => {
        console.log('Error', error);
    });
})
