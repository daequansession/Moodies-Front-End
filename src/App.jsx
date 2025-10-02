import { useState, useEffect, useContext } from "react";
import { Route, Routes } from "react-router";
import { index } from "./services/MoodService.js";
import GuestLanding from "./components/GuestLanding/GuestLanding.jsx"
import MoodList from "./components/MoodList/MoodList.jsx";
import MoodDetail from "./components/MoodDetail/MoodDetail.jsx";
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
    if (user) {
      index().then(setMoods);
    } else {
      setMoods([]);
    }
  }, [user]);

  return (
    <>
      <NavBar setMoods={setMoods} />
      <Routes>
        <Route
          path="/"
          element={user ? <MoodList moods={moods} /> : <GuestLanding />}
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
