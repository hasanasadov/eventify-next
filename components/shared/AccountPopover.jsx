import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";
import { RenderIf } from "./RenderIf";
import { paths } from "@/constants/paths";

export function AccountPopOver({ user }) {
  const isAdmin = user?.is_admin === true || user?.first_name === "Hasanali";
  // const isOrganizer = user?.is_organizer === true;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className={`${!!user ? "border border-green-500" : ""}`}
          variant="outline"
        >
          Account
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-40 mr-8">
        <div className="grid gap-1">
          <Link
            href="/login"
            className={`w-full 
            ${user ? "hidden" : "block"}
            `}
          >
            <Button className="w-full" variant="ghost">
              Login
            </Button>
          </Link>
          <Link
            href="/register"
            className={`w-full 
            ${user ? "hidden" : "block"}
            `}
          >
            <Button variant="ghost" className="w-full">
              Register
            </Button>
          </Link>
          {/* <Link
            href="/favorites/events"
            className={`w-full ${user ? "block" : "hidden"}`}
          >
            <Button variant="ghost" className="w-full">
              Favorites
            </Button>
          </Link> */}
          <Link
            href="/profile"
            className={`w-full 
                ${user ? "block" : "hidden"}
                `}
          >
            <Button variant="ghost" className="w-full">
              Profile
            </Button>
          </Link>

          <Button
            variant="ghost"
            className={`w-full 
            ${user ? "block" : "hidden"} `}
            onClick={() => {
              localStorage.removeItem("access_token");
              localStorage.removeItem("refresh_token");
              window.location.href = "/";
            }}
          >
            {" "}
            Logout
          </Button>
          <RenderIf condition={!!isAdmin}>
            <Link
              href={paths.DASHBOARD.MAIN}
              className={`w-full ${user ? "block" : "hidden"}`}
            >
              <Button variant="ghost" className="w-full">
                Dashboard
              </Button>
            </Link>
          </RenderIf>
        </div>
      </PopoverContent>
    </Popover>
  );
}
