import { useRef, useState } from "react";

function HomePage() {
    const [feedbackItems, setFeedbackItems] = useState([]);
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

    function loadFeedbackHandler() {
        fetch("/api/feedback")
            .then((response) => response.json())
            .then((data) => {
                setFeedbackItems(data.feedback);
            });
    }

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
            <hr />
            <button onClick={loadFeedbackHandler}>Load Feedback</button>
            <ul>
                {feedbackItems.map(item => <li key = {item.id}>{item.text}</li>)}
            </ul>
        </div>
    );
}

export default HomePage;
