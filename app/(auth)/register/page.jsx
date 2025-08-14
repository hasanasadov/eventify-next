"use client";

import React from "react";
import { useFormik } from "formik";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { PasswordOutlined, EmailOutlined } from "@mui/icons-material";
import { User2 as User2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { handleRegister } from "@/actions/users";

export default function RegisterPage() {
  const [errorMessages, setErrorMessages] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [qmarkHover, setQmarkHover] = React.useState(false);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      username: "",
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      rePassword: "",
      is_organizer: false,
    },
    validateOnBlur: false,
    validateOnChange: false,
    validate: (v) => {
      const e = {};
      if (!v.email) e.email = "Email is required.";
      if (!v.password) e.password = "Password is required.";
      if (v.password !== v.rePassword) e.rePassword = "Passwords do not match.";
      return e;
    },
    onSubmit: async (values) => {
      setLoading(true);
      setErrorMessages([]);
      try {
        const { rePassword, ...payload } = values;
        const res = await handleRegister(payload);
        setLoading(false);
        if (!res?.success) {
          setErrorMessages([res?.detail || "Failed to register"]);
          return;
        }
        toast.success("Registered successfully");
        formik.resetForm();
        router.push("/login");
      } catch (e) {
        console.error(e);
        setLoading(false);
        setErrorMessages(["Failed to register"]);
      }
    },
  });

  return (
    <div className="w-full p-6">
      <div className="text-2xl font-extrabold text-gray-800 mb-4 relative">
        Signup
        <div className="absolute left-0 bottom-0 h-[3px] w-5 bg-green-500" />
      </div>

      <form onSubmit={formik.handleSubmit}>
        <div className="mt-6">
          {loading ? (
            <div className="flex justify-center items-center my-[210px]">
              <Loader className="animate-spin text-green-500" size={48} />
            </div>
          ) : (
            <>
              <div className="flex items-center relative mb-4">
                <User2Icon className="text-green-500 absolute left-4 w-6 h-6" />
                <input
                  type="text"
                  name="username"
                  onChange={formik.handleChange}
                  value={formik.values.username}
                  placeholder="Username (optional)"
                  className="h-12 w-full pl-12 pr-4 text-lg font-bold border-b-2 border-gray-300 focus:outline-none focus:border-b-green-500 transition duration-300"
                />
              </div>

              <div className="flex items-center relative mb-4">
                <User2Icon className="text-green-500 absolute left-4 w-6 h-6" />
                <input
                  type="text"
                  name="first_name"
                  onChange={formik.handleChange}
                  value={formik.values.first_name}
                  placeholder="First Name (optional)"
                  className="h-12 w-full pl-12 pr-4 text-lg font-bold border-b-2 border-gray-300 focus:outline-none focus:border-b-green-500 transition duration-300"
                />
              </div>

              <div className="flex items-center relative mb-4">
                <User2Icon className="text-green-500 absolute left-4 w-6 h-6" />
                <input
                  type="text"
                  name="last_name"
                  onChange={formik.handleChange}
                  value={formik.values.last_name}
                  placeholder="Last Name (optional)"
                  className="h-12 w-full pl-12 pr-4 text-lg font-bold border-b-2 border-gray-300 focus:outline-none focus:border-b-green-500 transition duration-300"
                />
              </div>

              <div className="flex items-center relative mb-4">
                <EmailOutlined className="text-green-500 absolute left-4 w-6 h-6" />
                <input
                  type="email"
                  name="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  placeholder="Enter your email"
                  className="h-12 w-full pl-12 pr-4 text-lg font-bold border-b-2 border-gray-300 focus:outline-none focus:border-b-green-500 transition duration-300"
                  required
                />
              </div>
              {formik.errors.email && (
                <div className="text-red-500 text-sm mb-4">
                  {formik.errors.email}
                </div>
              )}

              <div className="flex items-center relative mb-4">
                <PasswordOutlined className="text-green-500 absolute left-4 w-6 h-6" />
                <input
                  type="password"
                  name="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  placeholder="Enter your password"
                  className="h-12 w-full pl-12 pr-4 text-lg font-bold border-b-2 border-gray-300 focus:outline-none focus:border-b-green-500 transition duration-300"
                  required
                />
              </div>
              {formik.errors.password && (
                <div className="text-red-500 text-sm mb-4">
                  {formik.errors.password}
                </div>
              )}

              <div className="flex items-center relative mb-6">
                <PasswordOutlined className="text-green-500 absolute left-4 w-6 h-6" />
                <input
                  type="password"
                  name="rePassword"
                  onChange={formik.handleChange}
                  value={formik.values.rePassword}
                  placeholder="Confirm your password"
                  className="h-12 w-full pl-12 pr-4 text-lg font-bold border-b-2 border-gray-300 focus:outline-none focus:border-b-green-500 transition duration-300"
                  required
                />
              </div>
              {formik.errors.rePassword && (
                <div className="text-red-500 text-sm mb-4">
                  {formik.errors.rePassword}
                </div>
              )}

              <div className="flex items-center mb-6">
                <input
                  type="checkbox"
                  onChange={formik.handleChange}
                  checked={formik.values.is_organizer}
                  name="is_organizer"
                  className="appearance-none ml-[18px] mr-2 w-6 h-6 rounded-full border-2 border-gray-300 checked:bg-green-500 checked:border-green-500 transition-colors cursor-pointer"
                />
                <label
                  htmlFor="is_organizer"
                  className="text-green-700 cursor-pointer"
                >
                  I am an organizer
                </label>
                <span
                  onMouseEnter={() => setQmarkHover(true)}
                  onMouseLeave={() => setQmarkHover(false)}
                  className="text-green-500 bg-gray-200 px-2 rounded-full ml-2 cursor-pointer relative"
                >
                  ?
                  <div
                    className={`absolute -left-20 md:left-0 bg-black text-white p-2 rounded-md text-sm w-[200px] ${
                      qmarkHover ? "block" : "hidden"
                    }`}
                  >
                    Organizers can also create events on our site.
                  </div>
                </span>
              </div>

              {errorMessages.length > 0 && (
                <div className="text-red-500 text-sm mb-4">
                  {errorMessages.map((m, i) => (
                    <div key={i}>{m}</div>
                  ))}
                </div>
              )}
            </>
          )}

          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-green-500 text-white py-3 px-4 hover:bg-green-700 transition duration-300 disabled:bg-gray-400"
              disabled={loading}
            >
              Register
            </button>
          </div>
        </div>
      </form>

      <div className="text-center mt-6">
        Already have an account?{" "}
        <button
          onClick={() => router.push("/login")}
          className="text-green-500 hover:underline"
        >
          Login now
        </button>
      </div>
    </div>
  );
}
