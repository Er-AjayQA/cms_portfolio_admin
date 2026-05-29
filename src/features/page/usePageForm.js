import { useFormik } from "formik";
import * as yup from "yup";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  createPageService,
  deletemultiplePagesService,
  deletePageService,
  getAllPagesService,
  getBySlugPageService,
  updatePageService,
} from "@/services/pages.services";

export const usePageForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  const [pagesLoading, setPagesLoading] = useState(false);
  const [allPages, setAllPages] = useState([]);
  const [pageDetailLoading, setPageDetailLoading] = useState(false);
  const [pageDetail, setPageDetail] = useState(null);

  const isEditMode = location.pathname.startsWith("/pages/edit/");
  const isViewMode = location.pathname.startsWith("/pages/view/");

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
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: pageSchema,
    onSubmit: async (values, helpers) => {
      try {
        if (isEditMode) {
          await updatePageService(params.slug, values);
        } else {
          await createPageService(values);
        }

        navigate("/pages", { replace: true });
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
  };
};
