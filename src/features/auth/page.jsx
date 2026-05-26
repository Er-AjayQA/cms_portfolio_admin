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
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.24),_transparent_28%),linear-gradient(135deg,_#f8fafc_0%,_#e2e8f0_40%,_#cbd5e1_100%)] px-4 py-6 text-slate-900 md:px-6">
      <div className="mx-auto grid min-h-[calc(100vh-3rem)] w-full max-w-7xl overflow-hidden rounded-[2rem] border border-white/70 bg-white/70 shadow-[0_32px_120px_rgba(15,23,42,0.14)] backdrop-blur-xl md:grid-cols-[1.1fr_0.9fr]">
        <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.3),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(34,197,94,0.16),_transparent_34%),linear-gradient(160deg,_#020617_0%,_#0f172a_55%,_#111827_100%)] text-white">
          <div className="pointer-events-none absolute rounded-[1.75rem] border border-white/10 md:inset-5" />
          <div className="relative z-10 flex min-h-full flex-col justify-between gap-8 px-6 py-8 md:px-10 md:py-10">
            <div className="flex flex-col gap-5">
              <div className="inline-flex w-fit items-center rounded-full border border-white/15 bg-white/10 px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-sky-200">
                Portfolio Admin
              </div>
              <div className="space-y-10">
                <h1 className="font-heading text-[2.4rem] leading-[0.96] font-semibold tracking-[-0.05em] md:text-[3.75rem]">
                  Login and access your dashboard to manage your portfolio
                  content
                </h1>
                <p className="max-w-[520px] text-base leading-8 text-slate-200/85">
                  Use your admin credentials to manage projects, update content,
                  and keep your portfolio organized from one secure workspace.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="flex items-center justify-center px-4 py-6 md:px-8 md:py-8">
          <Card className="w-full max-w-[460px] border border-white/85 bg-gradient-to-b from-white/95 to-white/85 py-0 shadow-[0_18px_40px_rgba(15,23,42,0.08),inset_0_1px_0_rgba(255,255,255,0.7)]">
            <CardHeader className="space-y-2 px-6 py-3">
              <CardTitle className="text-2xl text-slate-950">Sign in</CardTitle>
              <CardDescription className="text-sm leading-6 text-slate-600">
                Enter your credentials to access your dashboard.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-5 px-6 py-6">
              {error ? (
                <Alert
                  variant="destructive"
                  className="border-red-500/15 bg-red-50/90"
                >
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
                        className="h-12 rounded-2xl border-[#dbe3ee] bg-white/90 pl-10 shadow-[inset_0_1px_2px_rgba(15,23,42,0.04)] focus-visible:border-slate-900 focus-visible:ring-4 focus-visible:ring-slate-900/10"
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
                        className="h-12 rounded-2xl border-[#dbe3ee] bg-white/90 pl-10 shadow-[inset_0_1px_2px_rgba(15,23,42,0.04)] focus-visible:border-slate-900 focus-visible:ring-4 focus-visible:ring-slate-900/10"
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
                  className="h-12 w-full rounded-2xl bg-[linear-gradient(135deg,#020617_0%,#0f172a_46%,#1d4ed8_100%)] text-white shadow-[0_14px_30px_rgba(15,23,42,0.18)] hover:bg-[linear-gradient(135deg,#0f172a_0%,#1e293b_42%,#2563eb_100%)]"
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
