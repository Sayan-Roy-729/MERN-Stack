import express from 'express';

import connectToDatabase from './helper.mjs';

const app = express();

app.get('/', (req, res, next) => {
    res.send('<h2>Hi there!</h2>');
});

await connectToDatabase();

app.listen(3000);