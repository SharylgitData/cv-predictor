import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../employerJobPortal.css";
import { URLS } from "./Constants";
export default function Admin() {
  const location = useLocation();
  const jobReq = location.state;
  const navigate = useNavigate();
  // If you had a fetch call to get job requests from the backend, you can re-enable it
  // For now, we’ll just use the data from jobReq?.data.jobDetails, if it exists
  const [jobRequests, setJobRequests] = useState(
    jobReq?.data?.jobDetails || []
  );

  const [selectedJobDesc, setSelectedJobDesc] = useState(null);

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    // Check for Invalid Date
    if (isNaN(date.getTime())) return dateStr;
    return date.toISOString().split("T")[0];
  };

  // Handle Accept/Reject actions. 'action' is either "accept" or "reject"
  const handleAction = (job_id, action) => {
    const status = action === "accept" ? "Approved" : "Rejected";

    fetch(URLS.base + `decidePosting/${job_id}/${status}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        alert(`Job request ${action}ed successfully!`);
        // Remove the processed request from the list
        setJobRequests((prev) => prev.filter((req) => req.job_id !== job_id));
      })
      .catch((error) =>
        console.error(`Error ${action}ing job request:`, error)
      );
  };

  const logout = () => {
    navigate("/");
  };

  return (
    <div className="employer-container">
      <div className="logoutDiv">
        <p className="userEmail">{jobReq?.data?.emailId}</p>
        <p className="logout" onClick={logout}>
          Logout
        </p>
      </div>
      <h1>Admin: Job Requests</h1>
      <div className="section-box">
        {jobRequests && jobRequests.length > 0 ? (
          <table className="job-requests-table">
            <thead>
              <tr>
                <th>Organization</th>
                <th>Email</th>
                <th>Job Title</th>
                <th>Description</th>
                <th>Deadline</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobRequests.map((req) => (
                <tr key={req.job_id}>
                  <td>{req.organization}</td>
                  <td>{req.emailId || jobReq?.data.emailId}</td>
                  <td>{req.job_title}</td>
                  <td>
                    <a
                      href="#!"
                      onClick={(e) => {
                        e.preventDefault();
                        setSelectedJobDesc(req.job_description);
                      }}
                    >
                      View Description
                    </a>
                  </td>
                  <td>{formatDate(req.deadline)}</td>
                  <td>
                    <button
                      className="decide-btn green"
                      onClick={() => handleAction(req.job_id, "accept")}
                    >
                      Accept
                    </button>
                    <button
                      className="decide-btn red"
                      onClick={() => handleAction(req.job_id, "reject")}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="noJoblist">No job requests available.</p>
        )}
      </div>

      {/* Modal for Job Description */}
      {selectedJobDesc && (
        <div className="modal">
          <div className="modal-content admin-job-description">
            <span className="close" onClick={() => setSelectedJobDesc(null)}>
              &times;
            </span>
            <h2>Job Description</h2>
            <p>{selectedJobDesc}</p>
          </div>
        </div>
      )}
    </div>
  );
}
