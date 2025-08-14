"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

// type AccountPopOverProps = {
//   // istəsən serverdən user ötürə bilərsən, amma session üstünlük təşkil edəcək
//   user?: {
//     name?: string | null,
//     email?: string | null,
//     image?: string | null,
//     role?: string | null,
//   } | null,
// };

export function AccountPopOver({ user: userProp }) {
  const { data: session, status } = useSession();
  const user = session?.user ?? userProp ?? null;
  const isAuthed = !!user;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className={isAuthed ? "border border-green-500" : undefined}
          variant="glass"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Loading..." : "Account"}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-48 mr-8 glass !bg-white p-2">
        {/* Unauthenticated: Login / Register */}
        {!isAuthed && status !== "loading" && (
          <div className="grid gap-1">
            <Button
              className="w-full"
              variant="glass"
              onClick={() => signIn(undefined, { callbackUrl: "/" })}
            >
              Login
            </Button>
            <Link href="/register" className="w-full">
              <Button variant="glass" className="w-full">
                Register
              </Button>
            </Link>
          </div>
        )}

        {/* Authenticated: Profile / Logout */}
        {isAuthed && (
          <div className="grid gap-1">
            <div className="flex items-center gap-2 px-2 py-1">
              {user?.image && (
                <img
                  src={user.image}
                  alt={user?.name || "avatar"}
                  className="w-7 h-7 rounded-full"
                />
              )}
              <div className="text-sm leading-tight">
                <div className="font-medium truncate">
                  {user?.name || user?.email || "User"}
                </div>
                {user?.role ? (
                  <div className="text-xs text-muted-foreground">
                    {user.role}
                  </div>
                ) : null}
              </div>
            </div>

            <Link href="/profile" className="w-full">
              <Button variant="glass" className="w-full">
                Profile
              </Button>
            </Link>

            <Button
              variant="glass"
              className="w-full"
              onClick={() =>
                signOut({
                  callbackUrl: "/", // çıxışdan sonra hara yönlənsin
                })
              }
            >
              Logout
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
