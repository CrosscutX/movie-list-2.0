import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/SignIn.css";

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    console.log(username, password);
  }
  return (
    <div className="sign-in">
      <div className="sign-in-left">
        <div className="sign-in-text-container">
          <h1>The List</h1>
          <h2>Log in to your account</h2>
          <span className="no-account">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </span>
          <form className="sign-in-form" onSubmit={handleSubmit}>
            <div className="form-element">
              <label htmlFor="sign-in-username">Username</label>
              <input
                type="text"
                name="sign-in-username"
                id="sign-in-username"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
              />
            </div>
            <div className="form-element">
              <label htmlFor="sign-in-password">Password</label>
              <input
                type="password"
                name="sign-in-password"
                id="sign-in-password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
            <input
              type="submit"
              className="button sign-in-button"
              value="Submit"
            />
          </form>
        </div>
      </div>
      <div className="sign-in-right"></div>
    </div>
  );
}
