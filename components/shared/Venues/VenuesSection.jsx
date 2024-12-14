"use client";

import React, { useState, useEffect } from "react";
import { getVenues } from "@/services/venues";
import { VenueSideBarItem, VenueSideBarItemSkeleton } from "./VenueSideBarItem";
import LOGO from "@/assets/logo.png";

const VenuesSection = () => {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchVenues = async () => {
      getVenues()
        .then((res) => {
          setVenues(res.data);
          setLoading(false);
          setError(false);
        })
        .catch(() => {
          setVenues([]);
          setLoading(false);
          setError(true);
        });
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
      ) : error ? (
        <div className="flex flex-col items-center gap-3">
          <h2 className="text-lg font-bold text-center">
            Something went wrong
          </h2>
          <p className="text-sm text-center">
            We couldn't fetch the venues at the moment. Please try again later.
          </p>
        </div>
      ) : (
        venues.map((venue, idx) => <VenueSideBarItem key={idx} venue={venue} />)
      )}
    </div>
  );
};

export default VenuesSection;
