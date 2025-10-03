import { useState, useEffect } from "react";
import { Link } from "react-router";
import * as moodService from "../../services/MoodService.js";
import "./MoodList.css";

const DELETE_GLOBAL_ENABLED = false;

const formatDate = (date) => {
  return date.toISOString().split("T")[0];
};

const MoodList = () => {
  const [moods, setMoods] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const moodsPerPage = 5;

  useEffect(() => {
    const fetchMoods = async () => {
      const data = await moodService.getUserMoods();
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
      <h1 className="moodlist-title">My Moodies</h1>
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

      <Link to="/moods/new" className="add-button">
        <button>Add Mood</button>
      </Link>

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
