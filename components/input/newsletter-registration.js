import { useState } from "react";
import classes from "./newsletter-registration.module.css";

function NewsletterRegistration() {
  const [newsletterData, setNewsletterData] = useState("");
  function registrationHandler(event) {
    event.preventDefault();
    const data = { email: newsletterData };
    fetch("/api/newsletter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));

    // fetch user input (state or refs)
    // optional: validate input
    // send valid data to API
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            value={newsletterData}
            onChange={(e) => setNewsletterData(e.target.value)}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
