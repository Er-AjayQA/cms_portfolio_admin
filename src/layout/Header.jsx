import { Bell, Search } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Header = () => {
  return (
    <header className="sticky top-0 z-10 shadow-md bg-[#f6f7fb]/95 backdrop-blur">
      <div className="flex w-full items-center gap-3 px-4 py-5 md:px-6">
        <SidebarTrigger className="border border-slate-200 bg-white shadow-sm hover:bg-slate-100" />

        <div className="relative hidden max-w-md flex-1 md:block">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="Search projects, content, settings..."
            className="h-10 rounded-xl border-slate-200 bg-white pl-9 shadow-sm"
          />
        </div>

        <div className="ml-auto flex items-center gap-3">
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="rounded-xl border-slate-200 bg-white shadow-sm"
          >
            <Bell className="size-4" />
          </Button>

          <div className="hidden items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2 shadow-sm md:flex">
            <div className="flex size-10 items-center justify-center rounded-xl bg-slate-950 text-sm font-semibold text-white">
              A
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-950">Admin</p>
              <p className="text-xs text-slate-500">Portfolio Manager</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
