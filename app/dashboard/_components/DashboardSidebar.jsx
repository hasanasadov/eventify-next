import { Home } from "lucide-react";

import {
  Sidebar,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { paths } from "@/constants/paths";
import { PinDrop } from "@mui/icons-material";
import { Building2Icon } from "lucide-react";
import { EventNoteSharp } from "@mui/icons-material";

export const SideBarItems = [
  {
    title: "Dashboard",
    url: paths.DASHBOARD.MAIN,
    icon: Home,
  },
  {
    title: "Events",
    url: paths.DASHBOARD.EVENTS.LIST,
    icon: EventNoteSharp,
  },
  {
    title: "Venues",
    url: paths.DASHBOARD.VENUES.LIST,
    icon: Building2Icon,
  },
  {
    title: "Locations",
    url: paths.DASHBOARD.LOCATIONS.LIST,
    icon: PinDrop,
  },
];
export const DashboardSidebar = () => {
  return (
    <Sidebar className="!bg-black border">
      <SidebarGroupContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-green-500">
            Application
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {SideBarItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarGroupContent>
    </Sidebar>
  );
};
