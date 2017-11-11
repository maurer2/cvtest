const htmlPdf = require('html-pdf-chrome');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));

fs.readFileAsync('cv.html', 'utf8').then((data) => {
  htmlPdf.create(data.toString(), {
    port: 10000,
    printOptions: {
        landscape: false,
        displayHeaderFooter: false,
        printBackground: false,
        scale: 1,
        paperWidth:  8.27,
        paperHeight: 11.69,
        marginTop: 0,
        marginBottom: 0,
        marginLeft: 0,
        marginRight: 0,
        pageRanges: '1-1',
        ignoreInvalidPageRanges: false
    }
  }).then((pdf) => pdf.toFile('../dist/chrome2pdf.pdf'));
});
