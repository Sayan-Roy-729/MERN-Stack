# NodeJS Basics

Core Modules => http, https, fs, path, os

## **`http`** Module:
### **`http.createServer`** and **`server.listen`**

```js
// import http module
const http = require('http');

const server = http.createServer((req, res) => {
  console.log(req);
  // for quite the server process
  process.exit();
});

// Starts a process in nodeJS to keet running listen for incoming request
server.listen(3000);
```

### Node.js Program Lifecycle
node app.js => Start Script => Parse Code, Register Variables & Functions => Event Loop => Keeps on running as long as there are event listeners registerede
![Node.js lifecycle and event loop](https://github.com/Sayan-Roy-729/MERN-Stack/blob/main/assets/NodeJS%20Lifecycle%20%26%20Event%20Loop.png)
