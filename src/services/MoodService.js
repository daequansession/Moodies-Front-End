const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/moods`;

const index = async () => {
  try {
    const res = await fetch(BASE_URL);
    const data = await res.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};

const show = async (moodId) => {
  try {
    const res = await fetch(BASE_URL + `/${moodId}`);
    const data = res.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};

const newMood = async (moodData) => {
  try {
    const res = await fetch(BASE_URL, {
      method: "POST",
      body: JSON.stringify(moodData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};

const updateMood = async (moodData) => {
  try {
    const res = await fetch(BASE_URL + `/${moodData._id}`, {
      method: "PUT",
      body: JSON.stringify(moodData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = res.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};

export { index, show, newMood, updateMood };
