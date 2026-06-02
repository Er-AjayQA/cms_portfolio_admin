import api from "./api";

// Tech Stack
export const getAllTechStackService = async () => {
  try {
    const response = await api.get("/tech-stack/get-all");
    return response?.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const getBySlugTechStackService = async (slug) => {
  try {
    const response = await api.get(`/tech-stack/get-by-slug/${slug}`);
    return response?.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const createTechStackService = async (data) => {
  try {
    const response = await api.post("/tech-stack/create", data);
    return response?.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const updateTechStackService = async (slug, data) => {
  try {
    const response = await api.put(`/tech-stack/update/${slug}`, data);
    return response?.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const updateStatusTechStackService = async (slug) => {
  try {
    const response = await api.put(`/tech-stack/update-status/${slug}`);
    return response?.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const deleteTechStackService = async (id) => {
  try {
    const response = await api.delete(`/tech-stack/delete/${id}`);
    return response?.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const deleteMultipleTechStackService = async (ids) => {
  try {
    const response = await api.delete(`/tech-stack/delete-multiple`, {
      data: { ids },
    });
    return response?.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// Skill Category
export const getAllSkillCategoryService = async () => {
  try {
    const response = await api.get("/skill-category/get-all");
    return response?.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const createSkillCategoryService = async (data) => {
  try {
    const response = await api.post("/skill-category/create", data);
    return response?.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const updateSkillCategoryService = async (slug, data) => {
  try {
    const response = await api.put(`/skill-category/update/${slug}`, data);
    return response?.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const updateStatusSkillCategoryService = async (slug) => {
  try {
    const response = await api.put(`/skill-category/update-status/${slug}`);
    return response?.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const getBySlugSkillCategoryService = async (slug) => {
  try {
    const response = await api.get(`/skill-category/get-by-slug/${slug}`);
    return response?.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const deleteSkillCategoryService = async (id) => {
  try {
    const response = await api.delete(`/skill-category/delete/${id}`);
    return response?.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const deleteMultipleSkillCategoryService = async (ids) => {
  try {
    const response = await api.delete(`/skill-category/delete-multiple`, {
      data: { ids },
    });
    return response?.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};
