import { useState } from "react";
// need to import mood service
// import props

const moodForm = () => {
  const [moodData, setMoodData] = useState({
    emotion: "",
    physical: [],
    intensity: 1,
    timeOfEmotion: new Date(),
    comments: { note: "" },
  });

  // handleSubmit function

  return (
    <>
      <h1>Log New Mood</h1>

      <form onSubmit={handleSubmit}>

          {/* emotion input */}
        <label>Mood: </label>
        <select
            value={moodData.emotion}
            onChange={(event) => setMoodData({...moodData, emotion: event.target.value})}
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

        {/* physical emotional experience input - need to confer with group*/}
        <label>Physical experience of mood: </label>

      {/* intensity input */}
      <label>On a scale of 1 to 10, the intensity of the mood: </label>
      <input 
         type="number"
         min="1"
         max="10"
         value={moodData.intensity}
         onChange={(event) => setMoodData({...moodData, intensity: parseInt(event.target.value)})}
      />

      {/* time of emotion input */}
      <label>Day of Mood: </label>
      <input 
         type="date"
         value={moodData.timeOfEmotion}
      />

      {/* notes input */}
      <label>Note: </label>
      <textarea 
         value={moodData.comments.note}
         onChange={(event) => setMoodData({...moodData.comments, note: event.target.value })}
         placeholder="anything else?"
      />

      <button type="submit">Add Mood</button>
      </form>
    </>
  );
};

export default moodForm;
