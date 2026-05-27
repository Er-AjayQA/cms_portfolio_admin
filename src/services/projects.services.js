import api from "./api";

export const createProjectService = async (data) => {
  try {
    const response = await api.post("/project/create", data);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};
