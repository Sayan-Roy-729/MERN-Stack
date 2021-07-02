# Api Routes
## Our First API:
Create a folder named `api` has to be added directly to the `pages` folder and inside this folder, create files for the requirements of the api routes.
```bash
pages
  |--- api
  |     |--- feedback.js
  |     |--- [feedbackId].js
  |--- feedback
  |     |--- index.js
  |--- index.js
  |--- _app.js
```
Inside the api folder, the files will contain the api code. There should not have any react or nextJS related code.
```js
const handler = (req, res) => {
    res.status(200).json({message: 'This works!'});
}

export default handler;
```
Now visit *localhost:3000/api/feedback* and you will get the response. By-default all types of request will handle this function.

## Parsing Incoming Request & Execute Server-Side Code:
In `index.js` file:
```js
import { useRef } from "react";

function HomePage() {
    const emailInput = useRef();
    const feedbackInput = useRef();

    const submitFormHandler = (event) => {
        event.preventDefault();

        const enteredEmail = emailInput.current.value;
        const enteredFeedback = feedbackInput.current.value;
        const reqBody = { email: enteredEmail, text: enteredFeedback };

        fetch("/api/feedback", {
            method: "POST",
            body: JSON.stringify(reqBody),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => console.log(data));
    };

    return (
        <div>
            <h1>The Home Page</h1>
            <form onSubmit={submitFormHandler}>
                <div>
                    <label htmlFor="email">Your Email Address</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Email"
                        ref={emailInput}
                    />
                </div>
                <div>
                    <label htmlFor="feedback">Your feedback</label>
                    <textarea
                        id="feedback"
                        rows="5"
                        ref={feedbackInput}
                    ></textarea>
                </div>
                <button type="submit">Send Feedback</button>
            </form>
        </div>
    );
}

export default HomePage;
```
`feedback.js` file
```js
import fs from 'fs';
import path from 'path';

export function buildFeedbackPath() {
    return path.join(process.cwd(), 'data', 'feedback.json');
}

export function extractFeedback(filePath) {
    const fileData = fs.readFileSync(filePath);
    const data = JSON.parse(fileData);
    return data;
}

const handler = (req, res) => {
    if (req.method === 'POST') {
        const email = req.body.email;
        const text = req.body.text;

        const newFeedback = {
            id: new Date().toString(),
            email,
            text,
        };

        // store that is a database
        const filePath = buildFeedbackPath();
        const data = extractFeedback(filePath);
        data.push(newFeedback);
        fs.writeFileSync(filePath, JSON.stringify(data));
        res.status(201).json({message: 'Success!', feedback: newFeedback});
    } else {
        const filePath = buildFeedbackPath();
        const data = extractFeedback(filePath);
        res.status(200).json({feedback: data});
    }
}

export default handler;
```

## API Routes For Pre-Rendering Pages:
Inside the *getStaticProps*, we can communicate with the apis but those apis should be external apis like firebase apis or other domain registered backend apis. You should not use fetch apis inside this *getStaticProps* or *getServerSideProps* to talk to your own api. Because all the backend and frontend codes are part of one project, therefore ultimately all server by one server. So you should use the api codes inside this *async functions.* For backend code, look above section. NextJS is very smart that it doesn't open the code in client side. </br>
The below is from *localhost:3000/feedback*
```js
import { buildFeedbackPath, extractFeedback } from '../api/feedback';

function FeedbackPage(props) {
    return (
        <ul>
            {props.feedbackItems.map(item => <li key={item.id}>{item.text}</li>)}
        </ul>
    );
}

export async function getStaticProps() {
    const filePath = buildFeedbackPath();
    const data = extractFeedback(filePath);
    return {
        props: {
            feedbackItems: data,
        }
    };
}

export default FeedbackPage;
```

## Dynamic API Routes:
Just imagine that you have to fetch one feedback details. To access this feedback you want to send the id of the feedback through api and get the response. For that, have to able to access this dynamic id inside the backend NextJS code. For that create file /api/[feedbackId].js and code of this file

```js
import { buildFeedbackPath, extractFeedback } from "./feedback";

function handler(req, res) {
    const feedbackId = req.query.feedbackId;
    const filePath = buildFeedbackPath();
    const feedbackData = extractFeedback(filePath);
    const selectedFeedback = feedbackData.find(
        (feedback) => feedback.id === feedbackId
    );
    res.status(200).json({ feedback: selectedFeedback });
}

export default handler;
```
The frontend code will be
```js
import { Fragment, useState } from "react";

import { buildFeedbackPath, extractFeedback } from "../api/feedback";

function FeedbackPage(props) {
    const [feedbackData, setFeedbackData] = useState();

    function loadFeedbackHandler(id) {
        fetch(`/api/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setFeedbackData(data.feedback);
            });
    }

    return (
        <Fragment>
            {feedbackData && <p>{feedbackData.email}</p>}
            <ul>
                {props.feedbackItems.map((item) => (
                    <li key={item.id}>
                        {item.text}{" "}
                        <button onClick={() => loadFeedbackHandler(item.id)}>
                            Show Details
                        </button>
                    </li>
                ))}
            </ul>
        </Fragment>
    );
}

export async function getStaticProps() {
    const filePath = buildFeedbackPath();
    const data = extractFeedback(filePath);
    return {
        props: {
            feedbackItems: data,
        },
    };
}

export default FeedbackPage;
```

## Different Ways of Structuring API Route Files:
```bash
pages
  |--- api
  |     |--- feedback
  |     |       |--- index.js               // domain.com/api/feedback
  |     |       |--- [...feedbackId].js     // domain.com/api/feedback/someId
  |     |--- [...feedbackId].js             // domain.com/api/someId
  |--- feedback
  |     |--- index.js
  |--- index.js
  |--- _app.js
```
The `[...feedbackId].js` file is not just handle the */api/some-value*, but also handle the */api/some-value/more-segments*.