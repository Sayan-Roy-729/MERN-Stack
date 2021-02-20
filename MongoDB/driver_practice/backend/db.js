const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;
const mongodbURL =
  'mongodb+srv://sayan:Sanchayan729@cluster0.ibkwy.mongodb.net/shop?retryWrites=true&w=majority';

let _db;

const initDb = (callback) => {
  if (_db) {
    console.log('Database is already initialized');
    return callback(null, _db);
  }
  MongoClient.connect(mongodbURL)
    .then(client => {
      _db = client.db();
      callback(null, _db);
    })
    .catch((err) => {
      callback(err);
    });
};

const getDb = () => {
  if (!_db) {
    throw Error("Database not initialized");
  }
  return _db;
};

module.exports = {
  initDb,
  getDb
};