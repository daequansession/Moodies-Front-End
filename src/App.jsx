import { useState, useEffect } from "react";
import { Route, Routes } from "react-router";
<<<<<<< HEAD

import * as moodService from "./services/MoodService.js";
import MoodDetail from "./components/MoodDetail/MoodDetail.jsx";
import MoodList from "./components/MoodList/MoodList.jsx";
import MoodForm from "./components/MoodForm/MoodForm.jsx";
import "./App.css";


const App = () => {
  const [moods, setMoods] = useState([]);
=======
import MoodDetail from "./components/MoodDetail/MoodDetail.jsx";
import MoodList from "./components/MoodList/MoodList.jsx";
import MoodForm from "./components/MoodForm/MoodForm.jsx";
import "./App.css";

const App = () => {
  const [mood, setMoods] = useState([]);
>>>>>>> 7c99832 (Init commit:)

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
        <Route path="/" element={<MoodList moods={moods} />} />
<<<<<<< HEAD
        <Route path="/moods/new" element={<MoodForm setMoods={setMoods} moods={moods}/>} />
        <Route
          path="/moods/:moodId"
          element={<MoodDetail setMoods={setMoods} moods={moods}/>}
=======
        <Route path="/moods/new" element={<MoodForm setMoods={setMoods} />} />
        <Route
          path="/moods/:moodId"
          element={<MoodDetail setMoods={setMoods} />}
>>>>>>> 7c99832 (Init commit:)
        />
      </Routes>
    </>
  );
};

export default App;
