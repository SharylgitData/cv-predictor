import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../employerJobPortal.css";
import { URLS } from "./Constants";

function EmployerJobPortal() {
  const location = useLocation();
  const userData = location.state;
  console.log("the userdata from rnak page is ", userData);
  const [selectedOption, setSelectedOption] = useState("requestJob");

  const [deadline, setDeadline] = useState("");
  const [job_title, setjobTitle] = useState("");
  const [requestSent, setrequestSent] = useState("");

  const [formData, setFormData] = useState({
    job_title: "",
    organization: userData?.data.userName,
    email_id: userData?.data.emailId,
    job_description: "",
    deadline,
    status: "Pending",
  });

  const [postedJobs, setPostedJobs] = useState(userData?.data.jobDetails || []);
  const emailId = formData?.email_id;
  //const postedJobs = userData?.data.jobDetails;

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const successMsg = (data) => {
    // setrequestSent("Your job request has been successfully sent to the Admin");
    setrequestSent(data.message);
  };

  // Handle job request submission
  const handleRequestJob = () => {
    const jobPayload = { ...formData };
    console.log("jobPayload", jobPayload);
    // Send to backend API
    fetch(URLS.base + "sendJobRequest", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(jobPayload),
    })
      .then((response) => response.json())
      .then((data) => {
        //alert("Job request submitted successfully!");
        window.confirm("Job request submitted successfully!");
        // setJobDescription("");
        // setDeadline("");
        successMsg(data);
        setFormData({
          job_title: "",
          organization: userData?.data.userName,
          email_id: userData?.data.emailId,
          job_description: "",
          deadline,
          status: "Pending",
        });
      })
      .catch((error) => console.error("Error submitting job request:", error));
  };

  const getUserApplied = (id) => {
    console.log("the job id is ", id);
    fetch(URLS.base + `getAppliedUsers/${id}`, {
      method: "GET",
      headers: { "content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((appliedusers) => {
        console.log("the appliedusers is ", appliedusers);
        navigate("/userApplied", {
          state: { appliedusers, emailId, userData },
        });
      })
      .catch((error) => console.error("Error submitting job request :", error));
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
      <h1>Employer Job Portal</h1>
      <input type="text" className="hidden" value={userData?.emailId} />

      {/* Options */}
      <div className="option-buttons">
        <button
          className="option-button request"
          onClick={() => setSelectedOption("requestJob")}
        >
          Request a Job Post
        </button>
        <button
          className="option-button view"
          onClick={() => setSelectedOption("viewJobs")}
        >
          View Jobs Posted
        </button>
      </div>

      {/* Request Job Post Section */}
      {selectedOption === "requestJob" && (
        <div className="section-box">
          <h2>Request a Job Post</h2>
          <label className="job_title">Job Title: </label>
          <input
            type="text"
            className="date-input"
            name="job_title"
            value={formData.job_title}
            onChange={handleChange}
          />
          <textarea
            className="text-area"
            rows="4"
            name="job_description"
            placeholder="Describe the job role..."
            value={formData.job_description}
            onChange={handleChange}
          ></textarea>

          <label>Deadline:</label>
          <input
            type="date"
            className="date-input"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
          />

          <button className="request-btn" onClick={handleRequestJob}>
            Request Job
          </button>
        </div>
      )}

      {/* View Job Posted Section */}
      {selectedOption === "viewJobs" && (
        <div className="section-box">
          <h2>Jobs You Have Posted</h2>
          <div className="jobs-list">
            {postedJobs?.length > 0 ? (
              postedJobs.map((job) => (
                <div key={job?.job_id} className="job-item">
                  <span>{job?.job_title}</span>
                  <button
                    className="view-btn"
                    // onClick={() => navigate(`/job/${job?.id}/applicants`)}
                    onClick={() => getUserApplied(job.job_id)}
                  >
                    View
                  </button>
                </div>
              ))
            ) : (
              <p className="noJoblist">No jobs posted yet.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default EmployerJobPortal;
