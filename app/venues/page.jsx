"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { TimelapseOutlined } from "@mui/icons-material";
import { BASE_URL } from "@/constants";

const VenuesPage = () => {
  const [venues, setVenues] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const res = await fetch(`${BASE_URL}/venues`);
        const data = await res.json();
        setVenues(data);
      } catch (error) {
        console.error("Error fetching venues:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchVenues();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 py-8 px-6">
      {isLoading ? (
        // Loading Spinner
        <div className="flex flex-col justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-600"></div>
          <p className="mt-4 text-green-500 font-semibold">
            Loading venues details...
          </p>
        </div>
      ) : (
        <>
          <h1 className="text-3xl font-bold text-center text-blue-800 mb-8">
            Explore Venues
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {venues.map((venue) => (
              <Link
                href={`/venues/${venue.id}`}
                key={venue.id}
                className="group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                {/* Image Section */}
                <div className="relative overflow-hidden">
                  <img
                    src={venue.image_1_link || "/default-image.jpg"}
                    alt={venue.name}
                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2 bg-gray-200 rounded-full p-1 group-hover:bg-blue-500 transition-colors duration-300">
                    <TimelapseOutlined className="text-gray-700 group-hover:text-white" />
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-blue-800 group-hover:text-blue-600 transition-colors duration-300">
                    {venue.name}
                  </h2>
                  <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                    {venue.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* No Venues Fallback */}
          {venues.length === 0 && (
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
