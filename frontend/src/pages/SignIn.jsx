import React from "react";
import { Link } from "react-router-dom";
import "../styles/SignIn.css";

export default function SignIn() {
  return (
    <div className="sign-in">
      <div className="sign-in-left">
        <div className="sign-in-text-container">
          <h1>The List</h1>
          <h2>Log in to your account</h2>
          <span className="no-account">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </span>
          <form className="sign-in-form">
            <div className="form-element">
              <label htmlFor="sign-in-username">Username</label>
              <input
                type="text"
                name="sign-in-username"
                id="sign-in-username"
              />
            </div>
            <div className="form-element">
              <label htmlFor="sign-in-password">Password</label>
              <input
                type="text"
                name="sign-in-password"
                id="sign-in-password"
              />
            </div>
            <input
              type="button"
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
