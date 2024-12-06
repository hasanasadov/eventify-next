"use client";

import { Google } from "@mui/icons-material";
import { PasswordOutlined } from "@mui/icons-material";
import { useFormik } from "formik";
import { User2Icon } from "lucide-react";
import { handleLogin } from "@/services/users";
import React from "react";

const LoginForm = ({ isFlipped, setIsFlipped }) => {
  const [errorMessages, setErrorMessages] = React.useState([]);
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: async (values) => {
      console.log(values);
      setErrorMessages([]);
      const formData = new FormData();
      formData.append("username", values.username);
      formData.append("password", values.password);
      const res = await handleLogin(formData)
        .then(formik.resetForm(), toast.success("Registered successfully"))
        .catch((error) => {
          toast.error("Failed to register", error);
          setErrorMessages(["Failed to register"]),
            {
              position: "top-center",
            };
        });
      console.log("------------------");
      console.log(res);
    },
  });
  return (
    <div
      className={` w-full h-[520px] lg:w-1/2 p-6 flex flex-col justify-between ${
        isFlipped ? "hidden md:block" : ""
      } `}
    >
      <div className=" text-2xl  text-gray-800 mb-4 relative font-extrabold">
        Login
        <div className="absolute left-0 bottom-0 h-[3px] w-6 bg-[#7d2ae8]"></div>
      </div>
      <form>
        <div className="mt-6">
          <div className="flex items-center relative mb-4">
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
          <div className="input-box flex items-center relative mb-6">
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
          {errorMessages.length > 0 && (
            <div className="text-red-500 text-sm">
              {errorMessages.map((error) => (
                <div key={error}>{error}</div>
              ))}
            </div>
          )}
          <div className="text text-sm text-purple-800">
            <a href="#">Forgot password?</a>
          </div>
          <div className=" mt-6">
            <button
              type="submit"
              onClick={formik.handleSubmit}
              className="w-full bg-[#7d2ae8] text-white py-3 px-4 rounded-md cursor-pointer hover:bg-[#5b13b9] transition duration-300"
            >
              Log In{" "}
            </button>
          </div>
          <div className=" mt-6 flex justify-evenly  bg-slate-100  w-full py-3 px-4 cursor-pointer hover:bg-gray-300 hover:text-white transition duration-300">
            <Google />
            <button type="button" className="cursor-pointer ">
              {" "}
              Sign In With Goole
            </button>
          </div>
        </div>
      </form>
      <div className="sign-up-text text-center mt-6">
        Don{"'"}t have an account?{" "}
        <button
          className="text-[#7d2ae8] cursor-pointer hover:underline"
          onClick={() => setIsFlipped(true)}
        >
          Sign up now
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
