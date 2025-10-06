import { useState, useEffect, useContext } from "react";
import { Route, Routes } from "react-router";
import { getUserMoods } from "./services/MoodService.js";
import GuestLanding from "./components/GuestLanding/GuestLanding.jsx";
import MoodList from "./components/MoodList/MoodList.jsx";
import MoodSocial from "./components/MoodSocial/MoodSocial.jsx";
import MoodDetail from "./components/MoodDetail/MoodDetail.jsx";
import MoodForm from "./components/MoodForm/MoodForm.jsx";
import NavBar from "./components/NavBar/NavBar.jsx";
import { UserContext } from "./contexts/UserContext.jsx";
import SignUpForm from "./components/SignUpForm/SignUpForm.jsx";
import SignInForm from "./components/SignInForm/SignInForm.jsx";
import Wheel from "./components/Wheel/Wheel.jsx";
import Footer from "./components/Footer/Footer.jsx";
import "./App.css";

const App = () => {
  const [moods, setMoods] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      getUserMoods().then(setMoods);
    } else {
      setMoods([]);
    }
  }, [user]);

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={user ? <MoodList /> : <GuestLanding />} />
        <Route path="/social" element={<MoodSocial />} />
        <Route path="/sign-up" element={<SignUpForm />} />
        <Route path="/sign-in" element={<SignInForm />} />
        <Route path="/wheel" element={<Wheel />} />
        <Route
          path="/moods/new"
          element={<MoodForm setMoods={setMoods} moods={moods} />}
        />
        <Route path="/moods/:moodId" element={<MoodDetail />} />{" "}
      </Routes>

      <Footer />
    </>
  );
};

export default App;
