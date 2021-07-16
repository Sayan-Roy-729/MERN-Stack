# Next.JS Authentication (Email and Password):

## Create backend for sign up:
Create a file named *signup.js* inside *pages/api/auth* folder.

```js
import connectToDatabase from "../../../lib/db";
import { hashPassword } from "../../../lib/auth";

async function handler(req, res) {
    if (req.method !== "POST") {
        return;
    }
    const { email, password } = req.body;

    const connection = connectToDatabase();
    const client = await connection.connect();
    const db = client.db();
    // Check user already exits or not
    const existingUser = await db.collection("users").findOne({ email: email });
    if (existingUser) {
        res.status(422).json({ message: "User exits already!" });
        client.close();
        return;
    }
    // Hash the password using bcrypt package
    const hashedPassword = await hashPassword(password);
    // Store the user into the database
    const result = await db.collection("users").insertOne({
        email: email,
        password: hashedPassword,
    });
    // Response
    res.status(201).json({ message: "Created user!" });
    client.close();
}

export default handler;
```
And the front-end code will be simple like other cases. Call the API route and sign up.
```js
async function createUser(email, password) {
    const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email: email,
            password: password
        })
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
    }
    return data;
}
```

## Other backend routes for authentication like SignIn:
Create a file named named *[...nextauth].js* inside the *pages/api/auth* folder and paste the below code.
```js
import NextAuth from "next-auth";
import Providers from "next-auth/providers";

import { verifyPassword } from "../../../lib/auth";
import connectToDatabase from "../../../lib/db";

export default NextAuth({
    session: {
        jwt: true,
    },
    providers: [
        Providers.Credentials({
            // We need to authorize because we will use our custom forms
            async authorize(credentials) {
                const connection = await connectToDatabase();
                const client = await connection.connect();

                const usersCollection = client.db().collection("users");
                const user = await usersCollection.findOne({ email: credentials.email });
                // If user is not found, then SignIn is not possible
                if (!user) {
                    throw new Error("no user found!");
                }
                // If the password is not matched, then also SignIn is not possible
                const isValid = await verifyPassword(credentials.password, user.password);
                if (!isValid) {
                    client.close();
                    throw new Error("Could not log you in!");
                }

                client.close();
                // If all verification is ok, then return an object to tell Next-Auth that user can sign in
                return { email: user.email };
            }
        })
    ],
});
```
To sign in the user, below methods have to be used.
```js
import { signIn } from "next-auth/client";

function SignInComponent(props) {

    function formSubmitHandler(event) {
        event.preventDefault();
        // credentials is the provider of next-auth
        const result = await signIn("credentials", { 
            redirect: false,
            email: enteredEmail,
            password: enteredPassword
        });
        if (!result.error) {
            // set some auth state
        }
    }
    return (
        <form onSubmit={formSubmitHandler}>
            <label>This is a sign in form</label>
        </form>
    );
}
```

## Managing Active Session & Logout:
Render different UI according to the User's LogIn state and also implement the logout functionality.
```js
import Link from "next/link";
import { useSession, signOut } from "next-auth/client";

import classes from "./main-navigation.module.css";

function MainNavigation() {
    // If user is SignIn, then there will be object with values in session. And loading to inform us by Next.JS
    // that it is currently fetching the session of the user or not.
    const [session, loading] = useSession();

    function logoutHandler() {
        // SignOut and clear the session on LogOut
        signOut();
    }

    return (
        <header className={classes.header}>
            <Link href="/">
                <a>
                    <div className={classes.logo}>Next Auth</div>
                </a>
            </Link>
            <nav>
                <ul>
                    {
                        !session && !loading && (
                            <li>
                                <Link href="/auth">Login</Link>
                            </li>
                        )
                    }
                    {session && (
                        <li>
                            <Link href="/profile">Profile</Link>
                        </li>
                    )}
                    {
                        session && (
                            <li>
                                <button onClick={logoutHandler}>Logout</button>
                            </li>
                        )
                    }
                </ul>
            </nav>
        </header>
    );
}

export default MainNavigation;
```

## Client-Side Route Protection:
*useSession* can't help here. For this route protection, have to use *getSession*.
```js
import { useState, useEffect } from "react";
import { getSession } from "next-auth/client";

import ProfileForm from "./profile-form";
import classes from "./user-profile.module.css";

function UserProfile() {
    // Redirect away if NOT auth
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getSession().then(session => {
            // If user is not login, then there will be no session. So redirect
            if (!session) {
                window.location.href = "/auth";
            } else {
                setIsLoading(false);
            }
        });
    }, []);


    if (isLoading) {
        return <p className={classes.profile}>Loading...</p>;
    }

    return (
        <section className={classes.profile}>
            <h1>Your User Profile</h1>
            <ProfileForm />
        </section>
    );
}

export default UserProfile;
```

## Server-Side Route Protection:
The elegant way to protect the routes is server-side route protection because in client side protection, javascript will take some time to check that user is login or not. That time, the loading spinner could be seen by the user. But server-side protection, the loading state is not required.

```js
import { getSession } from "next-auth/client";

import UserProfile from "../components/profile/user-profile";

function ProfilePage() {
    return <UserProfile />;
}

export async function getServerSideProps(context) {
    const session = await getSession({ req: context.req });

    if (!session) {
        return {
            redirect: {
                destination: '/auth',
                // Permanent is false because for this case, redirect to that page
                permanent: false,
            },
        };
    }

    return {
        props: { session },
    };
}

export default ProfilePage;
```

## *next-auth* Session Provider Component in _app.js file:
One page checks the session and then if user goes to another page, there again have to check the session. Checking session again and again is not efficient because it requests to the backend again and again. For this, *Provider* component is used. Most pages the session passed through props will be undefined but if there is already a session check then Next.JS will not check for the next time. **Most important is that this have to add in _app.js file**

```js
import { Provider } from "next-auth/client";

import Layout from "../components/layout/layout";
import "../styles/globals.css";

// pageProps are the props for the pages. And it is mixed with getStaticProps & getServerSideProps
function MyApp({ Component, pageProps }) {
    return (
        <Provider session={pageProps.session}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </Provider>
    );
}

export default MyApp;
```

## Change Password:
In *pages/api/user/change-password.js* file
```js
import { getSession } from "next-auth/client";

import connectToDatabase from "../../../lib/db";
import { hashPassword, verifyPassword } from "../../../lib/auth";

async function handler(req, res) {
    if (req.method !== "PATCH") {
        return;
    }
    // If user is login the go further, otherwise not
    const session = getSession({ req: req });
    if (!session) {
        res.status(401).json({ message: "Not authenticated!" });
        return;
    }

    const userEmail = session.user.email;
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;

    const connection = connectToDatabase();
    const client = await connection.connect();
    const usersCollection = client.db().collection("users");
    const user = await usersCollection.findOne({ email: userEmail });

    if (!user) {
        res.status(404).json({ message: "User not found!" });
        client.close();
        return;
    }

    const currentPassword = user.password;
    const passwordAreEqual = await verifyPassword(oldPassword, currentPassword);
    if (!passwordAreEqual) {
        res.status(403).json({ message: "Invalid password!" });
        client.close();
        return;
    }

    const hashedPassword = await hashPassword(newPassword);

    const result = await usersCollection.updateOne({ email: userEmail }, { $set: { password: hashedPassword } });
    client.close();
    res.status(200).json({ message: "Password updated!" });
}

export default handler;
```
And the front-end will be simple api call.