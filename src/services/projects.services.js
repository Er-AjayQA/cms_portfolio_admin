import api from "./api";

export const createProjectService = async (data) => {
  try {
    const formData = new FormData();
    const normalizedFeatured =
      data.featured === true || data.featured === "true";

    formData.append("title", data.title || "");
    formData.append("slug", data.slug || "");
    formData.append("shortDescription", data.shortDescription || "");
    formData.append("description", data.description || "");
    formData.append("category", data.category || "");
    formData.append("githubUrl", data.githubUrl || "");
    formData.append("liveUrl", data.liveUrl || "");
    formData.append("featured", String(normalizedFeatured));
    formData.append("status", data.status || "draft");
    formData.append("startDate", data.startDate || "");
    formData.append("endDate", data.endDate || "");
    formData.append("clientName", data.clientName || "");
    formData.append("role", data.role || "");
    formData.append("challenges", data.challenges || "");
    formData.append("solution", data.solution || "");
    formData.append("order", data.order || 0);
    formData.append("techStackId", JSON.stringify(data.techStackId || []));

    if (data.thumbnail instanceof File) {
      formData.append("thumbnail", data.thumbnail);
    } else if (data.thumbnail) {
      formData.append("thumbnail", data.thumbnail);
    }

    (data.media || []).forEach((file) => {
      if (file instanceof File) {
        formData.append("media", file);
      }
    });

    const response = await api.post("/project/create", formData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const getAllProjectsService = async () => {
  try {
    const response = await api.get("/projects");
    return response?.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const getBySlugProjectService = async (slug) => {
  try {
    const response = await api.get(`/projects/${slug}`);
    return response?.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};
