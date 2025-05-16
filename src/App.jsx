import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/common/Layout";
import Pomodoro from "./components/pomodoro/pomodoro";
import Movie from "./components/movies/movie";
import MovieInfo from "./components/movies/movieInfo";
import "./tailwind.css";

function App() {
  return (
    <Router>
      <div className="flex h-screen">
        <div className="flex-1 overflow-y-auto">
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Pomodoro />} />
              <Route path="/movie" element={<Movie />} />
              <Route path="/movie/:idValue" element={<MovieInfo />} />
            </Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
