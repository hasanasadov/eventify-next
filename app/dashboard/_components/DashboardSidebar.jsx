import { Home } from "lucide-react";
import Logo from "@/assets/logo.png";

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
import { User2Icon } from "lucide-react";
import { Dashboard } from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";

export const SideBarItems = [
  {
    title: "Go Home",
    url: paths.HOME,
    icon: Home,
  },
  {
    title: "Dashboard",
    url: paths.DASHBOARD.MAIN,
    icon: Dashboard,
  },
  {
    title: "Users",
    url: paths.DASHBOARD.USERS.LIST,
    icon: User2Icon,
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
          <SidebarGroupLabel className="text-green-500 mb-4">
            <div className="pl-4 md:pl-0 invert h-12 dark:drop-shadow-[0_0_4px_#fff]   flex items-center justify-center">
              <Link href="/">
                <Image src={Logo} alt="logo" width={100} height={100} />
              </Link>
            </div>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {SideBarItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a className="glass my-1" href={item.url}>
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
