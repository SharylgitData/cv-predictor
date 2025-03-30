import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../employerJobPortal.css";
import { URLS } from "./Constants";
export default function ApplyForJob() {
  const location = useLocation();
  const navigate = useNavigate();
  // Retrieve the job details passed from the JobSeeker page
  const { job, emailId, jobDetails } = location.state || {};

  //console.log("jobDetails with applyforjb page", jobDetails);
  const [joblist, setJoblist] = useState(jobDetails || []);
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleSubmitApplication = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!resume) {
      setError("Please upload a resume before submitting.");
      setLoading(false);
      return;
    }

    console.log("the url is apply/", URLS.base);
    try {
      const formData = new FormData();
      formData.append("resume", resume);
      formData.append("job_id", job.job_id); // Ensure job.job_id is the correct property
      formData.append("email_id", emailId || ""); // Use the appropriate email field
      formData.append("job_description", job.job_description);
      formData.append("job_title", job.job_title);
      console.log("data to send to java to apply/", formData);
      const response = await fetch(URLS.base + "apply", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to apply for the job. Please try again later.");
      }

      const message = await response.text();
      alert(message);
      console.log(joblist);
      const updatedJobList = joblist.data.jobDetails.filter(
        (req) => req.job_id !== job.job_id
      );
      const updatedState = {
        data: {
          ...joblist.data,
          jobDetails: updatedJobList,
        },
      };
      //console.log("updatedState", updatedState);

      navigate("/jobseeker", { state: updatedState });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
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
      <h1>Apply for Job</h1>
      {job ? (
        <div className="section-box applyJob-section">
          <p className="job_header">
            <strong>Company Name:</strong> {job.organization}
          </p>
          <p className="job_header">
            <strong>Job Title:</strong> {job.job_title}
          </p>
          <p className="job_header">
            <strong>Job Description:</strong>
          </p>
          <div className="jd-section">{job.job_description}</div>

          <form onSubmit={handleSubmitApplication}>
            <label htmlFor="resume">
              <strong className="uploadResume">Upload Resume:</strong>
            </label>
            <input
              type="file"
              id="resume"
              name="resume"
              onChange={handleFileChange}
              required
            />
            {resume && <p className="file-name">{resume.name}</p>}
            {error && <p className="error-message">{error}</p>}
            <br />
            <button
              type="submit"
              className="decide-btn green"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Application"}
            </button>
            <button
              type="button"
              className="decide-btn red"
              onClick={() => navigate("/jobseeker", { state: jobDetails })}
            >
              Back to Listings
            </button>
          </form>
        </div>
      ) : (
        <p>Job details not available.</p>
      )}
    </div>
  );
}
