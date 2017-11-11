const htmlPdf = require('html-pdf-chrome');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));

module.exports = {
    generatePDF: () => {
        return fs.readFileAsync('cv.html', 'utf8').then((data) => {
            htmlPdf.create(data.toString(), {
                port: 10000,
                printOptions: {
                    // https://github.com/adieuadieu/serverless-chrome/pull/14/files
                    // https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-printToPDF
                    landscape: false,
                    displayHeaderFooter: false,
                    printBackground: true,
                    scale: 1,
                    paperWidth: 8.267, // A4
                    paperHeight: 11.692, // A4
                    marginTop: 0.394, // 1cm = 0.394 inch
                    marginBottom: 0.394, // 1cm = 0.394 inch
                    marginLeft: 0.394, // 1cm = 0.394 inch
                    marginRight: 0.394, // 1cm = 0.394 inch
                    pageRanges: '1-2',
                }
            }).then((pdf) => pdf.toFile('../dist/chrome2pdf.pdf'))
            .catch((error) => console.log(error));
        });
    }
}

if (require.main == module) {
  module.exports.generatePDF();
}
