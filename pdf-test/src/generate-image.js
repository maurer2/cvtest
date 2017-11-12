const Promise = require('bluebird');
const PDFImage = require('pdf-image').PDFImage;

module.exports = {
    generateImage: (filename) => {
        return new Promise((resolve, reject) => {
            const path = '../dist/' + filename;
            const pdfImage = new PDFImage(path, {
                // https://github.com/mooz/node-pdf-image/issues/3
                convertOptions: {
                    '-density': '300',
                    '-depth': '8',
                    '-background': 'white',
                    '-flatten': ''
                }
            });

            pdfImage.convertPage(0)
                .then((imagePath) => resolve())
                .catch((imagePath) => reject())
        });
    }
}

if (require.main == module) {
    module.exports.generateImage(process.argv[2]);
}
