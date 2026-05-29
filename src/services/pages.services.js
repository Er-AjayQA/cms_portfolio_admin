import api from "./api";

export const createPageService = async (data) => {
  try {
    const response = await api.post("/page/create", data);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const updatePageService = async (slug, data) => {
  try {
    const response = await api.put(`/page/${slug}`, data);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const getAllPagesService = async () => {
  try {
    const response = await api.get("/page");
    return response?.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const getBySlugPageService = async (slug) => {
  try {
    const response = await api.get(`/page/${slug}`);
    return response?.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const deletePageService = async (id) => {
  try {
    const response = await api.delete(`/page/${id}`);
    return response?.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const deletemultiplePagesService = async (ids) => {
  try {
    const response = await api.delete(`/page/delete-pages`, {
      data: { ids },
    });
    return response?.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};
