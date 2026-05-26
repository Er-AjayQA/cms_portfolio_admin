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

  return (
    <Sidebar
      collapsible="icon"
      className="border-none shadow-lg bg-white"
      side="left"
      variant="sidebar"
    >
      <SidebarHeader className="drop-shadow-md shadow-md px-3 py-4 group-data-[collapsible=icon]:px-2">
        <div className="flex items-center gap-3 rounded-2xl bg-sidebar-accent px-3 py-3 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-sidebar-primary text-sidebar-primary-foreground">
            <Sparkles className="size-4" />
          </div>
          <div className="min-w-0 group-data-[collapsible=icon]:hidden">
            <p className="truncate text-sm font-semibold">Portfolio CMS</p>
            <p className="truncate text-xs text-sidebar-foreground/70">
              Admin workspace
            </p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="py-2">
        <SidebarGroup className="px-2">
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.name}
                    isActive={location.pathname === item.path}
                    size="lg"
                    className="rounded-xl group-data-[collapsible=icon]:justify-center"
                  >
                    <NavLink to={item.path}>
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

      <SidebarSeparator />

      <SidebarFooter className="border-t border-sidebar-border p-3 group-data-[collapsible=icon]:px-2">
        <SidebarMenu className="gap-1">
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Logout"
              onClick={logout}
              size="lg"
              className="rounded-xl group-data-[collapsible=icon]:justify-center"
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
    </Sidebar>
  );
};
