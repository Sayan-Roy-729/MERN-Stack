const http = require('http');

const routes = require('./routes');

const server = http.createServer(routes.handler);

// Starts a process in nodeJS to keet running listen for incoming request
server.listen(3000);
