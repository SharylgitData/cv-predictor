import React, { useState } from "react";
import "../LoginSignUp.css";
import { Link } from "react-router-dom";
import "../newLogin.css";
import { URLS } from "./Constants";

export default function SignUp() {
  const intialData = {
    first_name: "",
    last_name: "",
    mobile: "",
    country: "",
    email_id: "",
    password: "",
    confirmPassword: "",
    isorg: false,
    companyname: "",
    isorganization: "",
  };
  const [formData, setFormData] = useState(intialData);
  const [errors, setErrors] = useState({});
  const [data, setData] = useState(null);

  const validate = () => {
    let newErrors = {};
    if (!formData.first_name) newErrors.first_name = "First Name is required";
    if (!formData.last_name) newErrors.last_name = "Last Name is required";
    if (!formData.mobile.match(/^[0-9]{10}$/))
      newErrors.mobile = "Enter a valid 10-digit mobile number";
    if (!formData.email_id.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      newErrors.email_id = "Enter a valid email_id";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    console.log("formData.isorganizationss", formData.isorg);
    if (formData.isorg && !formData.companyname)
      newErrors.companyname = "Company Name is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;

    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = () => {
    formData.isorganization = formData.isorg ? "Yes" : "No";

    if (validate()) {
      const payload = {
        ...formData,
      };
      fetch(URLS.base + "signUp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          setData(data);

          setFormData(intialData);
        })
        .catch((error) => {
          console.error("Error:", error);
          setData(error);
        });
    }
  };

  return (
    <div className="login-container">
      {/* left side: background image + optional text */}
      <div className="login-left">
        <img className="personaImg" src="PP.png" alt="Auth Illustration" />
        {/* <h3>Persona Predictor</h3> */}
      </div>
      {/* right side: form */}
      <div className="login-right-signup">
        <h1>Sign Up</h1>
        {data?.result ? (
          <p className="resultMessage"> {data?.result} </p>
        ) : (
          <p></p>
        )}

        <div className="signin-link">
          Already have an account?{" "}
          <Link className="link" to="/">
            Click on Login
          </Link>
        </div>
        <div className="inputs">
          <div className="input">
            <img src="Assets/person.png" alt="First Name" />
            <input
              type="text"
              name="first_name"
              placeholder="First Name"
              value={formData.first_name}
              onChange={handleChange}
            />
            {errors.first_name && (
              <div className="error">{errors.first_name}</div>
            )}
          </div>

          <div className="input">
            <img src="Assets/person.png" alt="Last Name" />
            <input
              type="text"
              name="last_name"
              placeholder="Last Name"
              value={formData.last_name}
              onChange={handleChange}
            />
            {errors.last_name && (
              <div className="error">{errors.last_name}</div>
            )}
          </div>

          <div className="input">
            <img src="Assets/phone.png" alt="Mobile" />
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              placeholder="Mobile Number"
              onChange={handleChange}
            />
            {errors.mobile && <div className="error">{errors.mobile}</div>}
          </div>

          <div className="input">
            <img src="Assets/email.png" alt="Email" />
            <input
              type="email"
              name="email_id"
              value={formData.email_id}
              placeholder="Email Id"
              onChange={handleChange}
            />
            {errors.email_id && <div className="error">{errors.email_id}</div>}
          </div>

          <div className="input">
            <img src="Assets/password.png" alt="Password" />
            <input
              type="password"
              name="password"
              value={formData.password}
              placeholder="Password"
              onChange={handleChange}
            />
            {errors.password && <div className="error">{errors.password}</div>}
          </div>

          <div className="input">
            <img src="Assets/password.png" alt="Confirm Password" />
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              placeholder="Confirm Password"
              onChange={handleChange}
            />
            {errors.confirmPassword && (
              <div className="error">{errors.confirmPassword}</div>
            )}
          </div>

          <div className="checkbox-container">
            <input
              type="checkbox"
              name="isorg"
              id="isorg"
              value={formData.isorg}
              placeholder="Are you an organization?"
              onChange={handleChange}
            />
            <span className="organization" htmlFor="isorg">
              Are you an organization?
            </span>
          </div>

          {/* Company Name field shows only if organization checkbox is checked */}
          {formData.isorg && (
            <div className="input">
              <img src="Assets/company.png" alt="Company Name" />
              <input
                type="text"
                name="companyname"
                value={formData.companyname}
                placeholder="Company Name"
                onChange={handleChange}
              />
              {errors.companyname && (
                <div className="error">{errors.companyname}</div>
              )}
            </div>
          )}
        </div>
        <div className="submit-container">
          <div className="submit" onClick={handleSubmit}>
            Sign Up
          </div>
        </div>
      </div>
    </div>
  );
}
