// app/reset-password/ResetPasswordForm.jsx
"use client";

import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { handleResetPassword } from "@/actions/users";
import { toast } from "sonner";

export default function ResetPasswordForm({ token }) {
  const router = useRouter();

  const formik = useFormik({
    initialValues: { password: "", rePassword: "" },
    onSubmit: async (v) => {
      if (v.password !== v.rePassword) {
        toast.error("Passwords do not match");
        return;
      }
      const res = await handleResetPassword({ token, newPassword: v.password });
      if (!res?.success) {
        toast.error(res?.detail || "Reset failed");
        return;
      }
      toast.success("Password changed");
      router.push("/login");
    },
  });

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Reset Password</h1>
      <form onSubmit={formik.handleSubmit}>
        <input
          className="w-full border-b p-3 mb-4"
          placeholder="New password"
          name="password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          required
        />
        <input
          className="w-full border-b p-3 mb-4"
          placeholder="Confirm password"
          name="rePassword"
          type="password"
          value={formik.values.rePassword}
          onChange={formik.handleChange}
          required
        />
        <button className="w-full bg-green-500 text-white py-3">
          Set new password
        </button>
      </form>
    </div>
  );
}
