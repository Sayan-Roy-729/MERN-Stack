const fs = require('fs');

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === '/') {
    res.write('<html>');
    res.write('<head><title>Enter Message</title><head>');
    res.write(
      '<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>'
    );
    res.write('</html>');

    // End the response
    return res.end();
  }

  if (url === '/message' && method === 'POST') {
    const body = [];

    // which event want; here data event
    req.on('data', (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });

    // it will run when parsed completlty the incoming data
    return req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split('=')[1];

      // fs.writeFileSync('message.txt', message);

      // Asynchronously writes data to a file, replacing the file if it already exists.
      fs.writeFile('message.txt', message, (error) => {
        res.statusCode = 302;
        res.setHeader('Locationa', '/');
        return res.end();
      });
    });
  }

  // for quite the server process
  process.exit();

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
};

// Different Methods to export
// Method-1
// module.exports = requestHandler;

// Mthod-2
// module.exports = {
//   handler: requestHandler,
//   someText: 'Some hard coded text'
// };

// Method-3
// module.exports.handler = requestHandler;
// module.exports.someText = 'Some hard coded text';

// Method-4
exports.handler = requestHandler;
exports.someText = 'Some hard coded text';
