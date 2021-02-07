const http = require('http');

const server = http.createServer((req, res) => {
    console.log(req);
    // for quite the server process
    process.exit();
});

// Starts a process in nodeJS to keet running listen for incoming request
server.listen(3000);