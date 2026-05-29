import { Bell, Search } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Header = () => {
  return (
    <header className="sticky top-0 z-10 bg-white shadow-md">
      <div className="flex items-center w-full gap-3 px-4 py-4 md:px-6">
        <SidebarTrigger className="app-toolbar rounded-[var(--radius-md)] hover:bg-muted" />

        <div className="relative flex-1 hidden max-w-md md:block">
          <Search className="absolute -translate-y-1/2 pointer-events-none top-1/2 left-3 size-4 text-slate-400" />
          <Input
            placeholder="Search projects, content, settings..."
            className="pl-9"
          />
        </div>

        <div className="flex items-center gap-3 ml-auto">
          <Button
            type="button"
            variant="icon"
            size="icon"
            className="app-toolbar"
          >
            <Bell className="size-4" />
          </Button>

          <div className="app-toolbar hidden items-center gap-3 rounded-[var(--radius-md)] px-3 py-2 md:flex">
            <div className="flex items-center justify-center text-sm font-semibold text-white size-10 rounded-xl bg-slate-900">
              A
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">Admin</p>
              <p className="text-xs text-slate-500">Portfolio Manager</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
