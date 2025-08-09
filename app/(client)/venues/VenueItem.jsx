import { FavoriteBorder } from "@mui/icons-material";
import Link from "next/link";
import React from "react";
import LOGO from "@/assets/logo.png";

const VenueItem = ({ venue }) => {
  return (
    <Link
      href={`/venues/${venue.id}`}
      key={venue.id}
      className="group block bg-white hover:shadow-lg hover:border-blue-300  rounded-lg border-2 overflow-hidden  transition-all duration-300"
    >
      <div className="relative overflow-hidden">
        <img
          src={venue.imageURL || LOGO}
          alt={venue.title || "venue"}
          className="w-full h-56 object-cover group-hover:scale-[1.03] transition-transform duration-300"
        />
        <div className="absolute top-2 right-2 bg-gray-200 rounded-full p-1 group-hover:blockk hidden transition-colors duration-300">
          <FavoriteBorder className="text-gray-700 " />
        </div>
      </div>

      <div className="p-4">
        <h2 className="text-lg font-semibold  group-hover:text-blue-600 transition-colors duration-300">
          {venue.title}
        </h2>
        <p className="text-sm text-gray-600 mt-2 line-clamp-5">
          {venue.description}
        </p>
      </div>
    </Link>
  );
};

export default VenueItem;
