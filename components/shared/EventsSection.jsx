"use client";

import Link from "next/link";
import Image from "next/image";
import { BookmarkAdd } from "@mui/icons-material"; // Assuming you're using Material-UI's BookmarkAdd icon
import { useState, useEffect } from "react";
import { BASE_URL } from "@/constants";
const EventsSection = ({ eventsButton }) => {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    const fetchLinks = async () => {
      const res = await fetch(`${BASE_URL}/events`);
      const data = await res.json();
      setEvents(data);
    };
    fetchLinks();
  }, []);

  const isValidUrl = (url) => {
    try {
      new URL(url); // Will throw if the URL is not valid
      return true;
    } catch (e) {
      return false;
    }
  };
  return (
    <div
      className={`flex flex-col items-center gap-3 w-full overflow-y-auto h-full py-4  ${
        eventsButton ? "flex" : "hidden"
      }`}
    >
      {events.map((item) => (
        <Link
          href={`/events/${item.event.id}`}
          key={item.event.id}
          className="flex items-center flex-col  p-4 gap-4 w-[90%] bg-green-300  relative hover:bg-green-400 rounded-lg "
        >
          <Image
            src={
              isValidUrl(item.event.poster_image_link)
                ? item.event.poster_image_link
                : "/default-image.jpg"
            }
            className="rounded-lg w-48 h-24 bg-red-500"
            alt={item.event.title}
            width={100}
            height={100}
          />

          <div className="flex items-center ">
            {/* Event Details */}
            <div className="flex flex-col gap-1 items-start justify-center">
              <h1 className="font-semibold text-lg">{item.event.title}</h1>
              <p className="text-sm text-gray-600 line-clamp-2">
                {item.event.description}
              </p>
            </div>

            {/* Bookmark Button */}
            <div className="absolute flex top-2 right-2">
              <button className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                <BookmarkAdd className="h-4 w-4" />
              </button>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default EventsSection;
