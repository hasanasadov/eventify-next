"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { BASE_URL } from "@/constants";
import { FavoriteBorder } from "@mui/icons-material";
import { Favorite } from "@mui/icons-material";

const VenueDetail = () => {
  const params = useParams();
  const { id } = params;
  const [venue, setVenue] = useState(null);
  const [venueEvents, setVenueEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchVenueDetails = async () => {
      try {
        const foundVenue = await fetch(`${BASE_URL}/venues/${id}`).then((res) =>
          res.json()
        );

        if (!foundVenue) {
          throw new Error("Venue not found!");
        }
        setVenue(foundVenue);
      } catch (err) {
        setError(err.message);
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchEventsForThisVenue = async () => {
      try {
        const events = await fetch(`${BASE_URL}/events`).then((res) =>
          res.json()
        );
        const venueEvents = events.filter((item) => item.event.venue_id == id);
        setVenueEvents(venueEvents);
      } catch (err) {
        console.error(err);
      }
    };

    fetchEventsForThisVenue();
    fetchVenueDetails();
  }, [id]);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // make toast notification on center top
    toast.success(
      isFavorite ? "Removed from favorites" : "Added to favorites",
      {
        position: "top-center",
      }
    );
  };

  if (loading)
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

  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen bg-red-50">
        <div className="bg-red-100  border-red-400 text-red-700 px-4 py-3 rounded border-2">
          <p className="font-semibold">Error:</p>
          <p>{error}</p>
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
              <iframe
                title="Google Map"
                src={`https://www.google.com/maps/embed/v1/view?key=YOUR_API_KEY&center=${location.lat},${location.lng}&zoom=14`}
                className="w-full h-96 rounded-lg border-2"
                allowFullScreen
              />
            </div>
          )}
          {/* Events Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Upcoming Events
            </h2>
            {venueEvents.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {venueEvents.map((item) => (
                  <div
                    key={item.event.id}
                    className="bg-white p-6 rounded-lg border-2 hover:shadow-xl transition-shadow duration-300"
                  >
                    <h3 className="text-xl font-bold text-gray-800">
                      {item.event.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-2">
                      {item.event.description}
                    </p>
                    <p className="mt-4">
                      <span className="font-semibold">Date:</span>{" "}
                      {new Date(item.event.date).toLocaleDateString()}
                    </p>
                    <p>
                      <span className="font-semibold">Time:</span>{" "}
                      {item.event.start} - {item.event.finish}
                    </p>
                    <Link
                      href={`/events/${item.event.id}`}
                      className="mt-4 inline-block text-blue-500 hover:underline"
                    >
                      View Details
                    </Link>
                  </div>
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
