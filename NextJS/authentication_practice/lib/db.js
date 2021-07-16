import { MongoClient } from "mongodb";

function connectToDatabase() {
    return new MongoClient("mongodb://localhost:27017/next-authentication", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}

export default connectToDatabase;