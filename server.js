let http = require('http');

let server = http.createServer(function (req, res) {
    res.write('Bot connected!');
    res.end();
}).listen(8000);