import api from "./apiConfig.js";
const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/users`;

const userService = {
  getUser: async (id) => {
    const res = await api.get(`/users/${id}`);
    return res.data;
  },

  updateUser: async (id, data) => {
    const res = await api.put(`/users/${id}`, data);
    return res.data;
  },

  deleteUser: async (id) => {
    const res = await api.delete(`/users/${id}`);
    return res.data;
  },
};

export default userService;
