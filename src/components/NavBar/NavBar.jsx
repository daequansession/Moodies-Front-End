import { useContext, useState } from "react";
import { Link } from "react-router";
import { UserContext } from "../../contexts/UserContext";
import Resources from "../Resources/Resources.jsx";
import logo from "../../assets/images/tempLogo.png";
import "./NavBar.css";

const NavBar = () => {
  const [showResource, setShowResource] = useState(false);

  const { user, setUser } = useContext(UserContext);

  const handleSignOut = () => {
    if (window.confirm("Are you sure you want to sign out?")) {
      localStorage.removeItem("token");
      setUser(null);
      setMoods([]);
    }
  };

  const handleClickResources = () => {
    setShowResource((prev) => !prev);
  };

  return (
    <nav>
      <img src={logo} alt="logo" />
      {user ? (
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/" onClick={handleSignOut}>
              Sign Out
            </Link>
          </li>
        </ul>
      ) : (
        <ul>
          <li>
            <Link to="/sign-up">Sign Up</Link>
          </li>
          <li>
            <Link to="/sign-in">Sign In</Link>
          </li>
        </ul>
      )}
      <ul>
        <li>
          <Link to="/wheel">Wheel</Link>
        </li>
        <li>
          <Link to="/social">Social</Link>
        </li>
        <li onClick={handleClickResources}>Resources</li>
      </ul>
      <div className="resource-container">{showResource && <Resources />}</div>
    </nav>
  );
};

export default NavBar;
