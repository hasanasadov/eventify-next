import { FavoriteBorder } from "@mui/icons-material";
import Link from "next/link";
import React from "react";
import LOGO from "@/assets/logo.png";

const EventItem = ({ event, className }) => {
  return (
    <Link
      href={`/events/${event.id}`}
      key={event.id}
      className={`group  block    overflow-hidden  transition-all duration-300 ${className}`}
    >
      <div className="relative overflow-hidden rounded-2xl">
        <img
          src={event.imageURL || LOGO}
          alt={event.title || "event"}
          className="w-full h-[320px] object-cover group-hover:scale-[1.03] transition-transform duration-300"
        />
        <div className="absolute z-[9999] top-2 right-2 bg-gray-200 rounded-full p-1 group-hover:blockk hidden transition-colors duration-300">
          <FavoriteBorder className="text-gray-700 z-10 " />
        </div>
      </div>

      <div className="py-2">
        <h2 className="text-lg font-semibold  group-hover:text-green-600 transition-colors duration-300">
          {event.title}
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 line-clamp-5">
          {event.description}
        </p>
      </div>
    </Link>
  );
};

export default EventItem;
