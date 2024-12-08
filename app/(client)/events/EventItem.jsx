import { FavoriteBorder } from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const EventItem = ({ event }) => {
  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };
  return (
    <Link
      href={`/events/${event.id}`}
      key={event.id}
      className="group block bg-white rounded-lg border-2 overflow-hidden  transition-all duration-300"
    >
      <div className="relative overflow-hidden">
        <Image
          src={
            isValidUrl(event.poster_image_link)
              ? event.poster_image_link
              : "/default-image.jpg"
          }
          alt={event.title}
          width={500}
          height={300}
          className="w-full h-56 object-cover group-hover:scale-[1.03] transition-transform duration-300"
        />
        <div className="absolute z-[9999] top-2 right-2 bg-gray-200 rounded-full p-1 group-hover:block hidden transition-colors duration-300">
          <FavoriteBorder className="text-gray-700 z-10 " />
        </div>
      </div>

      <div className="p-4">
        <h2 className="text-lg font-semibold  group-hover:text-green-600 transition-colors duration-300">
          {event.title}
        </h2>
        <p className="text-sm text-gray-600 mt-2 line-clamp-5">
          {event.description}
        </p>
      </div>
    </Link>
  );
};

export default EventItem;