import api from "./api";

export const createProjectService = async (data) => {
  try {
    const formData = new FormData();

    formData.append("title", data.title || "");
    formData.append("slug", data.slug || "");
    formData.append("shortDescription", data.shortDescription || "");
    formData.append("description", data.description || "");
    formData.append("category", data.category || "");
    formData.append("githubUrl", data.githubUrl || "");
    formData.append("liveUrl", data.liveUrl || "");
    formData.append("featured", String(Boolean(data.featured)));
    formData.append("startDate", data.startDate || "");
    formData.append("endDate", data.endDate || "");
    formData.append("clientName", data.clientName || "");
    formData.append("role", data.role || "");
    formData.append("challenges", data.challenges || "");
    formData.append("solution", data.solution || "");
    formData.append("techStack", JSON.stringify(data.techStackId || []));

    if (data.thumbnail instanceof File) {
      formData.append("thumbnail", data.thumbnail);
    } else if (data.thumbnail) {
      formData.append("thumbnail", data.thumbnail);
    }

    (data.media || []).forEach((file) => {
      formData.append("media", file);
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
