import "./App.css";
import "./styles.css";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./components/Login";
import SignUp from "./components/SignUp";

import EmployerJobPortal from "./components/EmployerJobPortal";
import Admin from "./components/Admin";
import JobSeeker from "./components/JobSeeker";

import ApplyForJob from "./components/ApplyForJob";
import { Questionnaire } from "./components/Questionnaire";
import RankDisplayPage from "./components/RankDisplayPage";
import CandidateApplication from "./components/CandidateApplication";

function App() {
  return (
    <div className="App">
      <div className>
        <Router>
          <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path="/signUp" element={<SignUp />}></Route>
            <Route
              path="/employerJobPost"
              element={<EmployerJobPortal />}
            ></Route>
            {/* <Route
              path="/watchlist"
              element={
                <WatchList
                  moviesbundle={moviesbundle}
                  watchlist={watchlist}
                  toggleWatchlist={toggleWatchlist}
                />
              }
            ></Route> */}
            <Route path="/admin" element={<Admin />}></Route>
            <Route path="/jobseeker" element={<JobSeeker />}></Route>

            <Route path="/applyForJob" element={<ApplyForJob />}></Route>
            <Route path="/questionnaire" element={<Questionnaire />}></Route>
            <Route path="/userApplied" element={<RankDisplayPage />}></Route>
            <Route
              path="/candidateappliedjobs"
              element={<CandidateApplication />}
            ></Route>
          </Routes>
        </Router>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;
