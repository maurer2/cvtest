const PDFImage = require('pdf-image').PDFImage;
const fs = require('fs-extra');

module.exports = {
    generateImage: ({ outputFileRoot }, fileName) => {
        return new Promise((resolve, reject) => {
            const pdfImage = new PDFImage(outputFileRoot + fileName, {
                // https://github.com/mooz/node-pdf-image/issues/3
                convertOptions: {
                    '-density': '300',
                    '-depth': '8',
                    '-background': 'white',
                    '-flatten': ''
                }
            });

            pdfImage.convertPage(0)
                .then((imagePath) => {
                    if (fs.existsSync(imagePath)) {
                        fs.move(imagePath, './png/' + fileName.replace('.pdf', '.png'), { overwrite: true })
                            .then(() => {
                                resolve()
                            })
                            .catch((error) => {
                                reject(error)
                            });

                    } else {
                        reject(imagePath)
                    }
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
