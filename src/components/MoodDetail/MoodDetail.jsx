import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import * as moodService from "../../services/MoodService.js";
import "./MoodDetail.css";

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
  const [editMood, setEditMood] = useState({
    emotion: "",
    physical: "",
    intensity: 5,
    timeOfEmotion: formatDate(new Date()),
    comments: { note: "" },
  });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const getCurrentMood = async () => {
      const mood = await moodService.getMood(params.moodId);
      setMood(mood);
    };
    getCurrentMood();
  }, []);

  // handle submit function
  const handleSubmit = async (event) => {
    event.preventDefault();
    const updated = await moodService.updateMood(editMood);

    if (!updated) {
      setError("There was an error, try again");
    } else {
      setMood(updated);
      setIsEditing(false);
    }
  };

  // handle delete function
  const handleDelete = async (event) => {
    event.preventDefault();

    if (!window.confirm("Are you sure you want to delete this Moodie?")) return;

    const deleteMood = await moodService.deleteMood(mood._id);
    if (!deleteMood) {
      setError("There was an error, please try again!");
    } else {
      setIsEditing(false);
      navigate("/");
    }
  };

  const moodIsLoaded = (checkMood) => {
    return checkMood && checkMood._id;
  };

  return (
    <>
      {!isEditing ? (
        moodIsLoaded() ? (
          <div className="mood-detail">
            <h1 className="mood-detail-title">{mood.emotion}</h1>
            <p>{error}</p>

            <p className="mood-element">
              Day of Mood:{" "}
              {mood.timeOfEmotion
                ? formatDate(new Date(mood.timeOfEmotion))
                : ""}
            </p>
            <p className="mood-element">
              Physical Experience: {mood.physical}
            </p>
            <p className="mood-element">
              Intensity of Mood: {mood.intensity}
            </p>
            {mood.comments?.note && <h2>Note: {mood.comments.note}</h2>}
            
            <button
              type="button"
              onClick={() => {
                setEditMood(mood);
                setIsEditing(true);
              }}
            >
              Edit Mood
            </button>
            <form onSubmit={handleDelete}>
              <button type="button">Remove Mood</button>
            </form>

          </div>
        ) : (
          <h3>Loading...</h3>
        )
      ) : (
          moodIsLoaded(editMood) ? (
            <form onSubmit={handleSubmit}>
              {/* emotion edit */}
              <label>Mood: </label>
              <select
                value={editMood.emotion}
                onChange={(event) =>
                  setEditMood({ ...editMood, emotion: event.target.value })
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
                value={editMood.physical}
                onChange={(event) =>
                  setEditMood({ ...editMood, physical: event.target.value })
                }
              />

              {/* intensity edit */}
              <label>
                On a scale of 1 to 10, select the intensity of the mood:{" "}
              </label>
              <select
                value={editMood.intensity}
                onChange={(event) =>
                  setEditMood({
                    ...editMood,
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
                  editMood.timeOfEmotion ? formatDate(new Date(editMood.timeOfEmotion)) : ""
                }
                onChange={(event) => {
                  setEditMood({ ...editMood, timeOfEmotion: new Date(event.target.value) });
                }}
                max={formatDate(new Date())}
              />

              {/* notes edit */}
              <label>Note: </label>
              <textarea
                value={editMood.comments?.note ?? ""}
                onChange={(event) =>
                  setEditMood({
                    ...editMood,
                    comments: {
                      ...editMood.comments,
                      note: event.target.value,
                    },
                  })
                }
              />
              <button type="submit">
                Update Mood
              </button>
              <button type="button" onClick={() => setIsEditing(false)}>
                Cancel Edit
              </button>
            </form>
          ) : (
            <h3>Loading...</h3>
          )
        )}
    </>
  );
}

export default MoodDetail;
