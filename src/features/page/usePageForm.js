import { useFormik } from "formik";
import * as yup from "yup";
import { useEffect, useState } from "react";
import {
  createPageService,
  deletemultiplePagesService,
  deletePageService,
  getAllPagesService,
  getBySlugPageService,
  updatePageService,
} from "@/services/pages.services";

export const usePageForm = () => {
  const [pageFormStatus, setPageFormStatus] = useState(false);
  const [pagesLoading, setPagesLoading] = useState(false);
  const [pageSlug, setPageSlug] = useState(null);
  const [allPages, setAllPages] = useState([]);
  const [pageDetailLoading, setPageDetailLoading] = useState(false);
  const [pageDetail, setPageDetail] = useState(null);

  const [isEditMode, setIsEditMode] = useState(false);
  const [isViewMode, setIsViewMode] = useState(false);

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
    title: yup.string().required("Title is required"),
    slug: yup.string().required("Slug is required"),
  });

  const initialValues = {
    title: "",
    pageKey: "",
    slug: "",
    status: "draft",
  };

  const fetchAllPages = async () => {
    try {
      setPagesLoading(true);
      const response = await getAllPagesService();
      setAllPages(Array.isArray(response?.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching pages:", error);
    } finally {
      setPagesLoading(false);
    }
  };

  useEffect(() => {
    fetchAllPages();
  }, []);

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

  const formik = useFormik({
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

  const handleDeletePage = async (id) => {
    try {
      const pageData = await deletePageService(id);

      if (pageData?.success) {
        fetchAllPages();
      }
    } catch (error) {
      console.error("Error deleting page:", error);
    }
  };

  const handleDeleteMultiplePages = async (ids) => {
    try {
      const pageData = await deletemultiplePagesService(ids);

      if (pageData?.success) {
        fetchAllPages();
      }
    } catch (error) {
      console.error("Error deleting selected pages:", error);
    }
  };

  useEffect(() => {
    formik.setFieldValue("slug", () => {
      return formik.values.title?.split(" ")?.join("-");
    });
    formik.setFieldValue("pageKey", () => {
      return formik.values.title?.split(" ")?.join("-");
    });
  }, [formik.values.title]);

  useEffect(() => {
    if (isEditMode || isViewMode) {
      setPageFormStatus(true);
    }
  }, [isEditMode, isViewMode]);

  useEffect(() => {
    if (pageSlug) {
      handleGetPageDetail(pageSlug);
    }
  }, [pageSlug]);

  return {
    formik,
    pagesLoading,
    setPagesLoading,
    allPages,
    setAllPages,
    handleGetPageDetail,
    pageDetailLoading,
    pageDetail,
    handleDeletePage,
    isEditMode,
    isViewMode,
    pageTitle,
    resetForm,
    handleDeleteMultiplePages,
    pageFormStatus,
    setPageFormStatus,
    setIsEditMode,
    setIsViewMode,
    pageSlug,
    setPageSlug,
  };
};
