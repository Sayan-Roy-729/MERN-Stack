const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');

const feedRoutes = require('./routes/feed');
const authRoutes = require('./routes/auth');

const app = express();

// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded; form data
app.use(bodyParser.json()); // application/json data

// register multer for handling file upload
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images');
  },
  filename: function (req, file, cb) {
    const randomNumber = (
      Math.floor(Math.random() * (10000000 - 0 + 1)) + 0
    ).toString();
    const date = new Date();
    cb(null, date.getMilliseconds() + randomNumber + '-' + file.originalname); //Appending extension
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    console.log('Failed to save file');
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(
  // multer({ storage: fileStorage, fileFilter: fileFilter }).single('image')
  multer({ storage: storage, fileFilter: fileFilter }).single('image')
);

// serve image folder statically
app.use('/images', express.static(path.join(__dirname, 'images')));

// Resolve The CORS Error
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// register the routes
app.use('/feed', feedRoutes);
app.use('/auth', authRoutes);

// error handling
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

// Connect with the database
mongoose
  .connect('mongodb://localhost/restApiPost', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    const server = app.listen(8080);
    // const io = require('socket.io')(server);
    const io = require('./socket').init(server);
    // const io = require('./socket').init(server, {
    //   cors: {
    //     origin: 'http://localhost:3000',
    //     credentials: true,
    //   },
    // });
    io.on('connection', (socket) => {
      console.log('Client connected');
    });
  })
  .catch((err) => {
    console.log(err);
  });
