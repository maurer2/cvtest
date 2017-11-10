const htmlPdf = require('html-pdf-chrome');

const html = '<p>Hello, world!</p>';
const url = 'https://github.com/westy92/html-pdf-chrome';
const options = {
  port: 64161, // port Chrome is listening on
};

htmlPdf.create(url, options).then((pdf) => pdf.toFile('test.pdf'));
//htmlPdf.create(html, options).then((pdf) => pdf.toBase64());
//htmlPdf.create(html, options).then((pdf) => pdf.toBuffer());