const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const PNG = require('pngjs').PNG;
const pixelmatch = require('pixelmatch');

module.exports = {
    generateComparisonImage: ({ outputFileNameWKHTMLPNG, outputFileNameHTMLPDFPNG, outputFileRootResults }) => {
        return new Promise((resolve, reject) => {
            const images = [];
            const promiseArray = [outputFileNameWKHTMLPNG, outputFileNameHTMLPDFPNG].map((imageName) => {
                return new Promise((resolve, reject) => {
                    const image = fs.createReadStream('./png/' + imageName).pipe(new PNG())
                    .on('parsed', () => {
                        images.push(image);
                        resolve();
                    })
                    .on('error', () => {
                        console.log('error reading pngs');
                        reject();
                    });
                })
            })

            Promise.all(promiseArray).then(() => {
                const comparisonImage = new PNG({
                    width: images[0].width,
                    height: images[0].height
                });

                pixelmatch(images[0].data, images[1].data, comparisonImage.data, images[0].width, images[0].height, {threshold: 0.1});

                comparisonImage.pack().pipe(fs.createWriteStream('./results/comparison-image.png'))
                    .on('finish', () => {
                        resolve();
                    });
            }).catch((error) => {
                console.log('Error image-comparison', error);
                reject();
            });
        });
    }
}

if (require.main == module) {
    module.exports.generateComparisonImage();
}
