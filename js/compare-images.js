const fs = require('fs-extra');
const { PNG } = require('pngjs');
const pixelmatch = require('pixelmatch');

module.exports = {
  generateComparisonImage: ({ outputFileNameWKHTMLPNG, outputFileNameHTMLPDFPNG }) => new Promise((resolve, reject) => {
    const images = [];
    const promiseArray = [outputFileNameWKHTMLPNG, outputFileNameHTMLPDFPNG].map(imageName => new Promise((resolve2, reject2) => {
      const image = fs.createReadStream(`./png/${imageName}`).pipe(new PNG())
        .on('parsed', () => {
          images.push(image);
          resolve2();
        })
        .on('error', () => {
          console.log('error reading pngs');
          reject2();
        });
    }));

    Promise.all(promiseArray).then(() => {
      const comparisonImage = new PNG({
        width: images[0].width,
        height: images[0].height,
      });

      pixelmatch(images[0].data, images[1].data, comparisonImage.data, images[0].width, images[0].height, { threshold: 0.1 });

      comparisonImage.pack()
        .pipe(fs.createWriteStream('./results/comparison-image.png'))
        .on('finish', () => {
          resolve();
        });
    })
      .catch((error) => {
        console.log('Error image-comparison', error);
        reject();
      });
  }),
};

if (require.main === module) {
  module.exports.generateComparisonImage();
}
