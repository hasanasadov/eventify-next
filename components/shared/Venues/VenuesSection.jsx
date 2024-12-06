"use client";

import React from "react";

import { useState, useEffect } from "react";
import { getVenues } from "@/services/venues";
import VenueSideBarItem from "./VenueSideBarItem";
const VenuesSection = () => {
  const [venues, setVenues] = useState([]);
  useEffect(() => {
    const fetchVenues = async () => {
      const data = await getVenues();
      setVenues(data);
    };
    fetchVenues();
  }, []);
  return (
    <div className="flex flex-col items-center gap-3 w-full overflow-y-auto h-full py-4 px-2">
      {venues.map((venue, idx) => (
        <VenueSideBarItem key={idx} venue={venue} />
      ))}
    </div>
  );
};

export default VenuesSection;
