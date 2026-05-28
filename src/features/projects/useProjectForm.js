import { useFormik } from "formik";
import * as yup from "yup";
import {
  createProjectService,
  deleteProjectService,
  getAllProjectsService,
  getBySlugProjectService,
  updateProjectService,
} from "@/services/projects.services";
import { API_BASE_URL } from "@/services/api";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export const useProjectForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  const [projectsLoading, setProjectsLoading] = useState(false);
  const [allProjects, setAllProjects] = useState([]);
  const [projectDetailLoading, setProjectDetailLoading] = useState(false);
  const [projectDetail, setProjectDetail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState("");
  const [mediaPreviews, setMediaPreviews] = useState([]);
  const thumbnailPreviewRef = useRef("");
  const mediaPreviewsRef = useRef([]);

  const isEditMode = location.pathname.startsWith("/projects/edit/");
  const isViewMode = location.pathname.startsWith("/projects/view/");

  const featuredOptions = [
    { label: "Featured", value: "true" },
    { label: "Not Featured", value: "false" },
  ];
  const categoryOptions = [
    "Web Development",
    "Mobile Development",
    "UI/UX Design",
    "Data Science",
    "DevOps",
    "Game Development",
  ];

  const projectSchema = yup.object({
    title: yup.string().required("Title is required"),
    slug: yup.string().required("Slug is required"),
    shortDescription: yup.string().required("Short description is required"),
    description: yup.string().required("Description is required"),
    thumbnail: yup.mixed().required("Thumbnail is required"),
    techStackId: yup
      .array()
      .min(1, "At least one tech stack is required")
      .required("Tech stack is required"),
  });

  const initialValues = {
    title: "",
    slug: "",
    shortDescription: "",
    description: "",
    thumbnail: "",
    media: [],
    category: "",
    techStackId: [],
    githubUrl: "",
    liveUrl: "",
    featured: "false",
    status: "draft",
    startDate: "",
    endDate: "",
    clientName: "",
    role: "",
    challenges: "",
    solution: "",
  };

  const fetchAllProjects = async () => {
    try {
      setProjectsLoading(true);
      const response = await getAllProjectsService();
      setAllProjects(Array.isArray(response?.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setProjectsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllProjects();
  }, []);

  const fetchBySlugProject = async (slug) => {
    try {
      setProjectDetailLoading(true);
      const response = await getBySlugProjectService(slug);
      const data = response?.data || null;

      setProjectDetail(data);
      return data;
    } catch (error) {
      console.error("Error fetching project detail:", error);
      return null;
    } finally {
      setProjectDetailLoading(false);
    }
  };

  const resetForm = () => {
    formik.resetForm();
    setThumbnailPreview("");
    setMediaPreviews([]);
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: projectSchema,
    onSubmit: async (values, helpers) => {
      try {
        if (isEditMode) {
          await updateProjectService(params.slug, values);
        } else {
          await createProjectService(values);
        }

        navigate("/projects", { replace: true });
        resetForm();
      } catch (error) {
        console.error("Error saving project:", error);
        helpers.setSubmitting(false);
      }
    },
  });

  const revokePreview = (url) => {
    if (url?.startsWith("blob:")) {
      URL.revokeObjectURL(url);
    }
  };

  const getAssetUrl = (url) => {
    if (!url || url instanceof File) return "";
    if (/^(blob:|data:|https?:\/\/)/i.test(url)) return url;
    return `${API_BASE_URL}${url.startsWith("/") ? "" : "/"}${url}`;
  };

  const getFileNameFromUrl = (url, fallback) => {
    if (!url || typeof url !== "string") return fallback;
    return decodeURIComponent(url.split("/").pop() || fallback);
  };

  const formatDateForInput = (value) => {
    if (!value) return "";
    if (typeof value === "string") return value.slice(0, 10);

    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? "" : date.toISOString().slice(0, 10);
  };

  const normalizeTechStackIds = (techStack = []) => {
    if (!Array.isArray(techStack)) return [];

    return techStack
      .map((item) => (typeof item === "object" ? item?._id || item?.id : item))
      .filter(Boolean);
  };

  useEffect(() => {
    thumbnailPreviewRef.current = thumbnailPreview;
  }, [thumbnailPreview]);

  useEffect(() => {
    mediaPreviewsRef.current = mediaPreviews;
  }, [mediaPreviews]);

  useEffect(() => {
    return () => {
      revokePreview(thumbnailPreviewRef.current);
      mediaPreviewsRef.current.forEach((item) => revokePreview(item.preview));
    };
  }, []);

  const handleThumbnailChange = (event) => {
    const file = event.currentTarget.files?.[0] || null;

    revokePreview(thumbnailPreview);

    formik.setFieldTouched("thumbnail", true, false);
    formik.setFieldValue("thumbnail", file);
    setThumbnailPreview(file ? URL.createObjectURL(file) : "");

    event.target.value = "";
  };

  const clearThumbnail = () => {
    revokePreview(thumbnailPreview);
    formik.setFieldValue("thumbnail", null);
    setThumbnailPreview("");
  };

  const handleMediaChange = (event) => {
    const files = Array.from(event.currentTarget.files || []);
    if (!files.length) return;

    const nextPreviews = files.map((file) => ({
      id: `${file.name}-${file.size}-${file.lastModified}-${crypto.randomUUID()}`,
      file,
      preview: URL.createObjectURL(file),
      type: file.type.startsWith("video/") ? "video" : "image",
      name: file.name,
    }));

    formik.setFieldTouched("media", true, false);
    formik.setFieldValue("media", [...formik.values.media, ...files]);
    setMediaPreviews((prev) => [...prev, ...nextPreviews]);

    event.target.value = "";
  };

  const removeMediaItem = (mediaIdToRemove) => {
    const removedItem = mediaPreviews.find(
      (item) => item.id === mediaIdToRemove,
    );
    revokePreview(removedItem?.preview);

    const nextMediaPreviews = mediaPreviews.filter(
      (item) => item.id !== mediaIdToRemove,
    );

    setMediaPreviews(nextMediaPreviews);
    formik.setFieldValue(
      "media",
      nextMediaPreviews
        .map((item) => item.file || item.original || null)
        .filter(Boolean),
    );
  };

  const handleGetProjectDetail = async (slug) => {
    try {
      const projectData = await fetchBySlugProject(slug);

      if (projectData) {
        formik.setValues({
          title: projectData.title || "",
          slug: projectData.slug || "",
          shortDescription: projectData.shortDescription || "",
          description: projectData.description || "",
          thumbnail: projectData.thumbnail || "",
          media: projectData.media || [],
          category: projectData.category || "",
          techStackId: normalizeTechStackIds(projectData.techStackId),
          githubUrl: projectData.githubUrl || "",
          liveUrl: projectData.liveUrl || "",
          featured: String(Boolean(projectData.featured)),
          status: projectData.status || "draft",
          startDate: formatDateForInput(projectData.startDate),
          endDate: formatDateForInput(projectData.endDate),
          clientName: projectData.clientName || "",
          role: projectData.role || "",
          challenges: projectData.challenges || "",
          solution: projectData.solution || "",
        });

        setThumbnailPreview(getAssetUrl(projectData.thumbnail));

        setMediaPreviews(
          (projectData.media || []).map((item, index) => ({
            id: item._id || item.id || `media-${index}`,
            preview: getAssetUrl(item.url || item),
            type: item.type?.startsWith?.("video") ? "video" : "image",
            name:
              item.name ||
              getFileNameFromUrl(item.url || item, `Media ${index + 1}`),
            file: null,
            original: item,
          })),
        );
      }
    } catch (error) {
      console.error("Error fetching project detail:", error);
    }
  };

  const handleDeleteProject = async (id) => {
    try {
      const projectData = await deleteProjectService(id);

      if (projectData?.success) {
        fetchAllProjects();
      }
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const pageTitle = () => {
    switch (true) {
      case isViewMode:
        return "View Project";
      case isEditMode:
        return "Edit Project";
      default:
        return "Create Project";
    }
  };

  return {
    formik,
    categoryOptions,
    thumbnailPreview,
    mediaPreviews,
    handleThumbnailChange,
    clearThumbnail,
    handleMediaChange,
    removeMediaItem,
    projectsLoading,
    setProjectsLoading,
    allProjects,
    setAllProjects,
    handleGetProjectDetail,
    projectDetailLoading,
    projectDetail,
    featuredOptions,
    handleDeleteProject,
    isEditMode,
    isViewMode,
    pageTitle,
    resetForm,
  };
};
