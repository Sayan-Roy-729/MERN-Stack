import { hashPassword } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/db";

const handler = async (req, res) => {
    if (req.method !== 'POST') return;

    const data = req.body;
    const { email, password } = data;

    if (
        !email ||
        !email.includes("@") ||
        !password ||
        password.trim().length < 7
    ) {
        res.status(422).json({
            message:
                "Invalid input - password should also be at least 7 characters long.",
        });
        return;
    }
    let client;
    try {
        client = await connectToDatabase();
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message});
        return;
    }
    const db = client.db();

    const existingUser = await db.collection('users').findOne({ email: email });

    if (existingUser) {
        res.status(422).json({message: 'User exists already!'});
        client.close();
        return;
    }

    const hashedPassword = await hashPassword(password);

    const result = await db.collection("users").insertOne({
        email,
        password: hashedPassword,
    });

    res.status(201).json({message: 'created user!'});
    client.close();
};

export default handler;
