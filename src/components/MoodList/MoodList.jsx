import { Link } from "react-router";
import "./MoodList.css";

const MoodList = ({ moods }) => {
  return (
    <div>
      <h1>Mood List</h1>
      <div>
        {!moods || !Array.isArray(moods) ? (
          <p>You have no moods</p>
        ) : (
          <ul>
            {moods.map((mood) => (
              <li key={mood._id}>
                <Link to={`/moods/${mood._id}`}>
                  <strong>{mood.emotion}</strong>
                  {<p>{mood.timeOfEmotion}</p>}
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
