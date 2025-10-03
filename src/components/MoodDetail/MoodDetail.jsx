import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import * as moodService from "../../services/MoodService.js";

// format date to show only day, not time
const formatDate = (date) => {
  return date.toISOString().split("T")[0];
};

function MoodDetail() {
  const params = useParams();
  const navigate = useNavigate();

  const [mood, setMood] = useState({
    emotion: "",
    physical: "",
    intensity: 5,
    timeOfEmotion: formatDate(new Date()),
    comments: { note: "" },
  });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const getMood = async () => {
      const mood = await moodService.show(params.moodId);
      setMood(mood);
    };
    getMood();
  }, []);

  // handle submit function
  const handleSubmit = async (event) => {
    event.preventDefault();
    const editMood = await moodService.updateMood(mood);

    if (!editMood) {
      setError("There was an error, try again");
    } else {
      setIsEditing(false);
      navigate(`/moods/${mood._id}`);
    }
  };

  // handle delete function
  const handleDelete = async (event) => {
    event.preventDefault();
    const deleteMood = await moodService.deleteMood(mood._id);
    if (!deleteMood) {
      setError("There was an error, please try again!");
    } else {
      setIsEditing(false);
      navigate("/");
    }
  };

  const moodIsLoaded = () => {
    return (
      mood &&
      mood.emotion &&
      mood.comments &&
      mood.intensity &&
      mood.physical &&
      mood.timeOfEmotion
    );
  };

  return (
    <>
      {!isEditing ? (
        moodIsLoaded() ? (
          <div>
            <h1>{mood.emotion}</h1>
            <p>{error}</p>

            <h2>
              Day of Mood:{" "}
              {mood.timeOfEmotion
                ? formatDate(new Date(mood.timeOfEmotion))
                : ""}
            </h2>
            <h2>Physical Experience: {mood.physical}</h2>
            <h2>Intensity of Mood: {mood.intensity}</h2>
            {mood.comments?.note && <h2>Note: {mood.comments.note}</h2>}
            

            <form onSubmit={handleDelete}>
              <button type="submit">Remove Mood</button>
            </form>
          </div>
        ) : (
          <h3>Loading...</h3>
        )
      ) : (
        <form onSubmit={handleSubmit}>
          {/* emotion edit */}
          <label>Mood: </label>
          <select
            value={mood.emotion}
            onChange={(event) =>
              setMood({ ...mood, emotion: event.target.value })
            }
          >
            <option value="">-choose mood-</option>
            <option value="angry">Angry</option>
            <option value="anxious">Anxious</option>
            <option value="disgusted">Disgusted</option>
            <option value="happy">Happy</option>
            <option value="sad">Sad</option>
            <option value="scared">Scared</option>
            <option value="surprised">Surprised</option>
          </select>

          {/* physical experience edit */}
          <label>Physical experience of mood: </label>
          <textarea
            value={mood.physical}
            onChange={(event) =>
              setMood({ ...mood, physical: event.target.value })
            }
          />

          {/* intensity edit */}
          <label>
            On a scale of 1 to 10, select the intensity of the mood:{" "}
          </label>
          <select
            value={mood.intensity}
            onChange={(event) =>
              setMood({
                ...mood,
                intensity: parseInt(event.target.value),
              })
            }
          >
            <option value="">--</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>

          {/* time of emotion edit */}
          <label>Day of Mood: </label>
          <input
            type="date"
            value={
              mood.timeOfEmotion ? formatDate(new Date(mood.timeOfEmotion)) : ""
            }
            onChange={(event) => {
              setMood({ ...mood, timeOfEmotion: new Date(event.target.value) });
            }}
            max={formatDate(new Date())}
          />

          {/* notes edit */}
          <label>Note: </label>
          <textarea
            value={mood.comments?.note ?? ""}
            onChange={(event) =>
              setMood({
                ...mood,
                comments: {
                  ...mood.comments,
                  note: event.target.value,
                },
              })
            }
          />

          <button type="submit">Update Mood</button>
        </form>
      )}

      <button onClick={() => setIsEditing(!isEditing)}>
        {!isEditing ? "Update Mood" : "Cancel Edit"}
      </button>
    </>
  );
}

export default MoodDetail;
