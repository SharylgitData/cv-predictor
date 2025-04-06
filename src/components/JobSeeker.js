import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../employerJobPortal.css";
import { URLS } from "./Constants";

export default function JobSeeker() {
  const location = useLocation();
  const jobDetails = location.state;
  const [jobs, setJobs] = useState(jobDetails?.data.jobDetails || []);
  const navigate = useNavigate();
  const emailId = jobDetails?.data.emailId;
  console.log("jobseeker", jobDetails);
  const handleApply = (job) => {
    if (
      jobDetails?.data.personality_test &&
      jobDetails?.data.personality_test.toLowerCase() === "y"
    ) {
      fetch(URLS.base + `ifapplied/${job.job_id}/${emailId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.text())
        .then((response) => {
          if (response.includes("already applied"))
            alert("You have already applied to this position");
          else
            navigate("/applyForJob", { state: { job, emailId, jobDetails } });
        });
    } else {
      // otherwise  redirect to the personality test page
      navigate("/questionnaire", {
        state: { job, emailId, jobDetails },
      });
    }
  };
  const logout = () => {
    navigate("/");
  };

  const candidateJobApp = () => {
    fetch(URLS.base + `candidateapp/${emailId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        navigate("/candidateappliedjobs", {
          state: { emailId, data, jobDetails },
        });
      });
  };

  return (
    <div className="employer-container">
      <div className="logoutDiv">
        <p className="userEmail">{emailId}</p>
        <p className="logout" onClick={logout}>
          Logout
        </p>
        <div className="appliedJobs" onClick={candidateJobApp}>
          <p>Applied jobs</p>
        </div>
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
                <tr key={job.job_id}>
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
          <p className="noJoblist">No job listings available at the moment.</p>
        )}
      </div>
    </div>
  );
}
