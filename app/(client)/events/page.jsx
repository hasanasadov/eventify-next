"use client";

import { useState, useEffect } from "react";
import { BASE_URL } from "@/constants";
import EventItem from "./EventItem";

const ITEMS_PER_PAGE = 8;
const ITEMS_PER_SCROLL = 4;

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [displayedEvents, setDisplayedEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(`${BASE_URL}/events`);
        const data = await res.json();
        setEvents(data);
        setDisplayedEvents(data.slice(0, ITEMS_PER_PAGE));
        if (data.length <= ITEMS_PER_PAGE) setHasMore(false);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const handleLoadMore = () => {
    if (!hasMore || loadingMore) return;

    setLoadingMore(true);
    setTimeout(() => {
      const nextBatch = displayedEvents.length + ITEMS_PER_SCROLL;
      if (nextBatch >= events.length) {
        setDisplayedEvents(events);
        setHasMore(false);
      } else {
        setDisplayedEvents(events.slice(0, nextBatch));
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
  }, [displayedEvents, hasMore, loadingMore]);

  return (
    <div className="min-h-screen  py-8 px-6">
      {isLoading ? (
        <div className="flex flex-col justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-600"></div>
          <p className="mt-4 text-green-500 font-semibold">
            Loading event details...
          </p>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-center text-green-600 mb-8">
              Explore Events
            </h1>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {displayedEvents.map((item) => (
              <EventItem key={item.event.id} item={item} />
            ))}
          </div>

          {hasMore && (
            <div className="text-center text-gray-500 mt-8">
              <p className="text-sm font-medium">
                {events.length - displayedEvents.length} more events available.
                Scroll down to load more!
              </p>
            </div>
          )}

          {loadingMore && (
            <div className="flex justify-center items-center mt-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-green-500"></div>
              <p className="ml-4 text-green-500 font-semibold">
                Loading more events...
              </p>
            </div>
          )}

          {!loadingMore && !hasMore && (
            <div className="text-center text-gray-600 mt-8">
              <p className="text-lg font-semibold text-gray-500">
                🎉 You{"'"}ve reached the end! No more events available.
              </p>
            </div>
          )}

          {!loadingMore && events.length === 0 && (
            <div className="text-center text-gray-600 mt-16">
              <p>No events available at the moment. Please check back later!</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default EventsPage;
