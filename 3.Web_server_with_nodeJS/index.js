const http = require('http');
const fs = require('fs');

const index = fs.readFileSync('index.html', 'utf-8');

const dataJSON = fs.readFileSync('data.json', 'utf-8');

const data = { age: 12 };

const server = http.createServer((req, res) => {
  //   res.end('<h1 style="text-align: center;">Hello World!</h1>');
  //   console.log(req.url);
  //   res.setHeader('Content-Type', 'text/html');
  //   res.end(index);
  //   res.setHeader('Content-Type', 'application/json');
  //   res.end(dataJSON);

  switch (req.url) {
    case '/':
      res.setHeader('Content-Type', 'text/html');
      res.end(index);
      break;

    case '/api':
      res.setHeader('Content-type', 'application/json');
      res.end(dataJSON);
      break;

    default:
      res.writeHead(404, 'Not Found');
      res.end();
  }
});

server.listen(8080);
