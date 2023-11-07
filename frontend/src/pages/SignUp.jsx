import { useState } from "react";
import { Link } from "react-router-dom";
import { useSignup } from "../hooks/useSignup";
import "../styles/SignUp.css";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, isLoading } = useSignup();

  async function handleSubmit(e) {
    e.preventDefault();

    await signup(email, username, password);
  }
  console.log(error);
  return (
    <div className="sign-up">
      <div className="sign-up-left">
        <div className="sign-up-text-container">
          <h1>The List</h1>
          <h2>Sign Up for a new account</h2>
          <span className="no-account">
            Already have an account? <Link to="/login">Log in</Link>
          </span>
          <form className="sign-up-form" onSubmit={handleSubmit}>
            <div className="form-element">
              <label htmlFor="sign-up-email">Email</label>
              <input
                type="email"
                name="sign-up-email"
                id="sign-up-email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div className="form-element">
              <label htmlFor="sign-up-username">Username</label>
              <input
                type="text"
                name="sign-up-username"
                id="sign-up-username"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
              />
            </div>
            <div className="form-element">
              <label htmlFor="sign-up-password">Password</label>
              <input
                type="password"
                name="sign-up-password"
                id="sign-up-password"
                minLength="5"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
            <input
              type="submit"
              className="button sign-up-button"
              value="Submit"
              disabled={isLoading}
            />
            {error && <div className="error">{error}</div>}
          </form>
        </div>
      </div>
      <div className="sign-up-right"></div>
    </div>
  );
}
