"use client";

import React from "react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      disabled={pending}
      type="submit"
      className="w-full bg-cyan-500 text-white py-3 px-4 disabled:bg-gray-400"
    >
      {pending ? <Loader className="animate-spin" /> : "Send reset link"}
    </Button>
  );
}

export default function ForgotForm({ actionFn }) {
  const [state, formAction] = useActionState(actionFn, null);

  return (
    <form action={formAction} className="space-y-4">
      <input
        type="text"
        name="email"
        placeholder="Email (və ya username)"
        className="h-12 w-full px-4 text-lg font-bold border-b-2 border-gray-300 focus:outline-none focus:border-b-cyan-500 transition"
        required
      />

      {state?.ok && state?.message && (
        <div className="text-green-600 text-sm">{state.message}</div>
      )}
      {!state?.ok && state?.error && (
        <div className="text-red-500 text-sm">{state.error}</div>
      )}

      <SubmitButton />
    </form>
  );
}
