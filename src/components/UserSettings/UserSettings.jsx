import { useState } from "react";
import * as userService from "../../services/UserService.js";
import "./UserSettings.css";

const UserSettings = ({ user, onLogout }) => {
  const [username, setUsername] = useState(user?.username || "");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  if (!user) {
    return <p>Loading user settings...</p>;
  }

  // Update username only
  const handleUsernameUpdate = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = await userService.updateUser(user._id, { username });
      setMessage("Username updated successfully!");
      console.log("Updated user:", updatedUser);
    } catch (err) {
      console.error(err);
      setMessage("Failed to update username.");
    }
  };

  // Update password only
  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    try {
      await userService.updateUser(user._id, { password });
      setPassword("");
      setMessage("Password updated successfully!");
    } catch (err) {
      console.error(err);
      setMessage("Failed to update password.");
    }
  };

  // Delete account + associated moods
  const handleDeleteAccount = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account and all associated moods?"
      )
    ) {
      try {
        await userService.deleteUser(user._id);
        setMessage("🗑️ Account deleted.");
        onLogout();
      } catch (err) {
        console.error(err);
        setMessage("Failed to delete account.");
      }
    }
  };

  return (
    <div className="user-settings">
      <h2>Account Settings</h2>

      <form onSubmit={handleUsernameUpdate} className="settings-form">
        <label>Change Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit">Update Username</button>
      </form>

      <form onSubmit={handlePasswordUpdate} className="settings-form">
        <label>Change Password</label>
        <input
          type="password"
          value={password}
          placeholder="Enter new password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Update Password</button>
      </form>

      <button onClick={handleDeleteAccount} className="delete-button">
        Delete Account
      </button>

      <button onClick={onLogout} className="logout-button">
        Logout
      </button>

      {message && <p className="status-message">{message}</p>}
    </div>
  );
};

export default UserSettings;
