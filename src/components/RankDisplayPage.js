import React from "react";
import "../employerJobPortal.css";
import { useLocation } from "react-router-dom";

export default function RankDisplayPage() {
  const location = useLocation();
  const appliedUsers = location.state;

  return (
    <div className="employer-container">
      <h1>Candidate Ranking </h1>
      <div className="section-box">
        <table className="rank-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Rank</th>
              <th>Why this Rank?</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {appliedUsers?.length > 0 ? (
              appliedUsers.map((d) => (
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
