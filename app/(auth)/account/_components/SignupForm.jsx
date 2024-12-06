"use client";

import { handleRegister } from "@/services/users";
import { PasswordOutlined } from "@mui/icons-material";
import { EmailOutlined } from "@mui/icons-material";
import { useFormik } from "formik";
import { User2Icon } from "lucide-react";
import React from "react";
import { toast } from "sonner";

const SignupForm = ({ isFlipped, setIsFlipped }) => {
  const [errorMessages, setErrorMessages] = React.useState([]);
  console.log("isFlipped", isFlipped);
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      rePassword: "",
      isOrganizer: false,
    },
    onSubmit: async (values) => {
      setErrorMessages([]);

      if (values.password !== values.rePassword) {
        setErrorMessages(["Passwords do not match"]);
        return;
      }

      try {
        const response = await handleRegister(values);
        if (response?.detail) {
          setErrorMessages([response.detail]);
          return;
        }
        // formik.resetForm();
      } catch (error) {
        console.error("Error during registration:", error);
        toast.error("Failed to register");
        setErrorMessages(["Failed to register"]);
      }
    },
  });
  return (
    <div
      className={` w-full lg:w-1/2 p-6 h-[520px]
    ${isFlipped ? "" : "hidden"}
    `}
    >
      <div className=" text-2xl font-extrabold text-gray-800 mb-4 relative">
        Signup
        <div className="absolute left-0 bottom-0 h-[3px] w-5 bg-[#7d2ae8]"></div>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="mt-6">
          <div className=" flex items-center relative mb-4">
            <User2Icon className="text-[#7d2ae8] text-lg absolute left-4 w-6" />
            <input
              type="text"
              name="username"
              onChange={formik.handleChange}
              value={formik.values.username}
              placeholder="Enter your username"
              className="h-12 w-full pl-12 pr-4 text-lg font-bold border-b-2 border-gray-300 focus:outline-none focus:border-[#7d2ae8] transition duration-300"
              required
            />
          </div>

          <div className=" flex items-center relative mb-4">
            <EmailOutlined className="text-[#7d2ae8] text-lg absolute left-4 w-6" />
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={formik.handleChange}
              value={formik.values.email}
              className="h-12 w-full pl-12 pr-4 text-lg font-bold border-b-2 border-gray-300 focus:outline-none focus:border-[#7d2ae8] transition duration-300"
              required
            />
          </div>
          <div className=" flex items-center relative mb-4">
            <PasswordOutlined className="text-[#7d2ae8] text-lg absolute left-4 w-6" />
            <input
              type="password"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              placeholder="Enter your password"
              className="h-12 w-full pl-12 pr-4 text-lg font-bold border-b-2 border-gray-300 focus:outline-none focus:border-[#7d2ae8] transition duration-300"
              required
            />
          </div>
          <div className=" flex items-center relative mb-6">
            <PasswordOutlined className="text-[#7d2ae8] text-lg absolute left-4 w-6" />
            <input
              type="password"
              name="rePassword"
              onChange={formik.handleChange}
              value={formik.values.rePassword}
              placeholder="Enter your password again"
              className="h-12 w-full pl-12 pr-4 text-lg font-bold border-b-2 border-gray-300 focus:outline-none focus:border-[#7d2ae8] transition duration-300"
              required
            />
          </div>

          <div className="is_organizer flex items-center mb-6">
            <input
              type="checkbox"
              onChange={formik.handleChange}
              checked={formik.values.isOrganizer}
              name="isOrganizer"
              className="rounded-md border-[#7d2ae8] w-6 h-6 mr-2"
            />
            <label
              htmlFor="is_organizer"
              className="text-[#7d2ae8] cursor-pointer"
            >
              I am an organizer
            </label>
            <span className="tooltip-icon text-[#7d2ae8] ml-2 cursor-pointer">
              ?
            </span>
            <div className="tooltip-text absolute top-[-10px] left-[150px] bg-black text-white p-2 rounded-md text-sm w-[200px] hidden">
              Organizers can also create events on our site.
            </div>
          </div>

          {errorMessages.length > 0 && (
            <div className="error-messages text-red-500">
              {errorMessages.map((message) => (
                <div key={message}>{message}</div>
              ))}
            </div>
          )}

          <div className="button mt-6">
            <button
              type="submit"
              className="w-full bg-[#7d2ae8] text-white py-3 px-4 rounded-md cursor-pointer hover:bg-[#5b13b9] transition duration-300"
            >
              {" "}
              Register{" "}
            </button>
          </div>
        </div>
      </form>

      <div className="sign-up-text text-center mt-6">
        Already have an account?{" "}
        <button
          onClick={() => setIsFlipped(false)}
          className="text-[#7d2ae8] cursor-pointer hover:underline"
        >
          Login now
        </button>
      </div>
    </div>
  );
};

export default SignupForm;
