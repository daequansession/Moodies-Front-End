import { useState, useEffect } from "react";
import { Route, Routes } from "react-router";
import MoodDetail from "./components/MoodDetail/MoodDetail.jsx";
import MoodList from "./components/MoodList/MoodList.jsx";
import MoodForm from "./components/MoodForm/MoodForm.jsx";
import "./App.css";

const App = () => {
  const [mood, setMoods] = useState([]);

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
        <Route path="/moods/new" element={<MoodForm setMoods={setMoods} />} />
        <Route
          path="/moods/:moodId"
          element={<MoodDetail setMoods={setMoods} />}
        />
      </Routes>
    </>
  );
};

export default App;
