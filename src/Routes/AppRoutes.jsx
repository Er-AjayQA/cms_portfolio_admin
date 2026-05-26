import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export const Router = () => {
  return (
    <BrowserRouter>
      <TooltipProvider>
        <Routes>
          <Route path="/" element={<div>Home</div>} />
        </Routes>
      </TooltipProvider>
    </BrowserRouter>
  );
};
