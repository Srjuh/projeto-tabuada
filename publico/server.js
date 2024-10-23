const http = require('http');
const url = require('url');
const fs = require('fs');

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const query = parsedUrl.query;
    const num = parseInt(query.tabuada); // Parâmetro "tabuada"
    const seq = query.sequencia ? parseInt(query.sequencia) : 10;  // Padrão para 10

    // Verifica se a requisição é para a página inicial (index.html)
    if (req.url === '/index.html' || req.url === '/') {
        // Lê e envia o arquivo HTML
        fs.readFile('index.html', (err, data) => {
            if (err) {
                res.writeHead(404);
                res.write('Arquivo não encontrado');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(data);
            }
            res.end();
        });
    }
    // Verifica se os parâmetros da tabuada são válidos
    else if (!isNaN(num)) {
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
        // Se o número for inválido ou não foi passado
        res.writeHead(400, { 'Content-Type': 'text/html; charset=utf-8' });
        res.write('<h1>Erro: Número inválido</h1>');
        res.end();
    }
});

const port = 3000;
server.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
