import { useFormik } from "formik";
import * as yup from "yup";
import { createProjectService } from "@/services/projects.services";

export const useProjectForm = () => {
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
    thumbnail: yup.string().required("Thumbnail is required"),
    techStack: yup.string().required("Tech stack is required"),
  });

  const initialValues = {
    title: "",
    slug: "",
    shortDescription: "",
    description: "",
    thumbnail: "",
    images: [],
    category: "",
    techStack: [],
    githubUrl: "",
    liveUrl: "",
    videoUrl: "",
    featured: false,
    status: "",
    startDate: "",
    endDate: "",
    clientName: "",
    role: "",
    challenges: "",
    solution: "",
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

  return {
    formik,
    categoryOptions,
  };
};
