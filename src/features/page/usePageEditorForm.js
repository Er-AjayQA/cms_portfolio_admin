import { useFormik } from "formik";
import * as yup from "yup";
import { useEffect, useState } from "react";
import {
  createPageService,
  getBySlugPageService,
  updatePageService,
} from "@/services/pages.services";

export const usePageEditorForm = () => {
  const [pageSlug, setPageSlug] = useState(null);
  const [pageDetailLoading, setPageDetailLoading] = useState(false);
  const [pageDetail, setPageDetail] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isViewMode, setIsViewMode] = useState(false);

  const sectionTypeOptions = [
    { label: "Hero", value: "hero" },
    { label: "About", value: "about" },
    { label: "Skills", value: "skills" },
    { label: "Experience", value: "experience" },
    { label: "Timeline", value: "timeline" },
    { label: "Projects", value: "projects" },
    { label: "Project Grid", value: "project_grid" },
    { label: "Featured Project", value: "project_featured" },
    { label: "Tech Stack", value: "tech_stack" },
    { label: "Stats", value: "stats" },
    { label: "Testimonial", value: "testimonial" },
    { label: "Certification", value: "certification" },
    { label: "Education", value: "education" },
    { label: "Gallery", value: "gallery" },
    { label: "Rich Text", value: "rich_text" },
    { label: "CTA", value: "cta" },
    { label: "Contact Form", value: "contact_form" },
    { label: "Social Links", value: "social_links" },
    { label: "Map", value: "map" },
    { label: "Custom HTML", value: "custom_html" },
  ];

  const pageTitle = () => {
    switch (true) {
      case isViewMode:
        return "View Page";
      case isEditMode:
        return "Edit Page";
      default:
        return "Create Page";
    }
  };

  const pageSchema = yup.object({
    sectionType: yup.string().required("Section type is required"),
    title: yup.string().required("Title is required"),
    subTitle: yup.string().required("Subtitle is required"),
  });

  const initialValues = {
    pageId: "",
    sectionType: "",
    title: "",
    subTitle: "",
    display_order: "",
    settingsJson: {},
    isVisible: false,
  };

  const fetchBySlugPage = async (slug) => {
    try {
      setPageDetailLoading(true);
      const response = await getBySlugPageService(slug);
      const data = response?.data || null;

      setPageDetail(data);
      return data;
    } catch (error) {
      console.error("Error fetching page detail:", error);
      return null;
    } finally {
      setPageDetailLoading(false);
    }
  };

  const resetForm = () => {
    formik.resetForm();
    setIsEditMode(false);
    setIsViewMode(false);
    setPageSlug(null);
    setPageDetail(null);
  };

  const editorFormik = useFormik({
    initialValues: initialValues,
    validationSchema: pageSchema,
    onSubmit: async (values, helpers) => {
      try {
        if (isEditMode) {
          await updatePageService(pageSlug, values);
        } else {
          await createPageService(values);
        }

        fetchAllPages();
        setPageFormStatus(false);
        resetForm();
      } catch (error) {
        console.error("Error saving page:", error);
        helpers.setSubmitting(false);
      }
    },
  });

  const handleGetPageDetail = async (slug) => {
    try {
      const pageData = await fetchBySlugPage(slug);

      if (pageData) {
        formik.setValues({
          title: pageData.title || "",
          pageKey: pageData.pageKey || "",
          slug: pageData.slug || "",
          status: pageData.status || "draft",
        });

        setPageFormStatus(true);
      }
    } catch (error) {
      console.error("Error fetching page detail:", error);
    }
  };

  useEffect(() => {
    if (isEditMode || isViewMode) {
      setPageFormStatus(true);
    }
  }, [isEditMode, isViewMode]);

  return {
    editorFormik,
    handleGetPageDetail,
    pageDetailLoading,
    pageDetail,
    isEditMode,
    isViewMode,
    pageTitle,
    resetForm,
    setIsEditMode,
    setIsViewMode,
    pageSlug,
    setPageSlug,
    sectionTypeOptions,
  };
};
