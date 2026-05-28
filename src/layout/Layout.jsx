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
      <div className="flex w-full min-h-screen bg-transparent">
        <AppSidebar />
        <SidebarInset className="basis-2 min-h-screen bg-transparent transition-[margin] duration-200 ease-linear">
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 px-4 pb-4 md:px-6 md:pb-6">
              <div className="flex min-h-[calc(100vh-7rem)] w-full flex-col rounded-[1.75rem] border border-slate-200/70 bg-white/92 p-4 shadow-[0_20px_55px_-42px_rgba(15,23,42,0.28)] backdrop-blur md:p-6">
                <Outlet />
              </div>
            </main>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};
