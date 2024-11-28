"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { BASE_URL } from "@/constants";
import { BookmarkAddOutlined } from "@mui/icons-material";
import { Bookmark } from "@mui/icons-material";
const EventsSection = ({ eventsButton }) => {
  const [events, setEvents] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHovered, setIsHovered] = useState("hidden");
  useEffect(() => {
    const fetchLinks = async () => {
      const res = await fetch(`${BASE_URL}/events`);
      const data = await res.json();
      setEvents(data);
    };
    fetchLinks();
  }, []);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const isValidUrl = (url) => {
    try {
      new URL(url);
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
          onMouseEnter={() => setIsHovered("block")}
          onMouseLeave={() => setIsHovered("hidden")}
          className="flex items-center flex-col  p-4 gap-4 w-[90%] bg-green-200  relative hover:bg-green-300 rounded-lg "
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
            <div className={`mt-6 absolute -top-2 right-4 z-10 ${isHovered}`}>
              {isFavorite ? (
                <Bookmark
                  style={{
                    fontSize: 25,
                  }}
                  className="cursor-pointer"
                  onClick={toggleFavorite}
                />
              ) : (
                <BookmarkAddOutlined
                  style={{
                    color: "black",
                    fontSize: 25,
                  }}
                  className="cursor-pointer"
                  onClick={toggleFavorite}
                />
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default EventsSection;
