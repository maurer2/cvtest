const emojic = require('emojic');
const chromeLauncher = require('./js/launch-chrome-headless');
const htmlpdf = require('./js/launch-htmlpdf');
const wkthmltopdf = require('./js/launch-wkhtml');
const pdftopng = require('./js/generate-image');
const compareImage = require('./js/compare-images');

// config
const config = {
  port: 10000,
  inputFileRoot: './html/',
  inputFileName: 'cv.html',
  outputFileRoot: './pdf/',
  outputFileRootPNG: './png/',
  outputFileNameWKHTML: 'wkhtmltopdf.pdf',
  outputFileNameHTMLPDF: 'htmlpdf.pdf',
  outputFileNameWKHTMLPNG: 'wkhtmltopdf.png',
  outputFileNameHTMLPDFPNG: 'htmlpdf.png',
  outputFileRootResults: './results/',
};

chromeLauncher.launchChrome(config).then(() => {
  console.log(emojic.whiteCheckMark, 'headless chrome started');

  const htmlpdfGenerator = htmlpdf.generatePDF(config);
  const wkthmltopdfGenerator = wkthmltopdf.generatePDF(config);

  // create pdf via htmlpdfGenerator
  htmlpdfGenerator.then(() => {
    console.log(emojic.whiteCheckMark, 'htmlgenerator finished');
  });

  // create pdf via wkthmltopdf
  wkthmltopdfGenerator.then(() => {
    console.log(emojic.whiteCheckMark, 'Wkthmltopdf finished');
  });

  // generate pngs
  Promise.all([htmlpdfGenerator, wkthmltopdfGenerator]).then(() => {
    console.log(emojic.whiteCheckMark, 'pdf creation finished');

    const fileNames = [config.outputFileNameWKHTML, config.outputFileNameHTMLPDF];
    const promiseArray = fileNames.map(fileName => pdftopng.generateImage(config, fileName));

    Promise.all(promiseArray).then(() => {
      console.log(emojic.whiteCheckMark, 'png creation finished');

      // generate comparison image
      compareImage.generateComparisonImage(config)
        .then(() => {
          console.log(emojic.whiteCheckMark, 'comparison-image creation finished');
        })
        .then(() => {
          console.log(emojic.smileyCat, 'done');
          process.exit(0);
        });
    });
  }).catch((error) => {
    console.log('Error', error);
  });
});
