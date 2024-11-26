"use client";

import React from "react";
import { TimelapseOutlined } from "@mui/icons-material";
import Link from "next/link";
import { useState, useEffect } from "react";
import { BASE_URL } from "@/constants";
const VenuesSection = () => {
  const [venues, setVenues] = useState([]);
  useEffect(() => {
    const fetchVenues = async () => {
      const res = await fetch(`${BASE_URL}/venues`);
      const data = await res.json();
      setVenues(data);
    };
    fetchVenues();
  }, []);
  return (
    <div className="flex flex-col items-center gap-3 w-full overflow-y-auto h-full py-4 px-2">
      {venues.map((venue) => (
        <Link
          href={`/venues/${venue.id}`}
          key={venue.id}
          className="flex items-center flex-col p-4 gap-4 w-[95%] bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 transition-all rounded-lg relative shadow-md"
        >
          <div className="w-48 h-24  bg-white flex items-center justify-center overflow-hidden shadow">
            <img
              src={venue.image_1_link || "/default-image.jpg"}
              alt={venue.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col gap-1 items-start justify-center">
            <div className="flex flex-col gap-1 items-start justify-center">
              <h1 className="font-bold text-lg text-blue-800">{venue.name}</h1>
              <p className="text-sm text-gray-600 line-clamp-2">
                {venue.description}
              </p>
            </div>
            <div className="absolute flex top-2 right-2">
              <button className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center shadow">
                <TimelapseOutlined className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default VenuesSection;
