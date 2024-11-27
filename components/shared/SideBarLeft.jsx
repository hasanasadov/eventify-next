"use client";

import { Bookmark } from "@mui/icons-material";
import { HomeIcon } from "lucide-react";
import { Settings2 } from "lucide-react";
import React from "react";
import { useState } from "react";
import EventsSection from "./EventsSection";
import BookmarksSection from "./BookmarksSection";
import { Settings } from "lucide-react";
import SettingsSection from "./SettingsSection";
const SideBarLeft = () => {
  const [eventsButton, setEventsButton] = useState(true);
  const [saveButton, setsaveButton] = useState(false);
  const [settingsButton, setSettingsButton] = useState(false);

  return (
    <div className="h-[40vh] md:h-[80vh] md:w-1/4 w-full rounded-3xl overflow-hidden gap-2 flex justify-between">
      {/* Sidebar navigation buttons */}
      <div className="shadow-lg flex flex-col items-center justify-between rounded-lg overflow-hidden bg-purple-400 w-[70px] py-10">
        <div className="flex flex-col gap-3">
          {/* Home button */}
          <button
            className={`py-4 rounded-full w-10 h-10 flex items-center justify-center ${
              eventsButton ? "bg-purple-700 text-white" : "bg-gray-200"
            }`}
            onClick={() => {
              setEventsButton(true);
              setsaveButton(false);
              setSettingsButton(false);
            }}
          >
            <HomeIcon className="h-6 w-6" />
          </button>

          {/* Bookmarks button */}
          <button
            className={`py-4 rounded-full w-10 h-10 flex items-center justify-center ${
              saveButton ? "bg-purple-700 text-white" : "bg-gray-200"
            }`}
            onClick={() => {
              setEventsButton(false);
              setsaveButton(true);
              setSettingsButton(false);
            }}
          >
            <Bookmark className="h-6 w-6" />
          </button>
        </div>

        {/* Settings button */}
        <button
          className={`py-4 rounded-full w-10 h-10 flex items-center justify-center ${
            settingsButton ? "bg-purple-700 text-white" : "bg-gray-200"
          }`}
          onClick={() => {
            setEventsButton(false);
            setsaveButton(false);
            setSettingsButton(true);
          }}
        >
          <Settings2 className="h-6 w-6" />
        </button>
      </div>

      {/* Main content */}
      <div className="shadow-lg flex bg-gray-100 w-full rounded-lg flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-center p-4 w-full border-b h-fit border-gray-400">
          <h1 className="text-2xl font-extrabold text-purple-700">
            {eventsButton && "Events"}
            {saveButton && "Bookmarks"}
            {settingsButton && "Settings"}
          </h1>
        </div>

        <EventsSection eventsButton={eventsButton} />

        <BookmarksSection saveButton={saveButton} />

        <SettingsSection settingsButton={settingsButton} />
      </div>
    </div>
  );
};

export default SideBarLeft;
