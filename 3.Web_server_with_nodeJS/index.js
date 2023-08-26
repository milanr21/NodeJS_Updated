const http = require('http');
const fs = require('fs');

const index = fs.readFileSync('index.html', 'utf-8');

const dataJSON = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
const products = dataJSON.products;

const data = { age: 12 };

const server = http.createServer((req, res) => {
  console.log(req.url, req.method);
  let contentType = 'text/html';
  //   res.end('<h1 style="text-align: center;">Hello World!</h1>');
  //   console.log(req.url);
  //   res.setHeader('Content-Type', 'text/html');
  //   res.end(index);
  //   res.setHeader('Content-Type', 'application/json');
  //   res.end(dataJSON);

  if (req.url.startsWith('/product')) {
    const id = req.url.split('/')[2];
    const product = products.find((p) => p.id === +id);
    console.log(product);
    res.setHeader('Content-Type', contentType);
    let modifiedIndex = index
      .replace('**title**', product.title)
      .replace('**discount**', product.discountPercentage)
      .replace('**price**', product.price)
      .replace('**rating**', product.rating)
      .replace('**img**', product.thumbnail);
    res.end(modifiedIndex);
    return;
  }

  // case '/product':
  //   res.setHeader('Content-Type', 'text/html');
  //   // let modifiedIndex = index
  //   //   .replace('**title**', product.title)
  //   //   .replace('**discount**', product.discountPercentage)
  //   //   .replace('**price**', product.price)
  //   //   .replace('**rating**', product.rating)
  //   //   .replace('**img**', product.thumbnail);
  //   res.end(product);
  //   break;

  switch (req.url) {
    case '/':
      res.setHeader('Content-Type', contentType);
      res.end(index);
      break;

    case '/api':
      res.setHeader('Content-type', 'application/json');
      res.end(JSON.stringify(dataJSON));
      break;

    default:
      res.setHeader('Content-Type', contentType);
      res.writeHead(404, 'Not Found');
      res.end();
  }
});

server.listen(8080);
