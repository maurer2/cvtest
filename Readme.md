# HTML to PDF comparison

Compare output of wkhtml and chrome headless by creating an intermediate png file and pixelmatching the output.

### Prerequisites

WKTHMLtoPDF needs to be installed locally (https://wkhtmltopdf.org/downloads.html). WKHTMLtoPDF has a nasty bug on OSX (// https://github.com/wkhtmltopdf/wkhtmltopdf/issues/3241), so you need to play around with zoom and dpi or use an older build.
Imagemagick needs to be installed locally as well (https://github.com/mooz/node-pdf-image)

### Installing

```
yarn
yarn compare-pdf
```
