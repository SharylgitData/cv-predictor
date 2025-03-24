// Login.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Log() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // Implement your login logic here

    navigate("/signup"); // Example of navigation after login
  };

  return (
    <div className="auth-container">
      {/* Left side: Form */}
      <div className="auth-left">
        <form className="auth-form" onSubmit={handleLogin}>
          <h2>Login</h2>
          <div className="input-group">
            <label htmlFor="email">Enter your email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Enter your password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="forgot-password">
            <a href="#!">Forgot password?</a>
          </div>

          <button type="submit" className="btn-primary">
            Login
          </button>

          <p className="switch-page">
            Don't have an account? <Link to="/signup">Signup now</Link>
          </p>
        </form>
      </div>

      {/* Right side: Replace text with your image */}
      <div className="auth-right">
        {/* If you want to keep a brand title, uncomment the next line */}
        {/* <div className="brand-title">Persona Predictor</div> */}

        <img src="/PP.png" alt="Persona Predictor" className="brand-image" />
      </div>
    </div>
  );
}

export default Log;
