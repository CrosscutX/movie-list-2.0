import React from "react";
import { Link } from "react-router-dom";
import "../styles/SignUp.css";

export default function SignUp() {
  return (
    <div className="sign-up">
      <div className="sign-up-left">
        <div className="sign-up-text-container">
          <h1>The List</h1>
          <h2>Sign Up for a new account</h2>
          <span className="no-account">
            Already have an account? <Link to="/signin">Sign In</Link>
          </span>
          <form className="sign-up-form">
            <div className="form-element">
              <label htmlFor="sign-up-email">Email</label>
              <input type="text" name="sign-up-email" id="sign-up-email" />
            </div>
            <div className="form-element">
              <label htmlFor="sign-up-username">Username</label>
              <input
                type="text"
                name="sign-up-username"
                id="sign-up-username"
              />
            </div>
            <div className="form-element">
              <label htmlFor="sign-up-password">Password</label>
              <input
                type="text"
                name="sign-up-password"
                id="sign-up-password"
              />
            </div>
            <input
              type="button"
              className="button sign-up-button"
              value="Submit"
            />
          </form>
        </div>
      </div>
      <div className="sign-up-right"></div>
    </div>
  );
}
