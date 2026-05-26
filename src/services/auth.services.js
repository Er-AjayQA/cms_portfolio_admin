const api = require("./api");

export const login = async (data) => {
  try {
    const response = await api.post("/auth/login", data);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};
