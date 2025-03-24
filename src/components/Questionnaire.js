// Big Five (OCEAN)
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../questionnaire.css";
import { URLS } from "./Constants";
export function Questionnaire({ userData }) {
  const location = useLocation();
  const { job, emailId, jobDetails } = location.state;
  console.log("jobDetails", jobDetails);
  const [error, setError] = useState("");
  console.log("email id on questionnaire page is ", emailId);
  console.log("job ", job);
  const [answers, setAnswers] = useState({
    communication: 0,
    teamwork: 0,
    problemSolving: 0,
    adaptability: 0,
    leadership: 0,
  });

  const questions = [
    {
      text: "I can clearly express my ideas in both verbal and written forms.",
      trait: "communication",
    },
    {
      text: "I actively listen to others and respond thoughtfully.",
      trait: "communication",
    },
    {
      text: "I enjoy collaborating with my colleagues to achieve a common goal.",
      trait: "teamwork",
    },
    {
      text: "I am willing to support my teammates even if the task is outside my responsibilities.",
      trait: "teamwork",
    },
    {
      text: "When faced with a challenge, I analyze the situation and find solutions.",
      trait: "problemSolving",
    },
    {
      text: "I stay calm and think logically when solving complex problems.",
      trait: "problemSolving",
    },
    {
      text: "I can quickly adjust to new situations and responsibilities.",
      trait: "adaptability",
    },
    {
      text: "I embrace change and am open to learning new skills.",
      trait: "adaptability",
    },
    {
      text: "I take initiative and motivate others to work towards shared goals.",
      trait: "leadership",
    },
    {
      text: "I make decisions confidently and responsibly in team settings.",
      trait: "leadership",
    },
  ];

  const [responses, setResponses] = useState({});
  const navigate = useNavigate();

  const handleChange = (questionIndex, value) => {
    setResponses({ ...responses, [questionIndex]: value });
  };

  const handleSubmit = () => {
    const updatedScores = { ...answers };
    questions.forEach((q, index) => {
      updatedScores[q.trait] += responses[index] || 3;
    });

    setAnswers(updatedScores);

    // check if all the answers have same value
    const finalcount = new Set(Object.values(updatedScores)).size === 1;

    if (finalcount) {
      setError(
        "You can't be neural for the answer. Kindly select appropriate answers."
      );
    } else {
      setError("");
      const dominantPersonality = Object.entries(updatedScores).reduce(
        (max, current) => (current[1] > max[1] ? current : max),
        ["", -Infinity] // minus infinity as the  initial value
      )[0];

      fetch(URLS.base + `savePersonality/${dominantPersonality}/${emailId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => {
          response.json();
        })
        .then((data) => {
          const isconfirmed = window.confirm(
            "Your personality has been recorded"
          );
          if (isconfirmed) {
            console.log("jobDetails within isconfirmed", jobDetails);
            const updatedJobDetails = {
              ...jobDetails,
              data: {
                ...jobDetails.data,
                personality_test: "Y",
              },
            };
            navigate("/applyForJob", {
              state: { job, emailId, updatedJobDetails },
            });
          }
        });
    }
  };

  return (
    <div className="questionnaire-wrapper">
      <input type="text" className="hidden" value={userData?.emailId} />

      <div className="questionnaire-container">
        <h1 className="questionnaire-title">Personality Test</h1>
        {questions.map((q, index) => (
          <div key={index} className="question-box">
            <p className="question-text">
              {index + 1}) {q.text}
            </p>
            <select
              value={responses[index] || 3}
              onChange={(e) => handleChange(index, Number(e.target.value))}
              className="dropdown"
            >
              <option value="1">Strongly Disagree</option>
              <option value="2">Disagree</option>
              <option value="3">Neutral</option>
              <option value="4">Agree</option>
              <option value="5">Strongly Agree</option>
            </select>
          </div>
        ))}
        <label className="errorLabel">{error}</label>
        <button onClick={handleSubmit} className="submit-btn">
          Submit
        </button>
      </div>
    </div>
  );
}
