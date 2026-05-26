import { useEffect } from "react";
import { useFormik } from "formik";
import { ArrowRight, LockKeyhole, Mail } from "lucide-react";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/features/auth/useAuth";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";

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

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login, loading, error, isAuthenticated, clearError } = useAuth();

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

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const showEmailError = formik.touched.email && formik.errors.email;
  const showPasswordError = formik.touched.password && formik.errors.password;

  const handleChange = (event) => {
    if (error) {
      clearError();
    }

    formik.handleChange(event);
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.22),_transparent_30%),linear-gradient(135deg,_#f8fafc_0%,_#e2e8f0_42%,_#cbd5e1_100%)] px-4 py-8 text-slate-950">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] w-full max-w-6xl overflow-hidden rounded-[32px] border border-white/70 bg-white/75 shadow-[0_32px_120px_rgba(15,23,42,0.14)] backdrop-blur md:grid-cols-[1.1fr_0.9fr]">
        <section className="relative flex flex-col justify-between overflow-hidden bg-slate-950 px-6 py-8 text-white md:px-10 md:py-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.3),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(34,197,94,0.18),_transparent_30%)]" />

          <div className="relative space-y-5">
            <div className="inline-flex w-fit items-center rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.24em] text-sky-200">
              Portfolio Admin
            </div>
            <div className="space-y-10">
              <h1 className="max-w-md font-heading text-4xl leading-tight font-semibold md:text-5xl">
                Login and access your dashboard to manage your portfolio content
              </h1>
              <p className="max-w-lg text-sm leading-6 text-slate-300 md:text-base">
                Use your admin credentials to manage projects, update content,
                and keep your portfolio organized from one secure workspace.
              </p>
            </div>
          </div>
        </section>

        <section className="flex items-center justify-center px-4 py-8 md:px-8">
          <Card className="w-full max-w-md border-white/80 bg-white/90 py-0 shadow-none">
            <CardHeader className="space-y-2 px-6 py-6">
              <CardTitle className="text-2xl text-slate-950">Sign in</CardTitle>
              <CardDescription className="text-sm leading-6 text-slate-600">
                Enter your credentials to access your dashboard.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-5 px-6 py-6">
              {error ? (
                <Alert variant="destructive">
                  <AlertTitle>Login failed</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              ) : null}

              <form className="space-y-5" onSubmit={formik.handleSubmit}>
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="email">Email address</FieldLabel>
                    <div className="relative">
                      <Mail className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        className="h-11 rounded-xl border-slate-200 bg-white pl-10"
                        value={formik.values.email}
                        onChange={handleChange}
                        onBlur={formik.handleBlur}
                        aria-invalid={showEmailError ? "true" : "false"}
                      />
                    </div>
                    {showEmailError ? (
                      <p className="text-sm text-red-600">
                        {formik.errors.email}
                      </p>
                    ) : null}
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <div className="relative">
                      <LockKeyhole className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" />
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        className="h-11 rounded-xl border-slate-200 bg-white pl-10"
                        value={formik.values.password}
                        onChange={handleChange}
                        onBlur={formik.handleBlur}
                        aria-invalid={showPasswordError ? "true" : "false"}
                      />
                    </div>
                    {showPasswordError ? (
                      <p className="text-sm text-red-600">
                        {formik.errors.password}
                      </p>
                    ) : null}
                  </Field>
                </FieldGroup>

                <Button
                  type="submit"
                  size="lg"
                  className="h-11 w-full rounded-xl bg-slate-950 text-white hover:bg-slate-800"
                  disabled={loading || formik.isSubmitting}
                >
                  {loading ? "Signing in..." : "Login to dashboard"}
                  <ArrowRight className="size-4" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
};
