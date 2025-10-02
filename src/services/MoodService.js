const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/moods`;

const index = async (moodData) => {
  try {
    const res = await fetch(BASE_URL, {
      method: "GET",
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

const show = async (moodId) => {
  try {
    console.log(moodId);
    const res = await fetch(BASE_URL + `/${moodId}`, {
      method: "GET",
      body: JSON.stringify(moodId),
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

const deleteMood = async (moodData) => {
  try {
    const res = await fetch(BASE_URL + `/${moodData._id}`, {
      method: "DELETE",
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

export { index, show, newMood, updateMood, deleteMood };
