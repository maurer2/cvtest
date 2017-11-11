const htmlPdf = require('html-pdf-chrome');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));

fs.readFileAsync('cv.html', 'utf8').then((data) => {
  htmlPdf.create(data.toString(), {
    port: 10000,
    printOptions: {
        // https://github.com/adieuadieu/serverless-chrome/pull/14/files
        // https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-printToPDF
        landscape: false,
        displayHeaderFooter: false,
        printBackground: true,
        scale: 1,
        paperWidth: 7.48, // A4 - 2cm
        paperHeight: 11.69, // A4 -2 cm
        marginTop: 0,
        marginBottom: 0,
        marginLeft: 10,
        marginRight: 0,
        pageRanges: '1-2',
    }
  }).then((pdf) => pdf.toFile('../dist/chrome2pdf.pdf'))
    .catch((error) => console.log(error));
});
