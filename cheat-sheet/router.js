const fs = require('fs');
const path = require('path');

let notes = [];

function serveStatic (req, res) {
  console.log(req.method, req.url);
  if (req.method === 'GET' && req.url === '/notes') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify(notes));
  }
  if (req.method === 'POST' && req.url === '/notes') {
    res.statusCode = 200;

    let data = '';
    req.on('data', (chunk) => data += chunk);
    req.on('end', () => {
      notes.push(JSON.parse(data));
      console.log(data);
      res.end();
    });
    return;
  }

  let filePath = path.join(__dirname, req.url);
  console.log(filePath);

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/plain');
      res.end('File not found on this server');
    } else {
      res.statusCode = 200;
      res.setHeader('Content-Type', getType(req.url));
      res.end(content);
    }
  });
}

function getType (fileName) {
  if (/.html/i.test(fileName))
    return 'text/html';
  if (/.css/i.test(fileName))
    return 'text/css';
  if (/.js/i.test(fileName))
    return 'application/javascript';

  return 'text/plain';
}

module.exports = serveStatic;
