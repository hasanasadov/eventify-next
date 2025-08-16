"use client";

import React from "react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

function SubmitButton({ label }) {
  const { pending } = useFormStatus();
  return (
    <Button
      disabled={pending}
      type="submit"
      className="w-full bg-cyan-500 text-white py-3 px-4 disabled:bg-gray-400"
    >
      {pending ? <Loader className="animate-spin" /> : label}
    </Button>
  );
}

export default function ResetForm({ mode, token, requiresCurrent, actionFn }) {
  const router = useRouter();
  const [state, formAction] = useActionState(actionFn, null);

  React.useEffect(() => {
    if (state?.ok) {
      if (mode === "token") {
        // Forgot flow: uğurdan sonra login-ə göndərək
        router.push("/login");
      } else {
        // Authed flow: təhlükəsizlik üçün çıxış etdirib login-ə yönləndirək
        // (istəməsən, bu 2 sətri sil və sadəcə toast göstər)
        signOut({ callbackUrl: "/login" });
      }
    }
  }, [state?.ok, mode, router]);

  return (
    <form action={formAction} className="space-y-4">
      {mode === "token" && <input type="hidden" name="token" value={token} />}

      {mode === "authed" && requiresCurrent && (
        <input
          type="password"
          name="currentPassword"
          placeholder="Cari şifrə"
          className="h-12 w-full px-4 text-lg font-bold border-b-2 border-gray-300 focus:outline-none focus:border-b-cyan-500 transition"
          required
          minLength={8}
        />
      )}

      <input
        type="password"
        name="newPassword"
        placeholder="Yeni şifrə"
        className="h-12 w-full px-4 text-lg font-bold border-b-2 border-gray-300 focus:outline-none focus:border-b-cyan-500 transition"
        required
        minLength={8}
      />

      <input
        type="password"
        name="confirm"
        placeholder="Yeni şifrə (təkrar)"
        className="h-12 w-full px-4 text-lg font-bold border-b-2 border-gray-300 focus:outline-none focus:border-b-cyan-500 transition"
        required
        minLength={8}
        onInput={(e) => {
          const pass =
            e.currentTarget.form?.elements.namedItem("newPassword")?.value ||
            "";
          e.currentTarget.setCustomValidity(
            e.currentTarget.value === pass ? "" : "Şifrələr eyni olmalıdır."
          );
        }}
      />

      {state?.error && (
        <div className="text-red-500 text-sm">{state.error}</div>
      )}
      {state?.ok && state?.message && (
        <div className="text-green-600 text-sm">{state.message}</div>
      )}

      <SubmitButton
        label={mode === "token" ? "Reset password" : "Change password"}
      />
    </form>
  );
}
