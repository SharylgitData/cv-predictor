import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function JobApplicants(jobDetails) {
  const { id } = useParams();
  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8090/jobs/${id}/applicants`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Applicants Data:", data);
        setApplicants(data);
      })
      .catch((error) => console.error("Error fetching applicants:", error));
  }, [id]);

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-xl font-bold mb-4">Applicants for Job {id}</h1>

      {applicants.length > 0 ? (
        applicants.map((applicant) => (
          <div key={applicant.id} className="flex justify-between p-2 border-b">
            <span>{applicant.name}</span>
            <span className="font-semibold">Rank: {applicant.rank}</span>
          </div>
        ))
      ) : (
        <p>No applicants yet.</p>
      )}
    </div>
  );
}

export default JobApplicants;
