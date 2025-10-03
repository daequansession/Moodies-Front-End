const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/moods`;

const getUserMoods = async () => {
  try {
    const res = await fetch(BASE_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = await res.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};

const getMood = async (moodId) => {
  try {
    const res = await fetch(BASE_URL + `/${moodId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = res.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};

const getSocialMoods = async () => {
  try {
    const res = await fetch(BASE_URL + `/social`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

const newMood = async (moodData) => {
  try {
    const res = await fetch(BASE_URL, {
      method: "POST",
      body: JSON.stringify(moodData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
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
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = res.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};

const deleteMood = async (id) => {
  try {
    const res = await fetch(BASE_URL + `/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = res.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};

export {
  getUserMoods,
  getMood,
  getSocialMoods,
  newMood,
  updateMood,
  deleteMood,
};
