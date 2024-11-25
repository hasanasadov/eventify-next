"use client";

import { Bookmark } from "@mui/icons-material";
import { BookmarkRemove } from "@mui/icons-material";
import { HomeIcon } from "lucide-react";
import { Settings2 } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import EventsSection from "./EventsSection";
const SideBarLeft = () => {
  const bookmarks = [
    {
      id: 1,
      title: "Bookmarked Event 1",
      desc: "Bookmarked Event 1 Description",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf6zoRR_FPG7f2knECoYTgOuETejMYPg71vg&s",
    },
    {
      id: 2,
      title: "Bookmarked Event 2",
      desc: "Bookmarked Event 2 description",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf6zoRR_FPG7f2knECoYTgOuETejMYPg71vg&s",
    },
    {
      id: 3,
      title: "Bookmarked Event 3",
      desc: "Bookmarked Event 3 description",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf6zoRR_FPG7f2knECoYTgOuETejMYPg71vg&s",
    },
    {
      id: 4,
      title: "Bookmarked Event 4",
      desc: "Bookmarked Event 4 description",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf6zoRR_FPG7f2knECoYTgOuETejMYPg71vg&s",
    },
    {
      id: 5,
      title: "Bookmarked Event 5",
      desc: "Bookmarked Event 5 description",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf6zoRR_FPG7f2knECoYTgOuETejMYPg71vg&s",
    },
    {
      id: 6,
      title: "Bookmarked Event 6",
      desc: "Bookmarked Event 6 description",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf6zoRR_FPG7f2knECoYTgOuETejMYPg71vg&s",
    },
    {
      id: 7,
      title: "Bookmarked Event 7",
      desc: "Bookmarked Event 7 description",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf6zoRR_FPG7f2knECoYTgOuETejMYPg71vg&s",
    },
  ];
  const [eventsButton, setEventsButton] = useState(true);
  const [saveButton, setsaveButton] = useState(false);
  const [settingsButton, setSettingsButton] = useState(false);

  return (
    <div className="h-[40vh] md:h-[80vh] md:w-1/4 w-full rounded-3xl overflow-hidden gap-2 flex justify-between">
      {/* Sidebar navigation buttons */}
      <div className="shadow-lg flex flex-col items-center justify-between rounded-lg overflow-hidden bg-white w-[70px] py-10">
        <div className="flex flex-col gap-3">
          {/* Home button */}
          <button
            className={`py-4 rounded-full w-10 h-10 flex items-center justify-center ${
              eventsButton ? "bg-green-500 text-white" : "bg-gray-200"
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
              saveButton ? "bg-green-500 text-white" : "bg-gray-200"
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
            settingsButton ? "bg-green-500 text-white" : "bg-gray-200"
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
          <h1 className="text-2xl font-extrabold text-green-700">
            {eventsButton && "Events"}
            {saveButton && "Bookmarks"}
            {settingsButton && "Settings"}
          </h1>
        </div>

        <EventsSection eventsButton={eventsButton} />

        {/* Bookmarks Section */}
        <div
          className={`flex flex-col items-center gap-3 w-full overflow-y-auto h-full py-4 ${
            saveButton ? "flex" : "hidden"
          }`}
        >
          {bookmarks.map((item) => (
            <Link
              href={"/events/" + item.id}
              key={item.id}
              className="items-center p-4 gap-4 w-[90%] bg-green-300 rounded-lg relative"
            >
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center overflow-hidden">
                <img
                  src={item.img}
                  alt={item.id}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col gap-1 items-start justify-center">
                <h1 className="font-semibold text-lg">{item.title}</h1>
                <p className="text-sm text-gray-700">{item.desc}</p>
              </div>
              <div className="absolute flex top-2 right-2">
                <button className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                  <BookmarkRemove className="h-4 w-4" />
                </button>
              </div>
            </Link>
          ))}
        </div>

        {/* Settings Section */}
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
      </div>
    </div>
  );
};

export default SideBarLeft;
