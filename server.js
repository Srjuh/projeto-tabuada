const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    const query = url.parse(req.url, true).query;
    const num = parseInt(query.tabuada);
    const seq = query.sequencia ? parseInt(query.sequencia) : 10;

    if (!isNaN(num)) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<html><body>');
        res.write(`<h1>Tabuada do ${num}</h1>`);
        res.write('<ul>');
        for (let i = 0; i <= seq; i++) {
            res.write(`<li>${num} x ${i} = ${num * i}</li>`);
        }
        res.write('</ul>');
        res.write('</body></html>');
        res.end();
    } else {
        res.writeHead(400, { 'Content-Type': 'text/html' });
        res.write('<h1>Erro: Número inválido</h1>');
        res.end();
    }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
   console.log(`Servidor rodando em http://localhost:${PORT}`);
});
