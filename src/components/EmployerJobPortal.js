import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EmployerJobPortal() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const navigate = useNavigate();

  // Dummy job list
  const jobPosts = [
    { id: 1, title: "Software Engineer" },
    { id: 2, title: "Data Scientist" },
    { id: 3, title: "UI/UX Designer" },
  ];

  // Handle form submission (for job request)
  const handleSendRequest = () => {
    console.log("Job Request Submitted:", jobDescription);
    alert("Job request sent successfully!");
    setJobDescription(""); // Clear the textarea
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-xl font-bold mb-4">Job Portal</h1>

      {/* Options */}
      <div className="flex space-x-4 mb-6">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => setSelectedOption("requestJob")}
        >
          Request a Job Post
        </button>
        <button
          className="px-4 py-2 bg-green-500 text-white rounded"
          onClick={() => setSelectedOption("viewJobs")}
        >
          View Job Posted
        </button>
      </div>

      {/* Request Job Post Section */}
      {selectedOption === "requestJob" && (
        <div className="border p-4 rounded bg-gray-100">
          <h2 className="text-lg font-semibold mb-2">Request a Job Post</h2>
          <textarea
            className="w-full p-2 border rounded"
            rows="4"
            placeholder="Describe the job role..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          ></textarea>
          {/* Hidden Input Fields */}
          <input type="hidden" value="hiddenField1Value" />
          <input type="hidden" value="hiddenField2Value" />
          <button
            className="mt-3 px-4 py-2 bg-blue-600 text-white rounded"
            onClick={handleSendRequest}
          >
            Send Request
          </button>
        </div>
      )}

      {/* View Job Posted Section */}
      {selectedOption === "viewJobs" && (
        <div className="border p-4 rounded bg-gray-100">
          <h2 className="text-lg font-semibold mb-2">Jobs Posted</h2>
          {jobPosts.map((job) => (
            <div
              key={job.id}
              className="flex justify-between items-center p-2 border-b"
            >
              <span>{job.title}</span>
              <button
                className="px-3 py-1 bg-purple-500 text-white rounded"
                onClick={() => navigate(`/job/${job.id}`)}
              >
                View
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
