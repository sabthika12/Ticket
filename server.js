const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8080;

const server = http.createServer((req, res) => {
    // We are serving the standalone HTML file as the main page
    fs.readFile(path.join(__dirname, 'Play_Website_Instantly.html'), (err, content) => {
        if (err) {
            res.writeHead(500);
            res.end("Error loading the page");
            return;
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content);
    });
});

server.listen(PORT, '127.0.0.1', () => {
    console.log(`\n=========================================`);
    console.log(`🚀 SUCCESS! SERVER IS RUNNING`);
    console.log(`👉 Open this exact link: http://localhost:${PORT}/`);
    console.log(`=========================================\n`);
});
