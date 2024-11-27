import React from "react";

const SignupForm = ({ isFlipped, setIsFlipped }) => {
  return (
    <div
      className={` w-full lg:w-1/2 p-6
    ${isFlipped ? "" : "hidden"}
    `}
    >
      <div className=" text-2xl font-medium text-gray-800 mb-4 relative">
        Signup
        <div className="absolute left-0 bottom-0 h-[3px] w-5 bg-[#7d2ae8]"></div>
      </div>
      <form>
        <div className="mt-6">
          <div className=" flex items-center relative mb-4">
            <i className="fas fa-user text-[#7d2ae8] text-lg absolute left-4">
              i
            </i>
            <input
              type="text"
              placeholder="Enter your username"
              className="h-12 w-full pl-12 pr-4 text-lg font-medium border-b-2 border-gray-300 focus:outline-none focus:border-[#7d2ae8] transition duration-300"
              required
            />
          </div>

          <div className=" flex items-center relative mb-4">
            <i className="fas fa-envelope text-[#7d2ae8] text-lg absolute left-4"></i>
            <input
              type="email"
              placeholder="Enter your email"
              className="h-12 w-full pl-12 pr-4 text-lg font-medium border-b-2 border-gray-300 focus:outline-none focus:border-[#7d2ae8] transition duration-300"
              required
            />
          </div>
          <div className=" flex items-center relative mb-4">
            <i className="fas fa-lock text-[#7d2ae8] text-lg absolute left-4"></i>
            <input
              type="password"
              placeholder="Enter your password"
              className="h-12 w-full pl-12 pr-4 text-lg font-medium border-b-2 border-gray-300 focus:outline-none focus:border-[#7d2ae8] transition duration-300"
              required
            />
          </div>
          <div className=" flex items-center relative mb-6">
            <i className="fas fa-lock text-[#7d2ae8] text-lg absolute left-4"></i>
            <input
              type="password"
              placeholder="Enter your password again"
              className="h-12 w-full pl-12 pr-4 text-lg font-medium border-b-2 border-gray-300 focus:outline-none focus:border-[#7d2ae8] transition duration-300"
              required
            />
          </div>

          <div className="is_organizer flex items-center mb-6">
            <input type="checkbox" name="is_organizer" className="mr-2" />
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
              type="submit"
              value="Register"
              className="w-full bg-[#7d2ae8] text-white py-3 px-4 rounded-md cursor-pointer hover:bg-[#5b13b9] transition duration-300"
            />
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
