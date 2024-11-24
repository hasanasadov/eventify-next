"use client";
import React, { useState } from "react";

const AuthForm = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className={`container mx-auto my-20 relative max-w-[850px] w-full bg-white p-10 shadow-lg perspective-[2700px] transition-transform duration-1000 ease-in-out ${
        isFlipped ? "rotate-y-180" : ""
      }`}
    >
      <input
        type="checkbox"
        id="flip"
        checked={isFlipped}
        onChange={() => setIsFlipped(!isFlipped)}
        className="hidden"
      />

      <div className="cover absolute top-0 left-1/2 h-full w-1/2 z-10 transition-all ease-in-out duration-1000 transform-origin-left preserve-3d hidden md:block">
        <div className="front absolute top-0 left-0 h-full w-full">
          <img
            src="../../../assets/images/maksi.jpg"
            alt=""
            className="absolute h-full w-full object-cover z-10"
          />
          <div className="text absolute top-0 left-0 flex flex-col items-center justify-center w-full h-full z-10">
            {/* Optional Text */}
          </div>
        </div>
        <div className="back absolute top-0 left-0 h-full w-full transform rotate-y-180">
          <img
            src="../../../assets/images/luna.jpg"
            alt=""
            className="absolute h-full w-full object-cover z-10"
          />
          <div className="text absolute top-0 left-0 flex flex-col items-center justify-center w-full h-full z-10">
            {/* Optional Text */}
          </div>
        </div>
      </div>

      <div className="forms w-full h-full bg-white">
        <div className="form-content flex flex-col lg:flex-row items-center justify-between">
          <div className="login-form w-full lg:w-1/2 p-6">
            <div className="title text-2xl font-medium text-gray-800 mb-4 relative">
              Login
              <div className="absolute left-0 bottom-0 h-[3px] w-6 bg-[#7d2ae8]"></div>
            </div>
            <form>
              <div className="input-boxes mt-6">
                <div className="input-box flex items-center relative mb-4">
                  <i className="fas fa-user text-[#7d2ae8] text-lg absolute left-4"></i>
                  <input
                    id="username-tb-login"
                    type="text"
                    placeholder="Enter your username"
                    className="h-12 w-full pl-12 pr-4 text-lg font-medium border-b-2 border-gray-300 focus:outline-none focus:border-[#7d2ae8] transition duration-300"
                    required
                  />
                </div>
                <div className="input-box flex items-center relative mb-6">
                  <i className="fas fa-lock text-[#7d2ae8] text-lg absolute left-4"></i>
                  <input
                    id="pass-tb-login"
                    type="password"
                    placeholder="Enter your password"
                    className="h-12 w-full pl-12 pr-4 text-lg font-medium border-b-2 border-gray-300 focus:outline-none focus:border-[#7d2ae8] transition duration-300"
                    required
                  />
                </div>
                <div className="text text-sm text-gray-800">
                  <a href="#">Forgot password?</a>
                </div>
                <div className="button mt-6">
                  <input
                    id="submit-btn-login"
                    type="submit"
                    value="Log in"
                    className="w-full bg-[#7d2ae8] text-white py-3 px-4 rounded-md cursor-pointer hover:bg-[#5b13b9] transition duration-300"
                  />
                </div>
              </div>
            </form>
            <div className="sign-up-text text-center mt-6">
              Don{"'"}t have an account?{" "}
              <label
                htmlFor="flip"
                className="text-[#7d2ae8] cursor-pointer hover:underline"
              >
                Sign up now
              </label>
            </div>
          </div>

          <div
            className="signup-form w-full lg:w-1/2 p-6 hidden lg:block"
            id="signup-form"
          >
            <div className="title text-2xl font-medium text-gray-800 mb-4 relative">
              Signup
              <div className="absolute left-0 bottom-0 h-[3px] w-5 bg-[#7d2ae8]"></div>
            </div>
            <form>
              <div className="input-boxes mt-6">
                <div className="input-box flex items-center relative mb-4">
                  <i className="fas fa-user text-[#7d2ae8] text-lg absolute left-4"></i>
                  <input
                    id="username-tb"
                    type="text"
                    placeholder="Enter your username"
                    className="h-12 w-full pl-12 pr-4 text-lg font-medium border-b-2 border-gray-300 focus:outline-none focus:border-[#7d2ae8] transition duration-300"
                    required
                  />
                </div>
                <div className="input-box flex items-center relative mb-4">
                  <i className="fas fa-envelope text-[#7d2ae8] text-lg absolute left-4"></i>
                  <input
                    id="email-tb-reg"
                    type="email"
                    placeholder="Enter your email"
                    className="h-12 w-full pl-12 pr-4 text-lg font-medium border-b-2 border-gray-300 focus:outline-none focus:border-[#7d2ae8] transition duration-300"
                    required
                  />
                </div>
                <div className="input-box flex items-center relative mb-4">
                  <i className="fas fa-lock text-[#7d2ae8] text-lg absolute left-4"></i>
                  <input
                    id="pass-tb-reg"
                    type="password"
                    placeholder="Enter your password"
                    className="h-12 w-full pl-12 pr-4 text-lg font-medium border-b-2 border-gray-300 focus:outline-none focus:border-[#7d2ae8] transition duration-300"
                    required
                  />
                </div>
                <div className="input-box flex items-center relative mb-6">
                  <i className="fas fa-lock text-[#7d2ae8] text-lg absolute left-4"></i>
                  <input
                    id="pass-tb-reg-again"
                    type="password"
                    placeholder="Enter your password again"
                    className="h-12 w-full pl-12 pr-4 text-lg font-medium border-b-2 border-gray-300 focus:outline-none focus:border-[#7d2ae8] transition duration-300"
                    required
                  />
                </div>

                <div className="is_organizer flex items-center mb-6">
                  <input
                    type="checkbox"
                    id="is_organizer"
                    name="is_organizer"
                    className="mr-2"
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

                <div className="button mt-6">
                  <input
                    id="submit-btn-reg"
                    type="submit"
                    value="Register"
                    className="w-full bg-[#7d2ae8] text-white py-3 px-4 rounded-md cursor-pointer hover:bg-[#5b13b9] transition duration-300"
                  />
                </div>
              </div>
            </form>
            <div className="sign-up-text text-center mt-6">
              Already have an account?{" "}
              <label
                htmlFor="flip"
                className="text-[#7d2ae8] cursor-pointer hover:underline"
              >
                Login now
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
