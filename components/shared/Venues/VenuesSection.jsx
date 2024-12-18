"use client";

import React, { useState, useEffect } from "react";
import { getVenues } from "@/services/venues";
import { VenueSideBarItem, VenueSideBarItemSkeleton } from "./VenueSideBarItem";

const VenuesSection = () => {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      fetchVenues();
    }
  }, [mounted]);

  const fetchVenues = async () => {
    setLoading(true);
    try {
      const res = await getVenues();
      setVenues(res.data);
      setLoading(false);
      setError(false);
    } catch (err) {
      setVenues([]);
      setLoading(false);
      setError(true);
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex flex-col items-center gap-3 w-full overflow-y-auto h-full pb-4 px-2">
      {loading ? (
        <>
          <VenueSideBarItemSkeleton />
          <VenueSideBarItemSkeleton />
        </>
      ) : error ? (
        <div className="flex flex-col items-center gap-3">
          <h2 className="text-lg font-bold text-center">
            Something went wrong
          </h2>
          <p className="text-sm text-center">
            We could not fetch the venues at the moment. Please try again later.
          </p>
        </div>
      ) : (
        venues?.map((venue, idx) => <VenueSideBarItem key={idx} venue={venue} />)
      )}
    </div>
  );
};

export default VenuesSection;
