"use client";

import Link from "next/link";
import Image from "next/image";
import { BookmarkAdd } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { BASE_URL } from "@/constants";
// import EventsDialog from "./EventsDialog";

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const res = await fetch(`${BASE_URL}/events`);
        const data = await res.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLinks();
  }, []);

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
        // Loading Spinner
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
            Explore Our Events
          </h1>
          {/* <EventsDialog /> */}
        </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((item) => (
              <Link
                href={`/events/${item.event.id}`}
                key={item.event.id}
                className="group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                {/* Image Section */}
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
                    <BookmarkAdd className="text-gray-700 group-hover:text-white" />
                  </div>
                </div>

                {/* Content Section */}
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

          {/* No Events Fallback */}
          {events.length === 0 && (
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
