import { useState } from "react";
import { useNavigate } from "react-router";

import "./MoodForm.css";

// need to import mood service
// import props

const moodForm = () => {
  const navigate = useNavigate();

  const formatDate = (date) => {
    return date.toISOString().split("T")[0];
  };

  const [moodData, setMoodData] = useState({
    emotion: "",
    physical: "",
    intensity: 5,
    timeOfEmotion: formatDate(new Date()),
    comments: { note: "" },
  });

  // handleSubmit function
  const handleSubmit = async (event) => {
    event.preventDefault();
    const moodRequest = await newMood(moodData);

    setMood([...moods, moodRequest]);
    setMoodData({});
    navigate("/");
  };

  return (
    <>
      <h1>Log New Mood</h1>

      <form onSubmit={handleSubmit}>
        {/* emotion input */}
        <label>Mood: </label>
        <select
          value={moodData.emotion}
          onChange={(event) =>
            setMoodData({ ...moodData, emotion: event.target.value })
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

        {/* physical emotional experience input */}
        <label>Physical experience of mood: </label>
        <textarea
          value={moodData.physical}
          onChange={(event) =>
            setMoodData({ ...moodData, physical: event.target.value })
          }
          placeholder="where do you feel this mood in your body?"
        />

        {/* intensity input */}
        <label>On a scale of 1 to 10, the intensity of the mood: </label>
        <select
          value={moodData.intensity}
          onChange={(event) =>
            setMoodData({
              ...moodData,
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

        {/* time of emotion input */}
        <label>Day of Mood: </label>
        <input type="date" value={moodData.timeOfEmotion} />

        {/* notes input */}
        <label>Note: </label>
        <textarea
          value={moodData.comments.note}
          onChange={(event) =>
            setMoodData({ ...moodData.comments, note: event.target.value })
          }
          placeholder="anything else?"
        />

        <button type="submit">Add Mood</button>
      </form>
    </>
  );
};

export default moodForm;
