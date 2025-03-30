import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../newLogin.css";
import "../LoginSignUp.css";
import { URLS } from "./Constants";
export default function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [formData, setFormData] = useState({
    email_id: "",
    password: "",
  });

  const handleLogin = () => {
    console.log("formData", formData);

    const payload = {
      ...formData,
    };
    fetch(URLS.base + "login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((userData) => {
        console.log("login page response data ", userData);
        if (userData?.data?.type === "organization") {
          navigate("/employerJobPost", { state: userData });
        } else if (userData?.data?.type === "jobSeeker") {
          navigate("/jobseeker", { state: userData });
        } else if (userData?.data?.type === "admin") {
          navigate("/admin", { state: userData });
        } else {
          alert("Unknown user type, please contact support.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setData(error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="login-container">
      {/* left side: background image + optional text */}
      <div className="login-left">
        <img className="personaImg" src="PP.png" alt="Auth Illustration" />
        {/* <h3>Persona Predictor</h3> */}
      </div>
      {/* right side: form */}
      <div className="login-right">
        <h1>Login</h1>
        <p className="resultMessage"> {data?.result}</p>
        <form onSubmit={handleLogin}>
          <div className="inputs-login">
            <div className="input">
              <img src="Assets/email.png" alt="Email" />
              <input
                type="email"
                name="email_id"
                placeholder="Email Id"
                value={formData.email_id}
                onChange={handleChange}
              />
            </div>

            <div className="input">
              <img src="Assets/password.png" alt="Password" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>
          {/* <button type="submit" className="login-button">
            Sign In
          </button> */}
          <div className="submit-container">
            <div className="submit" onClick={handleLogin}>
              Sign In
            </div>
          </div>

          <div className="signup-link">
            Don’t have an account?{" "}
            <Link className="link" to="/signUp">
              Sign up now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
