"use client";

import React from "react";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { PasswordOutlined } from "@mui/icons-material";
import { User2 as User2Icon } from "lucide-react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const router = useRouter();
  const [errorMessages, setErrorMessages] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const formik = useFormik({
    initialValues: { username: "", password: "" },
    validate: (v) => {
      const e = {};
      if (!v.username) e.username = "Username or email is required.";
      if (!v.password) e.password = "Password is required.";
      return e;
    },
    onSubmit: async (values) => {
      setLoading(true);
      setErrorMessages([]);
      try {
        const res = await signIn("credentials", {
          redirect: false,
          username: values.username,
          password: values.password,
        });
        setLoading(false);
        if (!res || res.error) {
          setErrorMessages([res?.error || "Login failed"]);
          toast.error("Login failed");
          return;
        }
        toast.success("Login successful");
        router.push("/");
      } catch (err) {
        console.error(err);
        setLoading(false);
        setErrorMessages(["Unexpected error"]);
      }
    },
  });

  return (
    <div className="w-full p-6 flex flex-col justify-between">
      <div className="text-2xl mb-4 relative font-extrabold">
        Login
        <div className="absolute left-0 bottom-0 h-[3px] w-6 bg-cyan-500" />
      </div>

      <form onSubmit={formik.handleSubmit}>
        <div className="mt-6">
          {loading ? (
            <div className="flex justify-center items-center my-[56px]">
              <Loader className="animate-spin text-cyan-500" size={48} />
            </div>
          ) : (
            <>
              <div className="flex items-center relative mb-4">
                <User2Icon className="text-cyan-500 absolute left-4 w-6 h-6" />
                <input
                  type="text"
                  name="username"
                  onChange={formik.handleChange}
                  value={formik.values.username}
                  placeholder="Enter your username or email"
                  className="h-12 w-full pl-12 pr-4 text-lg font-bold border-b-2 border-gray-300 focus:outline-none focus:border-b-cyan-500 transition duration-300"
                  required
                />
              </div>
              {formik.errors.username && (
                <div className="text-red-500 text-sm mb-4">
                  {formik.errors.username}
                </div>
              )}

              <div className="flex items-center relative mb-6">
                <PasswordOutlined className="text-cyan-500 absolute left-4 w-6 h-6" />
                <input
                  type="password"
                  name="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  placeholder="Enter your password"
                  className="h-12 w-full pl-12 pr-4 text-lg font-bold border-b-2 border-gray-300 focus:outline-none focus:border-b-cyan-500 transition duration-300"
                  required
                />
              </div>
              {formik.errors.password && (
                <div className="text-red-500 text-sm mb-4">
                  {formik.errors.password}
                </div>
              )}
            </>
          )}

          {errorMessages.map((msg, i) => (
            <div className="text-red-500 text-sm" key={i}>
              {msg}
            </div>
          ))}

          <div className="text-sm text-muted-foreground mt-2">
            <a href="/forgotPassword" className="hover:underline">
              Forgot password?
            </a>
          </div>

          <div className="mt-6">
            <Button
              disabled={loading}
              type="submit"
              className="w-full bg-cyan-500 text-white py-3 px-4 cursor-pointer hover:bg-cyan-700 transition duration-300 disabled:bg-gray-400"
            >
              Log In
            </Button>
          </div>

          <Button
            type="button"
            onClick={() => signIn("google")}
            className="w-full mt-3 border py-3 px-4 hover:!bg-opacity-50"
          >
            Continue with Google
          </Button>
        </div>
      </form>

      <div className="text-center mt-6">
        Don{"'"}t have an account?{" "}
        <a
          href="/register"
          disabled={loading}
          className="text-cyan-500 cursor-pointer hover:underline"
        >
          Sign up now
        </a>
      </div>
    </div>
  );
}
