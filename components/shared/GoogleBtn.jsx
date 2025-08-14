"use client";
import { signIn } from "next-auth/react";

export default function GoogleBtn() {
  return (
    <button
      type="button"
      onClick={() => signIn("google")}
      className="w-full mt-3 border py-3 px-4 hover:bg-gray-50"
    >
      Continue with Google
    </button>
  );
}
