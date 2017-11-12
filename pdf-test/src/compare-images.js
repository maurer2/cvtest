const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const PNG = require('pngjs').PNG;
const pixelmatch = require('pixelmatch');

module.exports = {
    generateComparisonImage: () => {
        return new Promise((resolve, reject) => {
            const images = [];
            const promiseArray = ['chrome2pdf-0.png','wkhtmltopdf-0.png'].map((imageName) => {
                return new Promise((resolve, reject) => {
                    const image = fs.createReadStream('../dist/' + imageName).pipe(new PNG())
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
                const comparisonImage = new PNG({width: images[0].width, height: images[0].height});
                pixelmatch(images[0].data, images[1].data, comparisonImage.data, images[0].width, images[0].height, {threshold: 0.1});
                comparisonImage.pack().pipe(fs.createWriteStream('../dist/comparison-image.png')).on('finish', () => {
                    console.log('comparison-image generation done');
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
