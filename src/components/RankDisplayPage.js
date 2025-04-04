import React from "react";
import "../employerJobPortal.css";
import { useLocation, useNavigate } from "react-router-dom";

export default function RankDisplayPage() {
  const location = useLocation();
  const { appliedusers, emailId, userData } = location.state || {};
  console.log("the appliedusers is rankpage", userData);
  const navigate = useNavigate();
  const logout = () => {
    navigate("/");
  };
  return (
    <div className="employer-container">
      <div className="logoutDiv">
        <p
          className="gotoPreviousPage"
          onClick={() => navigate("/employerJobPost", { state: userData })}
        >
          {" "}
          back{" "}
        </p>
        <p className="userEmail">{emailId}</p>
        <p className="logout" onClick={logout}>
          Logout
        </p>
      </div>
      <h1>Candidate Ranking </h1>
      <div className="section-box">
        <table className="rank-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Score</th>
              <th>Why this Score?</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {appliedusers?.length > 0 ? (
              appliedusers.map((d) => (
                <tr>
                  <td>{d.name}</td>
                  <td>{d.rank}</td>
                  <td>{d.rankReason}</td>
                  <td>
                    <button className="request-btn">Contact</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="defaultMessage">
                  No one applied to this job yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
