import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../employerJobPortal.css";

export default function JobSeeker() {
  const location = useLocation();
  const jobDetails = location.state;
  const [jobs, setJobs] = useState(jobDetails?.data.jobDetails || []);
  const navigate = useNavigate();
  const emailId = jobDetails?.data.emailId;

  const handleApply = (job) => {
    // Check the personalityTest attribute (case-insensitive)
    if (
      jobDetails?.data.personality_test &&
      jobDetails?.data.personality_test.toLowerCase() === "y"
    ) {
      // Navigate to the Apply For Job page and pass the job details in state
      navigate("/applyForJob", { state: { job, emailId, jobDetails } });
    } else {
      // Otherwise, redirect to the personality test page
      navigate("/questionnaire", {
        state: { job, emailId, jobDetails },
      });
    }
  };
  const logout = () => {
    navigate("/");
  };
  return (
    <div className="employer-container">
      <div className="logoutDiv">
        <p className="userEmail">{emailId}</p>
        <p className="logout" onClick={logout}>
          Logout
        </p>
      </div>
      <h1>Job Listings</h1>
      <div className="section-box">
        {jobs.length > 0 ? (
          <table className="job-requests-table">
            <thead>
              <tr>
                <th>Company Name</th>
                <th>Job Title</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job.id}>
                  <td>{job.organization}</td>
                  <td>{job.job_title}</td>
                  <td>
                    <button
                      className="decide-btn green"
                      onClick={() => handleApply(job)}
                    >
                      Apply
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No job listings available at the moment.</p>
        )}
      </div>
    </div>
  );
}
