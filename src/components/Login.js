// import React from "react";
// import "../LoginSignUp.css";
// export default function Login() {
//   const validateAndProcess = (values) => {};

//   return (
//     <>
//       {/* <div className="container"> */}
//       <div className="info">
//         {" "}
//         If you are yet to Register then click on Sign up button{" "}
//       </div>
//       <div className="text"> Login </div>
//       <div className="underline" />
//       <div className="inputs">
//         <div className="input">
//           <img src="Assets/email.png" alt="Email Id" />
//           <input type="email" placeholder="Email Id" />
//         </div>
//         <div className="input">
//           <img src="Assets/password.png" alt="Password" />
//           <input type="password" placeholder="Password" />
//         </div>
//       </div>
//       <div className="forgot-password">Forgot Password? </div>
//       <div className="submit-container">
//         <div className="submit" onClick={validateAndProcess}>
//           Login
//         </div>
//       </div>
//       {/* </div> */}
//     </>
//   );
// }

import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../newLogin.css";
import "../LoginSignUp.css";

export default function Login() {
  const [formData, setFormData] = useState({
    email_id: "",
    password: "",
  });

  const handleLogin = (e) => {
    e.preventDefault();
    // Your login logic (e.g. API call) goes here
  };

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;

    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = () => {
    formData.isorganization = formData.isorganization ? "Yes" : "No";
    console.log(formData);

    const payload = {
      ...formData,
      usertype: formData.isorganization ? "company" : "jobseeker",
    };
    fetch("http://localhost:8090/resume/evaluator", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => console.log("Success:", data))
      .catch((error) => console.error("Error:", error));
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
        <form onSubmit={handleLogin}>
          <div className="inputs-login">
            <div className="input">
              <img src="Assets/email.png" alt="Email" />
              <input
                type="email"
                name="email_id"
                placeholder="Email Id"
                onChange={handleChange}
              />
            </div>

            <div className="input">
              <img src="Assets/password.png" alt="Password" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
              />
            </div>
          </div>
          {/* <button type="submit" className="login-button">
            Sign In
          </button> */}
          <div className="submit-container">
            <div className="submit" onClick={handleSubmit}>
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
