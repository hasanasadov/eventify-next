"use client";

import { Google } from "@mui/icons-material";
import { PasswordOutlined } from "@mui/icons-material";
import { useFormik } from "formik";
import { User2Icon } from "lucide-react";
import React from "react";
import { handleLogin } from "@/services/users";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import { Loader } from "lucide-react";

const LoginPage = () => {
  const [errorMessages, setErrorMessages] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.username) errors.username = "Username is required.";
      if (!values.password) errors.password = "Password is required.";
      return errors;
    },
    onSubmit: async (values) => {
      setLoading(true);
      setErrorMessages([]);
      try {
        const formData = new FormData();
        formData.append("username", values.username);
        formData.append("password", values.password);

        const res = await handleLogin(formData);
        setLoading(false);

        if (!res.success) {
          setErrorMessages([res.message]);
          toast.error("Login failed");
          return;
        }
        if (res.success) {
          localStorage.setItem("access_token", res.accessToken);
          formik.resetForm();
          toast.success("Login successful");
          redirect("/dashboard");
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

  const handleGoogleSignIn = () => {
    toast.info("Google Sign-In is not implemented yet.");
  };

  return (
    <div className="w-full p-6 flex flex-col justify-between">
      <div className="text-2xl text-gray-800 mb-4 relative font-extrabold">
        Login
        <div className="absolute left-0 bottom-0 h-[3px] w-6 bg-green-500"></div>
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
                <User2Icon className="text-green-500 text-lg absolute left-4 w-6" />
                <input
                  type="text"
                  name="username"
                  onChange={formik.handleChange}
                  value={formik.values.username}
                  placeholder="Enter your username"
                  className="h-12 w-full pl-12 pr-4 text-lg font-bold border-b-2 border-gray-300 focus:outline-none focus:border-b-green-500 transition duration-300"
                  required
                  aria-label="Username"
                  onBlur={() => formik.setFieldTouched("username", true)} // Mark as touched on blur
                />
              </div>
              {formik.touched.username && formik.errors.username && (
                <div className="text-red-500 text-sm mb-4">
                  {formik.errors.username}
                </div>
              )}

              <div className="flex items-center relative mb-6">
                <PasswordOutlined className="text-green-500 text-lg absolute left-4 w-6" />
                <input
                  type="password"
                  name="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  placeholder="Enter your password"
                  className="h-12 w-full pl-12 pr-4 text-lg font-bold border-b-2 border-gray-300 focus:outline-none focus:border-b-green-500 transition duration-300"
                  required
                  aria-label="Password"
                  onBlur={() => formik.setFieldTouched("password", true)} // Mark as touched on blur
                />
              </div>
              {formik.touched.password && formik.errors.password && (
                <div className="text-red-500 text-sm mb-4">
                  {formik.errors.password}
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
          <div className="text-sm text-gray-600 mt-2">
            <a href="#">Forgot password?</a>
          </div>
          <div className="mt-6">
            <button
              disabled={loading}
              type="submit"
              className="w-full bg-green-500 text-white py-3 px-4 cursor-pointer hover:bg-green-700 transition duration-300 disabled:bg-gray-400"
            >
              Log In
            </button>
          </div>
          <div className="mt-6 flex justify-evenly items-center bg-slate-100 w-full py-3 px-4 cursor-pointer hover:bg-gray-50  hover:text-green-500 transition duration-300">
            <Google />
            <button
              disabled={loading}
              type="button"
              className="cursor-pointer"
              onClick={handleGoogleSignIn}
            >
              Sign In With Google
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

export default LoginPage;
