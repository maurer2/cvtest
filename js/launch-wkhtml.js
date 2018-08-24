const wkhtmltopdf = require('wkhtmltopdf');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));

module.exports = {
    generatePDF: ({ inputFileRoot, inputFileName, outputFileRoot, outputFileNameWKHTML }) => {
        const outputFile = fs.createWriteStream(outputFileRoot + outputFileNameWKHTML);

        return new Promise((resolve, reject) => {
            // https://wkhtmltopdf.org/usage/wkhtmltopdf.txt
            const options = {
                pageSize: 'A4',
                pageWidth : '210mm',
                pageHeight : '297mm',
                marginTop: '10mm',
                marginBottom: '10mm',
                marginLeft: '10mm',
                marginRight: '10mm',
                orientation: 'portrait',
                zoom: 1,
                disableSmartShrinking: false,
                //dpi: 72,
                printMediaType: true
            };

            fs.readFileAsync(inputFileRoot + inputFileName, 'utf8').then((data) => {
                wkhtmltopdf(data.toString(), options)
                    .pipe(outputFile);

                outputFile
                    .on('finish', () => resolve())
                    .on('error', () => reject());
            });
        });
    }
}

if (require.main == module) {
    module.exports.generatePDF();
}
