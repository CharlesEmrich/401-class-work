const http = require('http');
const url = require('url');

function start(route, handle) {
  function onRequest(request, response) {
    var postData = '';
    var pathname = url.parse(request.url).pathname;
    console.log('Request for ' + pathname + ' received.');

    request.setEncoding('utf-8');

    request.addListener('data', function(chunk) {
      postData += chunk;
      console.log('Chunk Rec\'d.: ' + chunk + '.');
    });

    request.addListener('end', function() {
      route(handle, pathname, response, postData);
    });
  }

  http.createServer(onRequest).listen(8888);
  console.log('Server has started.');
}

exports.start = start;
