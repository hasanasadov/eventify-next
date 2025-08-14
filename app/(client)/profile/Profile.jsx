"use client";

import Image from "next/image";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Profile({ user }) {
  return (
    <div className="md:max-w-2xl md:mx-auto ">
      <h1 className="text-2xl font-semibold mb-6">Your Profile</h1>

      <section className="rounded-lg border p-5 flex items-center gap-4">
        <div className="relative w-16 h-16 shrink-0 rounded-full overflow-hidden bg-muted">
          {user?.image ? (
            <Image src={user.image} alt="Avatar" fill sizes="64px" />
          ) : (
            <div className="w-16 h-16 grid place-items-center text-xl">
              {(user?.name || user?.email || "U").slice(0, 1).toUpperCase()}
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="text-lg font-medium truncate">
            {user?.name || user?.email || "User"}
          </div>
          {user?.email ? (
            <div className="text-sm text-muted-foreground truncate">
              {user.email}
            </div>
          ) : null}
          {user?.role ? (
            <div className="text-xs mt-1 text-muted-foreground">
              Role: {user.role}
            </div>
          ) : null}
          {user?.id ? (
            <div className="text-xs mt-1 text-muted-foreground">
              ID: {user.id}
            </div>
          ) : null}
        </div>
      </section>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link href="/dashboard">
          <Button variant="secondary">Go to Dashboard</Button>
        </Link>

        <Link href="/reset-password">
          <Button variant="outline">Change Password</Button>
        </Link>

        <Button
          className="ml-auto"
          onClick={() =>
            signOut({
              callbackUrl: "/", // where to land after sign out
            })
          }
        >
          Sign out
        </Button>
      </div>
    </div>
  );
}
