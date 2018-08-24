const Promise = require('bluebird');
const PDFImage = require('pdf-image').PDFImage;

module.exports = {
    generateImage: (filename) => {
        return new Promise((resolve, reject) => {
            const path = './dist/' + filename;
            const pdfImage = new PDFImage(path, {
                // https://github.com/mooz/node-pdf-image/issues/3
                convertOptions: {
                    '-density': '300',
                    '-depth': '8',
                    '-background': 'white',
                    '-flatten': ''
                }
            });

            pdfImage.convertFile()
                .then((imagePath) => {
                    resolve(imagePath)
                })
                .catch((imagePath) => {
                    reject(imagePath)
                })

        });
    }
}

if (require.main == module) {
    module.exports.generateImage(process.argv[2]);
}
