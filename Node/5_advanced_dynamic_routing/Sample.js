
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://sayan:<password>@cluster0.shrqp.mongodb.net/<dbname>?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});


// mongodb+srv://sayan:<password>@cluster0.shrqp.mongodb.net/<dbname>?retryWrites=true&w=majority