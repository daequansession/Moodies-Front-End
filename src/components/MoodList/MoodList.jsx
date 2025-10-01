import { Link } from "react-router";
import "./MoodList.css";

const MoodList = ({ moods }) => {
  return (
    <div>
      <h1>Mood List</h1>
      <div>
        {moods.length === 0 ? (
          <p>You have no moods</p>
        ) : (
          <ul>
            {moods.map((mood) => (
              <Link key={mood._id} to={`/moods/${mood._id}`}>
                <li>{mood.emotion}</li>
                <li>{mood.timeOfEmotion}</li>
              </Link>
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
