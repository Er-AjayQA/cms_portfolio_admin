import { Bell, Search } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Header = () => {
  return (
    <header className="sticky top-0 z-10 bg-transparent">
      <div className="flex w-full items-center gap-3 px-4 py-4 md:px-6">
        <SidebarTrigger className="app-toolbar rounded-[var(--radius-md)] hover:bg-muted" />

        <div className="relative hidden max-w-md flex-1 md:block">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="Search projects, content, settings..."
            className="pl-9"
          />
        </div>

        <div className="ml-auto flex items-center gap-3">
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="app-toolbar"
          >
            <Bell className="size-4" />
          </Button>

          <div className="app-toolbar hidden items-center gap-3 rounded-[var(--radius-md)] px-3 py-2 md:flex">
            <div className="flex size-10 items-center justify-center rounded-xl bg-slate-900 text-sm font-semibold text-white">
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
