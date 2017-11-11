const wkhtmltopdf = require('wkhtmltopdf');
const fs = require('fs');

wkhtmltopdf(fs.createReadStream('cv.html'), {
        // https://wkhtmltopdf.org/usage/wkhtmltopdf.txt
        pageSize: 'A4',
        pageWidth : '210mm',
        pageHeight : '297mm',
        marginTop: '20mm',
        marginBottom: '20mm',
        marginLeft: '0mm',
        marginRight: '0mm',
        orientation: 'portrait',
        zoom: 1,
        disableSmartShrinking: false,
        //dpi: 72,
        printMediaType: true
    })
    .pipe(fs.createWriteStream('../dist/wkhtml2pdf.pdf'));
