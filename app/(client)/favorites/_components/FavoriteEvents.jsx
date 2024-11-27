"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { BASE_URL } from "@/constants";
import { FavoriteBorder } from "@mui/icons-material";
import { getEvents } from "@/services/events";

const ITEMS_PER_PAGE = 8;
const ITEMS_PER_SCROLL = 4;

const FavoriteEvents = () => {
  const [events, setEvents] = useState([]);
  const [displayedEvents, setDisplayedEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getEvents();
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

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-6">
      {isLoading ? (
        <div className="flex flex-col justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-600"></div>
          <p className="mt-4 text-green-500 font-semibold">
            Loading event details...
          </p>
        </div>
      ) : (
        <>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {displayedEvents.map((item) => (
              <Link
                href={`/events/${item.event.id}`}
                key={item.event.id}
                className="group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={
                      isValidUrl(item.event.poster_image_link)
                        ? item.event.poster_image_link
                        : "/default-image.jpg"
                    }
                    alt={item.event.title}
                    width={500}
                    height={300}
                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2 bg-gray-200 rounded-full p-1 group-hover:bg-green-400 transition-colors duration-300">
                    <FavoriteBorder className="text-gray-700 group-hover:text-white" />
                  </div>
                </div>

                <div className="p-4">
                  <h2 className="text-lg font-semibold text-gray-800 group-hover:text-green-600 transition-colors duration-300">
                    {item.event.title}
                  </h2>
                  <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                    {item.event.description}
                  </p>
                </div>
              </Link>
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

export default FavoriteEvents;
