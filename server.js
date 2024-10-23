const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    
    if (parsedUrl.pathname === '/') {
        // Serve o formulário HTML
        fs.readFile(path.join(__dirname, 'publico', 'index.html'), (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Erro ao carregar o formulário.');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    } else if (parsedUrl.pathname === '/tabuada') {
        // Processa a requisição da tabuada
        const query = parsedUrl.query;
        const num = parseInt(query.tabuada);
        const seq = query.sequencia ? parseInt(query.sequencia) : 10;

        if (!isNaN(num)) {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(`<h1>Tabuada do ${num}</h1>`);
            res.write('<ul>');
            for (let i = 0; i <= seq; i++) {
                res.write(`<li>${num} x ${i} = ${num * i}</li>`);
            }
            res.write('</ul>');
            res.end();
        } else {
            res.writeHead(400, { 'Content-Type': 'text/html' });
            res.write('<h1>Erro: Número inválido</h1>');
            res.end();
        }
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404: Página não encontrada.');
    }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
   console.log(`Servidor rodando em http://localhost:${PORT}`);
});