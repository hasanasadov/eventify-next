"use client";

import { Google } from "@mui/icons-material";
import { PasswordOutlined } from "@mui/icons-material";
import { useFormik } from "formik";
import { User2Icon } from "lucide-react";
import React from "react";
import { handleResetPassword } from "@/actions/users";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import { Loader } from "lucide-react";

const ForgotPasswordPage = () => {
  const [errorMessages, setErrorMessages] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      new_password: "",
      confirm_new_password: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.new_password) errors.new_password = "Password is required.";
      if (!values.confirm_new_password)
        errors.confirm_new_password = "Confirm password is required.";
      return errors;
    },
    onSubmit: async (values) => {
      setLoading(true);
      setErrorMessages([]);
      try {
        const formData = new FormData();
        formData.append("new_password", values.new_password);
        formData.append("confirm_new_password", values.confirm_new_password);

        const res = await handleResetPassword(formData);
        setLoading(false);

        if (!res.success) {
          setErrorMessages([res.message]);
          toast.error("Password reset failed");
          return;
        }
        if (res.success) {
          localStorage.setItem("access_token", res.accessToken);
          formik.resetForm();
          toast.success("Password reset successful");
          redirect("/");
        }
      } catch (error) {
        setLoading(false);
        setErrorMessages([
          "An unexpected error occurred. Please try again later.",
        ]);
        console.error(error);
      }
    },
  });

  return (
    <div className="w-full p-6 flex flex-col justify-between">
      <div className="text-2xl text-gray-800 mb-4 relative font-extrabold">
        Reset Password
        <div className="absolute left-0 bottom-0 h-[3px] w-48 bg-green-500"></div>
      </div>

      <form onSubmit={formik.handleSubmit}>
        <div className="mt-6">
          {loading && (
            <div className="flex justify-center items-center my-[56px]">
              <Loader className="animate-spin text-green-500" size={48} />
            </div>
          )}
          {!loading && (
            <>
              <div className="flex items-center relative mb-4">
                <PasswordOutlined className="text-green-500 text-lg absolute left-4 w-6" />
                <input
                  type="password"
                  name="new_password"
                  onChange={formik.handleChange}
                  value={formik.values.new_password}
                  placeholder="Enter new password"
                  className="h-12 w-full pl-12 pr-4 text-lg font-bold border-b-2 border-gray-300 focus:outline-none focus:border-b-green-500 transition duration-300"
                  required
                  aria-label="Password"
                  onBlur={() => formik.setFieldTouched("new_password", true)} // Mark as touched on blur
                />
              </div>

              {formik.touched.new_password && formik.errors.new_password && (
                <div className="text-red-500 text-sm mb-4">
                  {formik.errors.new_password}
                </div>
              )}

              <div className="flex items-center relative mb-6">
                <PasswordOutlined className="text-green-500 text-lg absolute left-4 w-6" />
                <input
                  type="password"
                  name="confirm_new_password"
                  onChange={formik.handleChange}
                  value={formik.values.confirm_new_password}
                  placeholder="Enter new password again"
                  className="h-12 w-full pl-12 pr-4 text-lg font-bold border-b-2 border-gray-300 focus:outline-none focus:border-b-green-500 transition duration-300"
                  required
                  aria-label="Password"
                  onBlur={() =>
                    formik.setFieldTouched("confirm_new_password", true)
                  } // Mark as touched on blur
                />
              </div>
              {formik.touched.confirm_new_password &&
                formik.errors.confirm_new_password && (
                  <div className="text-red-500 text-sm mb-4">
                    {formik.errors.confirm_new_password}
                  </div>
                )}
            </>
          )}
          {errorMessages.length > 0 &&
            errorMessages.map((error, index) => (
              <div className="text-red-500 text-sm" key={index}>
                {error}
              </div>
            ))}

          <div className="mt-6">
            <button
              disabled={loading}
              type="submit"
              className="w-full bg-green-500 text-white py-3 px-4 cursor-pointer hover:bg-green-700 transition duration-300 disabled:bg-gray-400"
            >
              Confirm Password Reset
            </button>
          </div>
        </div>
      </form>

      <div className="text-center mt-6">
        Don{"'"}t have an account?{" "}
        <button
          disabled={loading}
          className="text-green-500 cursor-pointer hover:underline"
          onClick={() => redirect("/register")}
        >
          Sign up now
        </button>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
