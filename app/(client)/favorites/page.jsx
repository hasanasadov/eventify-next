"use client";

import React, { useState, useEffect } from "react";
import FavoriteVenues from "./_components/FavoriteVenues";
import FavoriteEvents from "./_components/FavoriteEvents";

const FavoritesPage = () => {
  const [selectedTab, setSelectedTab] = useState("venues");

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Your Favorites
      </h1>
      <div className="flex justify-center mb-6">
        <button
          onClick={() => setSelectedTab("venues")}
          className={`px-6 py-2 rounded-l-lg ${
            selectedTab === "venues"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Venues
        </button>
        <button
          onClick={() => setSelectedTab("events")}
          className={`px-6 py-2 rounded-r-lg ${
            selectedTab === "events"
              ? "bg-green-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Events
        </button>
      </div>

      {selectedTab === "venues" && <FavoriteVenues />}
      {selectedTab === "events" && <FavoriteEvents />}
    </div>
  );
};

export default FavoritesPage;
