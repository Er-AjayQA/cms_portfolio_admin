import { Outlet } from "react-router-dom";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Header } from "./Header";

export const Layout = () => {
  return (
    <SidebarProvider
      defaultOpen
      style={{
        "--sidebar-width": "13rem",
        "--sidebar-width-icon": "4.5rem",
      }}
    >
      <div className="flex min-h-screen w-full bg-[#f6f7fb]">
        <AppSidebar />
        <SidebarInset className="min-h-screen bg-[#f6f7fb] transition-[margin] duration-200 ease-linear">
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 p-4 md:p-6">
              <div className="flex min-h-[calc(100vh-10rem)] w-full flex-col rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-sm md:p-6">
                <Outlet />
              </div>
            </main>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};
