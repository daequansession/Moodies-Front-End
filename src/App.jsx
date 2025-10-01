import { useState, useEffect } from "react";
import { Route, Routes } from "react-router";

import * as moodService from "./services/MoodService.js";
import MoodList from "./components/MoodList/MoodList.jsx";
import Landing from "./components/Landing/Landing.jsx"
import "./App.css";


const App = () => {
  const [moods, setMoods] = useState([]);

  useEffect(() => {
    const getMoods = async () => {
      const allMoods = await moodService.index();
      setMoods(allMoods);
    };
    getMoods();
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={ user ? <MoodList /> : <Landing />}/>
      </Routes>
    </>
  );
};

export default App;
