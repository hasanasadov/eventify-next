"use client";

import { Bookmark } from "@mui/icons-material";
import { HomeIcon } from "lucide-react";
import { Settings2 } from "lucide-react";
import React from "react";
import { useState } from "react";
import EventsSection from "./EventsSection";
import BookmarksSection from "./BookmarksSection";
import SettingsSection from "./SettingsSection";
const SideBarLeft = () => {
  const [eventsButton, setEventsButton] = useState(true);
  const [saveButton, setsaveButton] = useState(false);
  const [settingsButton, setSettingsButton] = useState(false);

  return (
    <div className="h-[40vh] md:h-[80vh] md:w-1/4 w-full rounded-3xl overflow-hidden flex justify-between">
      <div className="shadow-lg flex flex-col items-center justify-between rounded-l-lg overflow-hidden bg-green-400 w-[70px] py-10">
        <div className="flex flex-col gap-3">
          <button
            className={`py-4 rounded-full w-10 h-10 flex items-center justify-center ${
              eventsButton ? "bg-green-700 text-white" : "bg-gray-200"
            }`}
            onClick={() => {
              setEventsButton(true);
              setsaveButton(false);
              setSettingsButton(false);
            }}
          >
            <HomeIcon className="h-6 w-6" />
          </button>

          <button
            className={`py-4 rounded-full w-10 h-10 flex items-center justify-center ${
              saveButton ? "bg-green-700 text-white" : "bg-gray-200"
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

        <button
          className={`py-4 rounded-full w-10 h-10 flex items-center justify-center ${
            settingsButton ? "bg-green-700 text-white" : "bg-gray-200"
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

      <div className="shadow-lg flex bg-gray-200 w-full rounded-r-lg flex-col h-full">
        <div className="flex items-center justify-center p-4 w-full border-b h-fit border-gray-400">
          <h1 className="text-2xl font-extrabold text-green-700">
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
