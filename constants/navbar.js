import { FavoriteBorderOutlined } from "@mui/icons-material";
import { SubscriptionsOutlined } from "@mui/icons-material";
import { MuseumOutlined } from "@mui/icons-material";
import { User2Icon } from "lucide-react";
import { MessageCircleIcon } from "lucide-react";
import { Calendar1Icon } from "lucide-react";

export const NAVBAR_ITEM = [
  {
    title: "Events",
    icon: Calendar1Icon,
    href: "/events",
  },
  {
    title: "Venues",
    icon: MuseumOutlined,
    href: "/venues",
  },
  {
    title: "Chat",
    icon: MessageCircleIcon,
    href: "/chat",
  },
  {
    title: "Favorites",
    icon: FavoriteBorderOutlined,
    href: "/favorites",
  },
  {
    title: "Subscriptions",
    icon: SubscriptionsOutlined,
    href: "/pricing",
  },
  {
    title: "Account",
    icon: User2Icon,
    href: "/account",
  },
];
