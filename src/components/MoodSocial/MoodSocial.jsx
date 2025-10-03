import { useState, useEffect } from "react";
import { Link } from "react-router";
import * as moodService from "../../services/MoodService.js";
import "./MoodSocial.css";

const formatDate = (date) => {
  return date.toISOString().split("T")[0];
};

const MoodSocial = () => {
  const [moods, setMoods] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const moodsPerPage = 5;

  useEffect(() => {
    const fetchMoods = async () => {
      const data = await moodService.getSocialMoods();
      setMoods(Array.isArray(data) ? data : []);
    };
    fetchMoods();
  }, []);

  const currMoods = moods.slice(
    (currentPage - 1) * moodsPerPage,
    currentPage * moodsPerPage
  );
  const pages = Math.ceil(moods.length / moodsPerPage);

  return (
    <div>
      <h1>Moodies Board</h1>
      <div>
        {currMoods.length === 0 ? (
          <p>There are no moods</p>
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
      </div>

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
