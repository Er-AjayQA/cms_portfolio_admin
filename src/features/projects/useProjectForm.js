import { useFormik } from "formik";
import * as yup from "yup";
import {
  createProjectService,
  getAllProjectsService,
} from "@/services/projects.services";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export const useProjectForm = () => {
  const navigate = useNavigate();
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
    featured: false,
    startDate: "",
    endDate: "",
    clientName: "",
    role: "",
    challenges: "",
    solution: "",
  };

  const [projectsLoading, setProjectsLoading] = useState(false);
  const [allProjects, setAllProjects] = useState([]);
  const [thumbnailPreview, setThumbnailPreview] = useState("");
  const [mediaPreviews, setMediaPreviews] = useState([]);
  const thumbnailPreviewRef = useRef("");
  const mediaPreviewsRef = useRef([]);

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

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: projectSchema,
    onSubmit: async (values, helpers) => {
      try {
        await createProjectService(values);
        navigate("/projects", { replace: true });
      } catch {
        helpers.setSubmitting(false);
      }
    },
  });

  const revokePreview = (url) => {
    if (url?.startsWith("blob:")) {
      URL.revokeObjectURL(url);
    }
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

    setMediaPreviews((prev) =>
      prev.filter((item) => item.id !== mediaIdToRemove),
    );
    formik.setFieldValue(
      "media",
      mediaPreviews
        .filter((item) => item.id !== mediaIdToRemove)
        .map((item) => item.file),
    );
  };

  useEffect(() => {
    fetchAllProjects();
  }, []);

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
  };
};
