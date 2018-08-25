const wkhtmltopdf = require('wkhtmltopdf');
const fs = require('fs-extra');

module.exports = {
  generatePDF: ({ inputFileRoot, inputFileName, outputFileRoot, outputFileNameWKHTML }) => {
    const outputFile = fs.createWriteStream(outputFileRoot + outputFileNameWKHTML);

    return new Promise((resolve, reject) => {
      // https://wkhtmltopdf.org/usage/wkhtmltopdf.txt
      const options = {
        pageSize: 'A4',
        pageWidth: '210mm',
        pageHeight: '297mm',
        marginTop: '10mm',
        marginBottom: '10mm',
        marginLeft: '10mm',
        marginRight: '10mm',
        orientation: 'portrait',
        zoom: 1.25, // https://github.com/wkhtmltopdf/wkhtmltopdf/issues/3241
        disableSmartShrinking: false,
        dpi: 300,
        printMediaType: true,
      };

      fs.readFile(inputFileRoot + inputFileName, 'utf8').then((data) => {
        wkhtmltopdf(data.toString(), options)
          .pipe(outputFile);

        outputFile
          .on('finish', () => resolve())
          .on('error', () => reject());
      });
    });
  },
};

if (require.main === module) {
  module.exports.generatePDF();
}
