const http = require('http');
const url = require('url');
const router = require('./router'); //Provided code doesn't work without this?

function start() {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log('Request Receivef For: ' + pathname);

    router.route(pathname); //This needed router. to run.

    response.writeHead(200, {'Content-Type': 'text/plain'});
    // response.write('<p>Hello World</p>');
    response.end();
  }

  http.createServer(onRequest).listen(8888);

  console.log('Server Initiated.');
}

exports.start = start;
