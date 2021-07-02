import { MongoClient } from 'mongodb';

export async function connectToDatabase() {
    const client = await MongoClient('mongodb+srv://user2:tELg0JsqQoWUlUi2@cluster0.shrqp.mongodb.net/authentication?retryWrites=true&w=majority');

    return client;
}