import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";

export function AccountPopOver({ user }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Account</Button>
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
          <Link
            href="/favorites/events"
            className={`w-full ${user ? "block" : "hidden"}`}
          >
            <Button variant="ghost" className="w-full">
              Favorites
            </Button>
          </Link>
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
        </div>
      </PopoverContent>
    </Popover>
  );
}
