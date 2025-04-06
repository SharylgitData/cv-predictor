import React from "react";
import "../employerJobPortal.css";
import { useLocation, useNavigate } from "react-router-dom";

export default function CandidateApplication() {
  const location = useLocation();
  const { emailId, data, jobDetails } = location.state || {};
  console.log("the candidate applications are ", data);
  const navigate = useNavigate();
  const logout = () => {
    navigate("/");
  };
  return (
    <div className="employer-container">
      <div className="logoutDiv">
        <p
          className="gotoPreviousPage"
          onClick={() => navigate("/jobseeker", { state: jobDetails })}
        >
          {" "}
          back{" "}
        </p>
        <p className="userEmail">{emailId}</p>
        <p className="logout" onClick={logout}>
          Logout
        </p>
      </div>
      <h1>Jobs Applied To </h1>
      <div className="section-box">
        <table className="rank-table">
          <thead>
            <tr>
              <th>Company Name</th>
              <th>Job Title</th>
              <th>Score</th>
              <th>Area of Improvement</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data?.length > 0 ? (
              data.map((d) => (
                <tr>
                  <td>{d.organization}</td>
                  <td>{d.jobTitle}</td>
                  <td>{d.rank}</td>
                  <td>{d.improvementArea}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="defaultMessage">
                  You haven't applied at any positions
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
