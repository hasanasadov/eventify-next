import { SearchSharp } from "@mui/icons-material";
import { EventAvailable } from "@mui/icons-material";
import { Building2Icon } from "lucide-react";
import { User2Icon } from "lucide-react";
import { FaMapPin } from "react-icons/fa";
import { paths } from "./paths";

export const NAVBAR_ITEM = [
  {
    title: "Search",
    icon: SearchSharp,
    href: paths.SEARCH,
  },
  {
    title: "Events",
    icon: EventAvailable,
    href: paths.EVENTS,
  },
  {
    title: "Venues",
    icon: Building2Icon,
    href: paths.VENUES,
  },
  {
    title: "Map",
    icon: FaMapPin,
    href: paths.MAP,
  },
  {
    title: "Account",
    icon: User2Icon,
    href: paths.PROFILE,
  },
];
