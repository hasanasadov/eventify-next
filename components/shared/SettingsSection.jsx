import React from "react";

const SettingsSection = ({ settingsButton }) => {
  return (
    <div
      className={`flex flex-col items-center gap-3 w-full overflow-y-auto h-full py-4 ${
        settingsButton ? "flex" : "hidden"
      }`}
    >
      <div className="flex flex-col gap-4 items-center w-[90%]">
        <button className="w-full bg-green-300 p-4 rounded-lg">
          <h1 className="text-lg font-semibold">Profile</h1>
        </button>
        <button className="w-full bg-green-300 p-4 rounded-lg">
          <h1 className="text-lg font-semibold">Settings</h1>
        </button>
        <button className="w-full bg-green-300 p-4 rounded-lg">
          <h1 className="text-lg font-semibold">Log Out</h1>
        </button>
      </div>
    </div>
  );
};

export default SettingsSection;
