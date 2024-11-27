import React from "react";

const LoginForm = ({ isFlipped, setIsFlipped }) => {
  return (
    <div className={` w-full lg:w-1/2 p-6 ${isFlipped ? "hidden md:block" : ""} `}>
      <div className=" text-2xl font-medium text-gray-800 mb-4 relative">
        Login
        <div className="absolute left-0 bottom-0 h-[3px] w-6 bg-[#7d2ae8]"></div>
      </div>
      <form>
        <div className="mt-6">
          <div className="flex items-center relative mb-4">
            <i className="fas fa-user text-[#7d2ae8] text-lg absolute left-4"></i>
            <input
              type="text"
              placeholder="Enter your username"
              className="h-12 w-full pl-12 pr-4 text-lg font-medium border-b-2 border-gray-300 focus:outline-none focus:border-[#7d2ae8] transition duration-300"
              required
            />
          </div>
          <div className="input-box flex items-center relative mb-6">
            <i className="fas fa-lock text-[#7d2ae8] text-lg absolute left-4"></i>
            <input
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
              type="submit"
              value="Log in"
              className="w-full bg-[#7d2ae8] text-white py-3 px-4 rounded-md cursor-pointer hover:bg-[#5b13b9] transition duration-300"
            />
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
