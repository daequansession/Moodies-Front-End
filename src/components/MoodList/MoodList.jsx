import { useState, useEffect } from "react";
import { Link } from "react-router";
import * as moodService from "../../services/MoodService.js";
import "./MoodList.css";

const formatDate = (date) => {
  return date.toISOString().split("T")[0];
};

const MoodList = () => {
  const [moods, setMoods] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const moodsPerPage = 5;

  useEffect(() => {
    const fetchMoods = async () => {
      const data = await moodService.index();
      setMoods(data || []);
    };
    fetchMoods();
  }, []);

  const revMoods = [...moods].reverse();
  const currMoods = revMoods.slice(
    (currentPage - 1) * moodsPerPage,
    currentPage * moodsPerPage
  );
  const pages = Math.ceil(revMoods.length / moodsPerPage);

  return (
    <div>
      <h1 className="moodlist-title">Moodies</h1>
      <div>
        {currMoods.length === 0 ? (
          <p>You have no moods</p>
        ) : (
          <ul className="mood-card">
            {currMoods.map((mood) => (
              <li key={mood._id}>
                <Link to={`/moods/${mood._id}`} className="mood-link">
                  <strong>{mood.emotion}</strong>
                  <p>{formatDate(new Date(mood.timeOfEmotion))}</p>
                </Link>
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

      <Link to="/moods/new">
        <button>Add Mood</button>
      </Link>
    </div>
  );
};

export default MoodList;
