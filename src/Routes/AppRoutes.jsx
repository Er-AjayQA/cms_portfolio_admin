import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ProtectedRoutes } from "./ProtectedRoutes";
import { LoginPage } from "@/features/auth/page";
import { Layout } from "@/layout/Layout";
import { ProjectFormPage } from "@/features/projects/projectForm";
import { ProjectListingPage } from "@/features/projects/projectListing";

export const Router = () => {
  return (
    <BrowserRouter>
      <TooltipProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route element={<ProtectedRoutes />}>
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<div>Dashboard</div>} />

              {/* Projects Routes */}
              <Route path="/projects" element={<ProjectListingPage />} />
              <Route path="/projects/create" element={<ProjectFormPage />} />
              <Route
                path="/projects/edit/:slug"
                element={<ProjectFormPage />}
              />
              <Route
                path="/projects/view/:slug"
                element={<ProjectFormPage />}
              />

              <Route path="/settings" element={<div>Settings</div>} />
            </Route>
          </Route>
        </Routes>
      </TooltipProvider>
    </BrowserRouter>
  );
};
