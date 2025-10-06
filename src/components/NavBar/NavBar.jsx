import { useContext, useState } from "react";
import { Link } from "react-router";
import { UserContext } from "../../contexts/UserContext";
import Resources from "../Resources/Resources.jsx";
import logo from "../../assets/images/MoodiesFinalEdit.png";
import "./NavBar.css";
import { Squash as Hamburger } from "hamburger-react";

const NavBar = () => {
  const [showResource, setShowResource] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { user, setUser } = useContext(UserContext);

  const handleSignOut = () => {
    if (window.confirm("Are you sure you want to sign out?")) {
      localStorage.removeItem("token");
      setUser(null);
    }
  };

  const handleClickResources = () => {
    setShowResource((prev) => !prev);
  };

  const toggleMobileMenu = () => setIsOpen((prev) => !prev);

  return (
    <nav>
      <div className="nav-img-container">
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
      </div>

      <button
        className="nav-hamburger"
        aria-label="Toggle navigation"
        aria-expanded={isOpen}
        // onClick={toggleMobileMenu}
      >
        <Hamburger
          onClick={toggleMobileMenu}
          toggled={isOpen}
          toggle={setIsOpen}
          size={22}
        />
      </button>

      <div className={`nav-links ${isOpen ? "open" : ""}`}>
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
      </div>

      <div className="resource-container">{showResource && <Resources />}</div>
    </nav>
  );
};
export default NavBar;
