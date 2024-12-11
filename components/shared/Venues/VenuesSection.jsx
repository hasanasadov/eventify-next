"use client";

import React, { useState, useEffect } from "react";
import { getVenues } from "@/services/venues";
import { VenueSideBarItem, VenueSideBarItemSkeleton } from "./VenueSideBarItem";

const VenuesSection = () => {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const data = await getVenues();
        setVenues(data);
      } catch (error) {
        console.error("Failed to fetch venues:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };
    fetchVenues();
  }, []);

  return (
    <div className="flex flex-col items-center gap-3 w-full overflow-y-auto h-full pb-4 px-2">
      {loading ? (
        <>
          <VenueSideBarItemSkeleton />
          <VenueSideBarItemSkeleton />
        </>
      ) : (
        venues.map((venue, idx) => <VenueSideBarItem key={idx} venue={venue} />)
      )}
    </div>
  );
};

export default VenuesSection;
