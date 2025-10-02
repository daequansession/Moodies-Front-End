import { useState, useEffect } from "react";
import { Route, Routes } from "react-router";
import MoodDetail from "./components/MoodDetail/MoodDetail.jsx";
import MoodList from "./components/MoodList/MoodList.jsx";
import MoodForm from "./components/MoodForm/MoodForm.jsx";
import NavBar from "./components/NavBar/NavBar.jsx";
import { UserContext } from "./src/contexts/UserContext.jsx";
import SignUpForm from "./components/SignUpForm/SignUpForm.jsx";
import SignInForm from "./components/SignInForm/SignInForm.jsx";
import "./src/App.jsx";
import "./src/App.css";

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
      <NavBar />
      <Routes>
        <Route path="/" element={<MoodList moods={moods} />} />
        <Route path="/moods/new" element={<MoodForm setMoods={setMoods} />} />
        <Route
          path="/moods/:moodId"
          element={<MoodDetail setMoods={setMoods} />}
        />
        <Route path="/sign-up" element={<SignUpForm />} />
        <Route path="/sign-in" element={<SignInForm />} />
      </Routes>
    </>
  );
};

export default App;
