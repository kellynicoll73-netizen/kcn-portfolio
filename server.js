const http = require('http');
const fs   = require('fs');
const path = require('path');

const PORT = 3456;
const ROOT = __dirname;

const TYPES = {
    '.html': 'text/html',
    '.css':  'text/css',
    '.js':   'application/javascript',
    '.jpg':  'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png':  'image/png',
    '.svg':  'image/svg+xml',
    '.ico':  'image/x-icon',
};

http.createServer(function (req, res) {
    var urlPath = req.url.split('?')[0];
    if (urlPath === '/') urlPath = '/index.html';

    var filePath = path.join(ROOT, urlPath);
    var ext = path.extname(filePath).toLowerCase();
    var contentType = TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, function (err, data) {
        if (err) {
            res.writeHead(404);
            res.end('Not found');
            return;
        }
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
    });
}).listen(PORT, function () {
    console.log('Serving on http://localhost:' + PORT);
});
