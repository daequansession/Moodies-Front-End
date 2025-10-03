import { useState } from "react";
import { useNavigate } from "react-router";

import { newMood } from "../../services/MoodService.js"
import "./MoodForm.css";


const MoodForm = ({moods, setMoods}) => {
  const navigate = useNavigate();

   // format date to show only day, not time
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

    console.log("Moods", moods);
    console.log("moodRequest", moodRequest);
    if (moods)
      setMoods([...moods, moodRequest]);
    else
      setMoods([moodRequest]);
      setMoodData({
        emotion: "",
        physical: "",
        intensity: 5,
        timeOfEmotion: formatDate(new Date()),
        comments: { note: "" },
      });
      navigate("/");
  };

  return (
    <>
      <h1 className="moodform-title">Log New Mood</h1>

      <form onSubmit={handleSubmit} className="mood-form">
        
        {/* emotion input */}
        <div className="form-element">
        <label>Mood: </label>
        <select
          value={moodData.emotion}
          onChange={(event) =>
            setMoodData({ ...moodData, emotion: event.target.value })
          }
        >
          <option value=""></option>
          <option value="Angry">Angry</option>
          <option value="Anxious">Anxious</option>
          <option value="Disgusted">Disgusted</option>
          <option value="Happy">Happy</option>
          <option value="Sad">Sad</option>
          <option value="Scared">Scared</option>
          <option value="Surprised">Surprised</option>
        </select>
        </div>

             {/* time of emotion input */}
        <div className="form-element">
        <label>Day of Mood: </label>
        <input
          type="date"
          value={moodData.timeOfEmotion} 
          onChange={(event) => {
            setMoodData({...moodData, timeOfEmotion: event.target.value})}
          }
          max={formatDate(new Date())}
        />
        </div>

              {/* intensity input */}
        <div className="form-element">
        <label>On a scale of 1 to 10, the intensity of the mood:</label>
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
        </div>

        {/* physical emotional experience input */}
        <div className="form-element">
        <label>Physical experience of mood: </label>
        <textarea
          value={moodData.physical}
          onChange={(event) =>
            setMoodData({ ...moodData, physical: event.target.value })
          }
          placeholder="where do you feel this mood in your body?"
        />
        </div>

  

   

        {/* notes input */}
        <div className="form-element">
        <label>Note: </label>
        <textarea
          value={moodData.comments.note}
          onChange={(event) =>
            setMoodData({ ...moodData,  comments: { ...moodData.comments, note: event.target.value } })
          }
          placeholder="anything else?"
          className="note-textarea"
        />
        </div>

        <button type="submit">Add Mood</button>
      </form>
    </>
  );
};

export default MoodForm;
