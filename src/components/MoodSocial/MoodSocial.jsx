import { useState, useEffect } from "react";
import * as moodService from "../../services/MoodService.js";
import "./MoodSocial.css";

const formatDate = (date) => date.toISOString().split("T")[0];

const MoodSocial = () => {
  const [moods, setMoods] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("createdAt"); // ✅ default sort by posted date
  const moodsPerPage = 5;

  useEffect(() => {
    const fetchMoods = async () => {
      const data = await moodService.getSocialMoods();
      setMoods(Array.isArray(data) ? data : []);
    };
    fetchMoods();
  }, []);

  // Sort moods by selected option
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

  return (
    <div className="mood-social-container">
      <h1>Community Moodies</h1>

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

      {currMoods.length === 0 ? (
        <p>No moods available.</p>
      ) : (
        <ul className="mood-list">
          {currMoods.map((mood) => (
            <li key={mood._id} className="mood-item">
                <span className="mood-emotion">{mood.emotion}</span>
                <span className="mood-date">{formatDate(new Date(mood.timeOfEmotion))}</span>
                <span className="mood-intensity">Intensity: {mood.intensity}</span>
            </li>
          ))}
        </ul>
      )}

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
  );
};

export default MoodSocial;
