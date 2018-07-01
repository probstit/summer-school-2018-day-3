const http = require('http');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;

const router = require('./router');
const server = http.createServer(router);

server.listen(port, hostname, () => {
  console.log(`magic happens at http://${hostname}:${port}/`);
});
