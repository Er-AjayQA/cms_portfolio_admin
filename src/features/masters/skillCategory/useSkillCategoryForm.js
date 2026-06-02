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
import {
  createSkillCategoryService,
  deleteMultipleSkillCategoryService,
  deleteSkillCategoryService,
  getAllSkillCategoryService,
  getBySlugSkillCategoryService,
  updateSkillCategoryService,
  updateStatusSkillCategoryService,
} from "@/services/misc.services";

export const useSkillCategoryForm = () => {
  const [pageFormStatus, setPageFormStatus] = useState(false);
  const [pageSlug, setPageSlug] = useState(null);
  const [dataLoading, setDataLoading] = useState(false);
  const [allData, setAllData] = useState([]);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detail, setDetail] = useState(null);

  const [isEditMode, setIsEditMode] = useState(false);
  const [isViewMode, setIsViewMode] = useState(false);
  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(false);

  const pageTitle = () => {
    switch (true) {
      case isViewMode:
        return "View Record";
      case isEditMode:
        return "Edit Record";
      default:
        return "Create Record";
    }
  };

  const pageDescription = () => {
    switch (true) {
      case isViewMode:
        return "View Skill Category";
      case isEditMode:
        return "Edit Skill Category";
      default:
        return "Create Skill Category";
    }
  };

  const formSchema = yup.object({
    name: yup.string().required("Name is required"),
  });

  const initialValues = {
    name: "",
    slug: "",
    status: "active",
  };

  const generateSlug = (value = "") =>
    value
      ?.trim()
      ?.toLowerCase()
      ?.split(" ")
      ?.filter(Boolean)
      ?.join("-");

  const fetchListingData = async () => {
    try {
      setDataLoading(true);
      const response = await getAllSkillCategoryService();
      setAllData(Array.isArray(response?.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching records:", error);
    } finally {
      setDataLoading(false);
    }
  };

  useEffect(() => {
    fetchListingData();
  }, []);

  const fetchDataBySlug = async (slug) => {
    try {
      setDetailLoading(true);
      const response = await getBySlugSkillCategoryService(slug);
      const data = response?.data || null;

      setDetail(data);
      return data;
    } catch (error) {
      console.error("Error fetching details:", error);
      return null;
    } finally {
      setDetailLoading(false);
    }
  };

  const resetForm = () => {
    formik.resetForm();
    setIsEditMode(false);
    setIsViewMode(false);
    setPageSlug(null);
    setDetail(null);
    setIsSlugManuallyEdited(false);
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: formSchema,
    onSubmit: async (values, helpers) => {
      try {
        if (isEditMode) {
          const payload = {
            name: values?.name,
            newSlug: values?.slug,
            status: values?.status,
          };
          await updateSkillCategoryService(pageSlug, payload);
        } else {
          await createSkillCategoryService(values);
        }

        fetchListingData();
        setPageFormStatus(false);
        resetForm();
      } catch (error) {
        console.error("Error saving page:", error);
        helpers.setSubmitting(false);
      }
    },
  });

  const handleGetDetail = async (slug) => {
    try {
      const data = await fetchDataBySlug(slug);

      if (data) {
        setIsSlugManuallyEdited(true);
        formik.setValues({
          name: data.name || "",
          slug: data.slug || "",
          status: data.status || "active",
        });

        setPageFormStatus(true);
      }
    } catch (error) {
      console.error("Error fetching details:", error);
    }
  };

  const handleUpdateRecordStatus = async (slug) => {
    try {
      const data = await updateStatusSkillCategoryService(slug);

      if (data?.success) {
        fetchListingData();
      }
    } catch (error) {
      console.error("Error updating record status:", error);
    }
  };

  const handleDeleteRecord = async (id) => {
    try {
      const pageData = await deleteSkillCategoryService(id);

      if (pageData?.success) {
        fetchListingData();
      }
    } catch (error) {
      console.error("Error deleting record:", error);
    }
  };

  const handleDeleteMultipleRecords = async (ids) => {
    try {
      const pageData = await deleteMultipleSkillCategoryService(ids);

      if (pageData?.success) {
        fetchListingData();
      }
    } catch (error) {
      console.error("Error deleting selected records:", error);
    }
  };

  useEffect(() => {
    if (isSlugManuallyEdited) {
      return;
    }

    const normalizedValue = generateSlug(formik.values.name);

    if (formik.values.slug !== normalizedValue) {
      formik.setFieldValue("slug", normalizedValue);
    }
  }, [formik.values.name, formik.values.slug, isSlugManuallyEdited]);

  const handleNameChange = (event) => {
    formik.handleChange(event);
  };

  const handleSlugChange = (event) => {
    const nextSlug = event.target.value;
    const normalizedNameSlug = generateSlug(formik.values.name);

    setIsSlugManuallyEdited(nextSlug !== normalizedNameSlug);
    formik.setFieldValue("slug", nextSlug);
  };

  useEffect(() => {
    if (isEditMode || isViewMode) {
      setPageFormStatus(true);
    }
  }, [isEditMode, isViewMode]);

  useEffect(() => {
    if (pageSlug) {
      handleGetDetail(pageSlug);
    }
  }, [pageSlug]);

  return {
    formik,
    dataLoading,
    setDataLoading,
    allData,
    setAllData,
    handleGetDetail,
    detailLoading,
    detail,
    handleDeleteRecord,
    isEditMode,
    isViewMode,
    pageTitle,
    resetForm,
    handleDeleteMultipleRecords,
    pageFormStatus,
    setPageFormStatus,
    setIsEditMode,
    setIsViewMode,
    pageSlug,
    setPageSlug,
    handleUpdateRecordStatus,
    pageDescription,
    handleNameChange,
    handleSlugChange,
  };
};
