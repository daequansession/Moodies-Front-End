import { useContext, useState } from "react";
import { Link } from "react-router";
import { UserContext } from "../../contexts/UserContext";
import Resources from "../Resources/Resources.jsx";
import "./NavBar.css";

const NavBar = () => {
  const [showResource, setShowResource] = useState(false);

  const { user, setUser } = useContext(UserContext);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setUser(null);
    setMoods([]);
  };

  const handleClick = () => {
    console.log("I was clicked");
    setShowResource((prev) => !prev);
  };

  return (
    <nav>
      {user ? (
        <>
          <h4>{user.username}</h4>
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
        </>
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
        <li onClick={handleClick}>Resources</li>
      </ul>

      <div className="resource-container">{showResource && <Resources />}</div>
    </nav>
  );
};

export default NavBar;
