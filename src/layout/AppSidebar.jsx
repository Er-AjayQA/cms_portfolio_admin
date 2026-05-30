import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarRail,
  SidebarSeparator,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  FileStack,
  Folders,
  LayoutDashboard,
  LogOut,
  Settings,
  Sparkles,
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "@/features/auth/useAuth";

export const AppSidebar = () => {
  const { logout } = useAuth();
  const location = useLocation();

  const navigationItems = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Projects", path: "/projects", icon: Folders },
    { name: "Settings", path: "/settings", icon: Settings },
  ];

  const configurationItems = [
    { name: "Skill Category", path: "/skill-categories", icon: FileStack },
  ];

  const cmsItems = [{ name: "Pages", path: "/Pages", icon: FileStack }];

  return (
    <Sidebar
      collapsible="icon"
      className="bg-transparent border-none basis-1"
      side="left"
      variant="sidebar"
    >
      <div className="app-sidebar-shell flex h-[calc(100vh)] flex-col overflow-hidden rounded-r-lg">
        <SidebarHeader className="py-4 group-data-[collapsible=icon]:px-2">
          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-3 py-3 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0">
            <div className="flex items-center justify-center size-10 shrink-0 rounded-xl bg-sidebar-primary text-sidebar-primary-foreground">
              <Sparkles className="size-4" stroke="white" />
            </div>
            <div className="min-w-0 group-data-[collapsible=icon]:hidden">
              <p className="text-sm font-semibold text-white truncate">
                Portfolio CMS
              </p>
              <p className="text-xs truncate text-slate-300">Admin workspace</p>
            </div>
          </div>
        </SidebarHeader>

        <SidebarSeparator className="bg-white/10" />

        <SidebarContent className="py-2">
          <SidebarGroup className="px-2">
            <SidebarGroupLabel className="px-3 text-[11px] uppercase tracking-[0.24em] text-slate-400">
              Navigation
            </SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenu className="gap-1.5">
                {navigationItems.map((item) => (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton
                      asChild
                      tooltip={item.name}
                      isActive={location.pathname === item.path}
                      size="lg"
                      className="rounded-xl text-slate-300 transition-all hover:bg-white/8 hover:text-white data-[active=true]:bg-white/10 data-[active=true]:text-white data-[active=true]:shadow-none group-data-[collapsible=icon]:justify-center"
                    >
                      <NavLink
                        to={item.path}
                        className="flex items-center w-full gap-2 text-inherit"
                      >
                        <item.icon />
                        <span className="group-data-[collapsible=icon]:hidden">
                          {item.name}
                        </span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup className="px-2">
            <SidebarGroupLabel className="px-3 text-[11px] uppercase tracking-[0.24em] text-slate-400">
              Configurations
            </SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenu className="gap-1.5">
                {configurationItems.map((item) => (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton
                      asChild
                      tooltip={item.name}
                      isActive={location.pathname === item.path}
                      size="lg"
                      className="rounded-xl text-slate-300 transition-all hover:bg-white/8 hover:text-white data-[active=true]:bg-white/10 data-[active=true]:text-white data-[active=true]:shadow-none group-data-[collapsible=icon]:justify-center"
                    >
                      <NavLink
                        to={item.path}
                        className="flex items-center w-full gap-2 text-inherit"
                      >
                        <item.icon />
                        <span className="group-data-[collapsible=icon]:hidden">
                          {item.name}
                        </span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup className="px-2">
            <SidebarGroupLabel className="px-3 text-[11px] uppercase tracking-[0.24em] text-slate-400">
              CMS Management
            </SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenu className="gap-1.5">
                {cmsItems.map((item) => (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton
                      asChild
                      tooltip={item.name}
                      isActive={location.pathname === item.path}
                      size="lg"
                      className="rounded-xl text-slate-300 transition-all hover:bg-white/8 hover:text-white data-[active=true]:bg-white/10 data-[active=true]:text-white data-[active=true]:shadow-none group-data-[collapsible=icon]:justify-center"
                    >
                      <NavLink
                        to={item.path}
                        className="flex items-center w-full gap-2 text-inherit"
                      >
                        <item.icon />
                        <span className="group-data-[collapsible=icon]:hidden">
                          {item.name}
                        </span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarSeparator className="bg-white/10" />

        <SidebarFooter className="mt-auto p-3 group-data-[collapsible=icon]:px-2">
          <SidebarMenu className="gap-1">
            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip="Logout"
                onClick={logout}
                size="lg"
                className="rounded-xl text-slate-300 hover:bg-white/8 hover:text-white group-data-[collapsible=icon]:justify-center"
              >
                <LogOut />
                <span className="group-data-[collapsible=icon]:hidden">
                  Settings
                </span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip="Logout"
                onClick={logout}
                size="lg"
                className="rounded-xl text-slate-300 hover:bg-white/8 hover:text-white group-data-[collapsible=icon]:justify-center"
              >
                <LogOut />
                <span className="group-data-[collapsible=icon]:hidden">
                  Logout
                </span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </div>
    </Sidebar>
  );
};
