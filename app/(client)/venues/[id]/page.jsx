"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { Toaster } from "react-hot-toast";
import { FavoriteBorder } from "@mui/icons-material";
import { Favorite } from "@mui/icons-material";
import EventItem from "../../events/EventItem";
import Map from "@/components/shared/Map";
import { useQuery } from "@tanstack/react-query";
import { getEvents } from "@/services/events";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { getVenueById } from "@/services/venues";
import { toast } from "sonner";

const VenueDetail = () => {
  const { id } = useParams();
  const [isFavorite, setIsFavorite] = useState(false);

  const {
    data: venue,
    isError,
    isLoading,
  } = useQuery({
    queryKey: [QUERY_KEYS.VENUES, id],
    queryFn: () => getVenueById(id),
  });

  const {
    data: allEvents,
    isError: eventsError,
    isLoading: eventsLoading,
  } = useQuery({
    queryKey: [QUERY_KEYS.EVENTS],
    queryFn: getEvents,
  });

  console.log(venue, allEvents);
  const venueEvents = allEvents?.filter((item) => item.venue_id == id);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast.success(isFavorite ? "Removed from favorites" : "Added to favorites");
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="flex flex-col justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-600"></div>
          <p className="mt-4 text-green-500 font-semibold">
            Loading venue details...
          </p>
        </div>
      </div>
    );

  if (isError)
    return (
      <div className="flex justify-center items-center min-h-screen bg-red-50">
        <div className="bg-red-100  border-red-400 text-red-700 px-4 py-3 rounded border-2">
          <p className="font-semibold">Error:</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="container mx-auto py-6">
        <div className="flex flex-col gap-6 bg-white p-6 rounded-xl border-2">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-green-500">{venue.name}</h1>
            <Link href="/" className="text-sm text-blue-500 hover:underline">
              Back to list
            </Link>
          </div>
          <div className="flex flex-col md:flex-row gap-8 md:gap-12">
            <div className="md:w-1/2 relative">
              <img
                src={venue.image_1_link}
                alt={venue.name}
                className="w-full h-full object-cover rounded-lg border-2 transform hover:scale-[1.005] transition-transform duration-300 ease-in-out"
              />
            </div>
            <div className="bg-white p-6 flex-1 rounded-lg border-2 space-y-6 relative">
              <div>
                <h2 className="text-2xl font-extrabold text-green-500 mb-4">
                  Description
                </h2>
                <p className="text-sm text-gray-600">{venue.description}</p>
              </div>

              <div className="flex flex-col  justify-between gap-8 ">
                <div className="w-full md:w-1/2 space-y-2">
                  <h3 className="text-lg font-semibold text-blue-600">
                    Working Hours
                  </h3>
                  <p className="text-sm text-gray-600">
                    Open:{" "}
                    <span className="font-medium">{venue.work_hours_open}</span>{" "}
                    - Close:{" "}
                    <span className="font-medium">
                      {venue.work_hours_close}
                    </span>
                  </p>
                </div>
                <div className="w-full md:w-1/2 space-y-2">
                  <h3 className="text-lg font-semibold text-purple-600">
                    Venue Type
                  </h3>
                  <p className="text-sm text-gray-600">{venue.venue_type}</p>
                </div>
                <div className="mt-6 absolute top-0 right-4">
                  {isFavorite ? (
                    <Favorite
                      style={{
                        color: "red",
                        fontSize: 30,
                      }}
                      className="cursor-pointer"
                      onClick={toggleFavorite}
                    />
                  ) : (
                    <FavoriteBorder
                      style={{
                        color: "black",
                        fontSize: 30,
                      }}
                      className="cursor-pointer"
                      onClick={toggleFavorite}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          {venue?.lat && venue?.lng && (
            <div className="mt-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Location
              </h2>
              <Map
                imageSource={venue.image_1_link}
                title={venue.name}
                location={{
                  lat: venue.lat,
                  lng: venue.lng,
                }}
              />
            </div>
          )}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Upcoming Events
            </h2>
            {venueEvents?.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {venueEvents.map((item) => (
                  <EventItem key={item.id} event={item} />
                ))}
              </div>
            ) : (
              <p>No events found for this venue.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VenueDetail;
