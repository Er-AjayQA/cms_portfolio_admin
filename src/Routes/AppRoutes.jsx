import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ProtectedRoutes } from "./ProtectedRoutes";
import { LoginPage } from "@/features/auth/page";
import { Layout } from "@/layout/Layout";

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
              <Route path="/projects" element={<div>Projects</div>} />
              <Route path="/settings" element={<div>Settings</div>} />
            </Route>
          </Route>
        </Routes>
      </TooltipProvider>
    </BrowserRouter>
  );
};
