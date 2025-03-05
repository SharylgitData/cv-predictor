import "./App.css";
import "./styles.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MoviesGrid from "./components/MoviesGrid";
import WatchList from "./components/WatchList";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import AuthLayout from "./components/AuthLayout";
function App() {
  const [moviesbundle, setMovies] = useState([]);
  const [watchlist, setwatchlist] = useState([]);
  useEffect(() => {
    fetch("movies.json")
      .then((response) => response.json())
      .then((data) => setMovies(data));
  }, []);

  //spread operator '...' to take of the values of the element
  const toggleWatchlist = (movieId) => {
    setwatchlist((prev) =>
      prev.includes(movieId)
        ? prev.filter((id) => id !== movieId)
        : [...prev, movieId]
    );
  };

  return (
    <div className="App">
      <div className>
        <Router>
          {/* <nav>
            <ul>
              <li>
                <Link to="/"> </Link>
              </li>
              {/* <li>
                <Link to="/signUp">Sign Up</Link>
              </li> */}
          {/* </ul>
          </nav> */}

          <Routes>
            <Route path="/" element={<Login />}></Route>
            {/* <Route
              path="/"
              element={
                <AuthLayout>
                  <Login />
                </AuthLayout>
              }
            /> */}
            <Route path="/signUp" element={<SignUp />}></Route>

            <Route
              path="/watchlist"
              element={
                <WatchList
                  moviesbundle={moviesbundle}
                  watchlist={watchlist}
                  toggleWatchlist={toggleWatchlist}
                />
              }
            ></Route>
          </Routes>
        </Router>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;
