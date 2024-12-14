import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { Calendar1Icon } from "lucide-react";
import { MuseumOutlined } from "@mui/icons-material";
import { MessageCircleIcon } from "lucide-react";
import { CalendarPlus2Icon } from "lucide-react";
import { User2Icon } from "lucide-react";

const MobileNavbar = () => {
  return (
    <div
      className={`fixed  right-0 bottom-0 w-full h-20  flex items-center justify-center gap-8 transition-transform duration-300 lg:hidden `}
      style={{ backgroundColor: "var(--accent-secondary)" }}
    >
      <Link href="/events">
        <Button
          className="text-2xl "
          style={{
            color: "var(--bg-light)",
          }}
          variant="ghost"
        >
          <Calendar1Icon style={{ width: "28px", height: "28px" }} />
        </Button>
      </Link>

      <Link href="/venues">
        <Button
          className="text-2xl "
          style={{
            color: "var(--bg-light)",
          }}
          variant="ghost"
        >
          <MuseumOutlined style={{ width: "28px", height: "28px" }} />
        </Button>
      </Link>

      <Link href="/chat">
        <Button
          className="text-2xl "
          style={{
            color: "var(--bg-light)",
          }}
          variant="ghost"
        >
          <MessageCircleIcon style={{ width: "28px", height: "28px" }} />
        </Button>
      </Link>

      <Link href="/pricing">
        <Button
          className="text-2xl "
          style={{
            color: "var(--bg-light)",
          }}
          variant="ghost"
        >
          <CalendarPlus2Icon style={{ width: "28px", height: "28px" }} />
        </Button>
      </Link>

      <Link href="/login">
        <Button
          className="text-2xl "
          style={{
            color: "var(--bg-light)",
          }}
          variant="ghost"
        >
          <User2Icon style={{ width: "28px", height: "28px" }} />
        </Button>
      </Link>
    </div>
  );
};

export default MobileNavbar;
