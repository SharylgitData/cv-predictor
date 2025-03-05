import React from "react";
import "../LoginSignUp.css";

function AuthLayout({ children }) {
  return (
    <div className="container">
      <div className="imageSection">
        <img src="PP.png" alt="Auth Illustration" />
      </div>

      <div className="loginSignupSection">{children}</div>
    </div>
  );
}

export default AuthLayout;
