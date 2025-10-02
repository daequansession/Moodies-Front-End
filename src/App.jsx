import { useState, useEffect, useContext } from "react";
import { Route, Routes } from "react-router";
import * as moodService from "./services/MoodService.js";
import MoodDetail from "./components/MoodDetail/MoodDetail.jsx";
import MoodList from "./components/MoodList/MoodList.jsx";
import MoodForm from "./components/MoodForm/MoodForm.jsx";
import NavBar from "./components/NavBar/NavBar.jsx";
import { UserContext } from "./contexts/UserContext.jsx";
import SignUpForm from "./components/SignUpForm/SignUpForm.jsx";
import SignInForm from "./components/SignInForm/SignInForm.jsx";
import "./App.css";

const App = () => {
  const [moods, setMoods] = useState([]);
  const { user } = useContext(UserContext);

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
        <Route
          path="/"
          element={user ? <MoodList moods={moods} /> : <Landing />}
        />
        <Route path="/sign-up" element={<SignUpForm />} />
        <Route path="/sign-in" element={<SignInForm />} />
        <Route
          path="/moods/new"
          element={<MoodForm setMoods={setMoods} moods={moods} />}
        />
        <Route
          path="/moods/:moodId"
          element={<MoodDetail setMoods={setMoods} moods={moods} />}
        />{" "}
      </Routes>
    </>
  );
};

export default App;
