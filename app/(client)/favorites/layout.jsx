"use client";

import React, { useState } from "react";
import { redirect } from "next/navigation";

const FavoritesLayout = ({ children }) => {
  const [selectedTab, setSelectedTab] = useState("events");

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-6">
      <h1 className="text-4xl text-center pb-6 font-bold text-[#075E54]">Your Favorites</h1>
      <div className="flex mb-6 items-center justify-center">
        <button
          onClick={() => {
            setSelectedTab("venues");
            redirect("/favorites/venues");
          }}
          className={`px-6 py-2 rounded-l-lg ${
            selectedTab === "venues"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Venues
        </button>
        <button
          onClick={() => {
            setSelectedTab("events");
            redirect("/favorites/events");
          }}
          className={`px-6 py-2 rounded-r-lg ${
            selectedTab === "events"
              ? "bg-green-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Events
        </button>
      </div>
      {children}
    </div>
  );
};

export default FavoritesLayout;
