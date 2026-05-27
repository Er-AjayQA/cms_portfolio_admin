import { useFormik } from "formik";
import * as yup from "yup";
import { useState } from "react";
import { useAuth } from "./useAuth";

export const useAuthForm = () => {
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const loginSchema = yup.object({
    email: yup
      .string()
      .email("Enter a valid email address")
      .required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const initialValues = {
    email: "",
    password: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values, helpers) => {
      try {
        await login(values).unwrap();
        navigate("/dashboard", { replace: true });
      } catch {
        helpers.setSubmitting(false);
      }
    },
  });

  const showEmailError = formik.touched.email && formik.errors.email;
  const showPasswordError = formik.touched.password && formik.errors.password;

  return {
    formik,
    showPassword,
    setShowPassword,
    showEmailError,
    showPasswordError,
  };
};
