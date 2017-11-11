const wkhtmltopdf = require('wkhtmltopdf');
const fs = require('fs');

wkhtmltopdf(fs.createReadStream('cv.html'), {
        // https://wkhtmltopdf.org/usage/wkhtmltopdf.txt
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
    })
    .pipe(fs.createWriteStream('../dist/wkhtml2pdf.pdf'));
