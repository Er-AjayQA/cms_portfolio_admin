import api from "./api";

export const getAllTechStackService = async () => {
  try {
    const response = await api.get("/tech-stack/get-all");
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const createTechStackService = async (data) => {
  try {
    const response = await api.post("/tech-stack/create", data);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};
