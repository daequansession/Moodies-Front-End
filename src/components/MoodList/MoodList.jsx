import { useState, useEffect } from "react";
import { Link } from "react-router";
import * as moodService from "../../services/MoodService.js";
import "./MoodList.css";

const DELETE_GLOBAL_ENABLED = false;

const formatDate = (date) => date.toISOString().split("T")[0];

const MoodList = () => {
  const [moods, setMoods] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("Posted (Newest)"); // ✅ Default sort option
  const moodsPerPage = 5;

  useEffect(() => {
    const fetchMoods = async () => {
      const data = await moodService.getUserMoods();
      setMoods(Array.isArray(data) ? data : []);
    };
    fetchMoods();
  }, []);

  // ✅ Sorting logic for all options
  const sortedMoods = Array.isArray(moods)
    ? [...moods].sort((a, b) => {
        switch (sortBy) {
          case "Posted (Newest)":
            return new Date(b.createdAt) - new Date(a.createdAt);
          case "Posted (Oldest)":
            return new Date(a.createdAt) - new Date(b.createdAt);
          case "Mood Date (Newest)":
            return new Date(b.timeOfEmotion) - new Date(a.timeOfEmotion);
          case "Mood Date (Oldest)":
            return new Date(a.timeOfEmotion) - new Date(b.timeOfEmotion);
          case "Emotion (A)":
            return a.emotion.localeCompare(b.emotion);
          case "Emotion (Z)":
            return b.emotion.localeCompare(a.emotion);
          case "Intensity (High)":
            return b.intensity - a.intensity;
          case "Intensity (Low)":
            return a.intensity - b.intensity;
          default:
            return new Date(b.createdAt) - new Date(a.createdAt);
        }
      })
    : [];

  const currMoods = sortedMoods.slice(
    (currentPage - 1) * moodsPerPage,
    currentPage * moodsPerPage
  );
  const pages = Math.ceil(sortedMoods.length / moodsPerPage);

  const sortDropdown = (
    <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
      <label htmlFor="sortBy" style={{ marginRight: "10px", fontWeight: "bold" }}>
        Sort by:
      </label>
      <select
        id="sortBy"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
      >
        <option value="Posted (Newest)">Posted (Newest)</option>
        <option value="Posted (Oldest)">Posted (Oldest)</option>
        <option value="Mood Date (Newest)">Mood Date (Newest)</option>
        <option value="Mood Date (Oldest)">Mood Date (Oldest)</option>
        <option value="Emotion (A)">Emotion (A → Z)</option>
        <option value="Emotion (Z)">Emotion (Z → A)</option>
        <option value="Intensity (High)">Intensity (High → Low)</option>
        <option value="Intensity (Low)">Intensity (Low → High)</option>
      </select>
    </div>
  );

  // ⬇️ Keep your entire return exactly as it was
  return (
    <div>
      <h1 className="moodlist-title">My Moodies</h1>
      <div className="sort-controls">
        <label>Sort by: </label>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="Posted (Newest)">Posted (Newest)</option>
          <option value="Posted (Oldest)">Posted (Oldest)</option>
          <option value="Mood Date (Newest)">Mood Date (Newest)</option>
          <option value="Mood Date (Oldest)">Mood Date (Oldest)</option>
          <option value="Emotion (A)">Emotion (A → Z)</option>
          <option value="Emotion (Z)">Emotion (Z → A)</option>
          <option value="Intensity (High)">Intensity (High → Low)</option>
          <option value="Intensity (Low)">Intensity (Low → High)</option>
        </select>
      </div>
      <br />
      <div>
        {currMoods.length === 0 ? (
          <p>You have no moods</p>
        ) : (
          <ul>
            {currMoods.map((mood) => (
              <Link 
                to={`/moods/${mood._id}`} 
                className="mood-link" 
                key={mood._id}
              >
                <li className="mood-card">
                  <strong>{mood.emotion}</strong>
                  <p>{formatDate(new Date(mood.timeOfEmotion))}</p>
                </li>
              </Link>
            ))}
          </ul>
        )}
      </div>

      <div className="moodlist-buttons">

      <Link to="/moods/new" className="add-button">
        <button>Add Mood</button>
      </Link>

      {pages > 1 && (
        <div className="pagination">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            Prev
          </button>
          <span>
            Page {currentPage} of {pages}
          </span>
          <button
            disabled={currentPage === pages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      )}
      </div>
   

      {DELETE_GLOBAL_ENABLED && (
        <button
          type="button"
          onClick={async () => {
            if (window.confirm("Are you sure you want to delete ALL moods?")) {
              await moodService.deleteAbsoluteAllMoods();
              setMoods([]); // clear local state too
            }
          }}
        >
          Delete All Moods (Global)
        </button>
      )}
      
    </div>
  );
};

export default MoodList;
