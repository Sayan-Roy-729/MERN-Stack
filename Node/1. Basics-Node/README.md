# NodeJS Basics

Core Modules => http, https, fs, path, os

## **`http`** Module:
### **`http.createServer`** and **`server.listen`**

```js
// import http module
const http = require('http');

const server = http.createServer((req, res) => {
    // Handle with request
    console.log(req.url, req.method, req.headers);

    // for quite the server process
    // process.exit();

    // Sending Responses =>
    // Set Header
    res.setHeader('Content-Type', 'text/html');

    // Write some data on response
    res.write('<html>');
    res.write('<head><title>My First Page</title></head>');
    res.write('<body><h1>Hello from Node.js Server!</h1></body>');
    res.write('</html>');

    // After working with response, end the response
    res.end();
});

// Starts a process in nodeJS to keet running listen for incoming request
server.listen(3000);
```

### Node.js Program Lifecycle
node app.js => Start Script => Parse Code, Register Variables & Functions => Event Loop => Keeps on running as long as there are event listeners registerede
![Node.js lifecycle and event loop](https://github.com/Sayan-Roy-729/MERN-Stack/blob/main/assets/redux.png)
