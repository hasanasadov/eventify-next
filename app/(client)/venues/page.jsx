"use client";

import React, { useState, useEffect } from "react";
import { BASE_URL } from "@/constants";
import VenueItem from "./VenueItem";
import { getVenues } from "@/services/venues";

const ITEMS_PER_PAGE = 8;
const ITEMS_PER_SCROLL = 4;

const VenuesPage = () => {
  const [venues, setVenues] = useState([]);
  const [displayedVenues, setDisplayedVenues] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);


  console.log(venues);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const data = await getVenues();
        setVenues(data);
        setDisplayedVenues(data.slice(0, ITEMS_PER_PAGE));
        if (data.length <= ITEMS_PER_PAGE) setHasMore(false);
      } catch (error) {
        setVenues([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchVenues();
  }, []);

  const handleLoadMore = () => {
    if (!hasMore || loadingMore) return;

    setLoadingMore(true);
    setTimeout(() => {
      const nextBatch = displayedVenues.length + ITEMS_PER_SCROLL;
      if (nextBatch >= venues.length) {
        setDisplayedVenues(venues);
        setHasMore(false);
      } else {
        setDisplayedVenues(venues.slice(0, nextBatch));
      }
      setLoadingMore(false);
    }, 500);
  };

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 100
    ) {
      handleLoadMore();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [displayedVenues, hasMore, loadingMore]);

  return (
    <div className="min-h-[70vh] bg-gray-50 py-8 px-6">
      {isLoading ? (
        <div className="flex flex-col justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-600"></div>
          <p className="mt-4 text-green-500 font-semibold">
            Loading venues details...
          </p>
        </div>
      ) : (
        <>
          <h1 className="text-4xl text-center pb-8 font-bold text-[#075E54]">
            Explore Venues
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {displayedVenues.map((venue) => (
              <VenueItem key={venue.id} venue={venue} />
            ))}
          </div>

          {hasMore && (
            <div className="text-center text-gray-500 mt-8">
              <p className="text-sm font-medium">
                {venues.length - displayedVenues.length} more venues available.
                Scroll down to load more!
              </p>
            </div>
          )}

          {loadingMore && (
            <div className="flex justify-center items-center mt-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
              <p className="ml-4 text-blue-500 font-semibold">
                Loading more venues...
              </p>
            </div>
          )}

          {!loadingMore && !hasMore && (
            <div className="text-center text-gray-600 mt-8">
              <p className="text-lg font-semibold text-gray-500">
                🎉 You{"'"}ve reached the end! No more venues available.
              </p>
            </div>
          )}

          {!loadingMore && venues.length === 0 && (
            <div className="text-center text-gray-600 mt-16">
              <p>No venues available at the moment. Please check back later!</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default VenuesPage;
