import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import "../styles/SignIn.css";

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  async function handleSubmit(e) {
    e.preventDefault();

    await login(username, password);
  }

  useEffect(() => {
    function shouldRedirect() {
      if (user) {
        navigate("/search");
      }
    }
    shouldRedirect();
  });

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
              disabled={isLoading}
            />
            {error && <div className="error">{error}</div>}
          </form>
        </div>
      </div>
      <div className="sign-in-right"></div>
    </div>
  );
}
