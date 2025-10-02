import { Link } from "react-router";
import "./MoodList.css";

const formatDate = (date) => {
    return date.toISOString().split("T")[0];
  };

const MoodList = ({ moods }) => {
  return (
    <div>
      <h1>Moodies</h1>
      <div>
        {!moods || !Array.isArray(moods) ? (
          <p>You have no moods</p>
        ) : (
          <ul>
            {moods.map((mood) => (
              <li key={mood._id}>
                <Link to={`/moods/${mood._id}`}>
                  <strong>{mood.emotion}</strong>
                  {<p>{formatDate(mood.timeOfEmotion)}</p>}
                </Link>
              </li>
            ))}
          </ul>

        )}
      </div>
      <Link to="/moods/new">
        <button>Add Mood</button>
      </Link>
    </div>
  );
};

export default MoodList;
