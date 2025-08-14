"use client";

import React from "react";
import { useFormik } from "formik";
import { toast } from "sonner";
import { handleForgotPassword } from "@/actions/users";

export default function ForgotPasswordPage() {
  const formik = useFormik({
    initialValues: { email: "" },
    onSubmit: async (v) => {
      await handleForgotPassword(v.email);
      toast.success("If an account exists, a reset link has been sent.");
    },
  });

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Forgot Password</h1>
      <form onSubmit={formik.handleSubmit}>
        <input
          className="w-full border-b p-3 mb-4"
          placeholder="Enter your email"
          name="email"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          required
        />
        <button className="w-full bg-green-500 text-white py-3">
          Send reset link
        </button>
      </form>
    </div>
  );
}
