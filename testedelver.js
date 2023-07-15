const http = require('http');
const mysql = require('mysql2');
const url = require('url');
const port = process.env.PORT || 3000; // obter a porta do Vercel ou usar a porta 3000

// criar uma conexão com o banco de dados
const connection = mysql.createConnection({
  host: 'containers-us-west-57.railway.app',
  user: 'root',
  password: '4FBWQChE2RZHEClQNdjS',
  database: 'railway',
  port: '8053'
});

// criar o servidor HTTP
const server = http.createServer((req, res) => {
  // habilitar o CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // obter o código do parâmetro da URL
  const queryObject = url.parse(req.url, true).query;
  const codigo = queryObject.codigo;

  // executar a instrução DELETE
  connection.query(
    'DELETE FROM dados WHERE codigo = ?',
    [codigo],
    function(err, results, fields) {
      if (err) {
        console.error(err);
        res.statusCode = 500;
        res.end('Erro interno do servidor');
        return;
      }
      res.setHeader('Content-Type', 'application/json');
      res.writeHead(302, {
        'Location': 'https://atestados.vercel.app/Paginas/PaginaLista.html'
      });
      res.end();
    }
  );
});

// iniciar o servidor
server.listen(port, () => {
    console.log(`Servidor iniciado na porta ${port}`);
  });