"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { BASE_URL } from "@/constants";

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
    toast.success(
      isFavorite ? "Removed from favorites!" : "Added to favorites!"
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
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded shadow-lg">
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
        <div className="flex flex-col gap-6 bg-white p-6 rounded-xl shadow-lg">
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
                className="w-full h-full object-cover rounded-lg shadow-lg transform hover:scale-[1.005] transition-transform duration-300 ease-in-out"
              />
            </div>
            <div className="bg-white p-6 flex-1 rounded-lg shadow-lg space-y-6">
              <div>
                <h2 className="text-2xl font-extrabold text-green-500 mb-4">
                  Description
                </h2>
                <p className="text-sm text-gray-600">{venue.description}</p>
              </div>

              <div className="flex flex-col md:flex-row justify-between gap-8">
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
              </div>

              <div>
                <h3 className="text-lg font-semibold text-pink-600">
                  Location
                </h3>
                <p className="text-sm text-gray-600">
                  Latitude: <span className="font-medium">{venue.lat}</span>,
                  Longitude: <span className="font-medium">{venue.lng}</span>
                </p>
                <div className="mt-4">
                  {/* Embed Google Maps or custom map here */}
                </div>
              </div>

              <div className="mt-6">
                <button
                  onClick={toggleFavorite}
                  className={`px-6 py-3 rounded-lg text-white font-medium shadow-md transition-all transform duration-300 ease-in-out ${
                    isFavorite
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-blue-500 hover:bg-blue-600"
                  }`}
                >
                  {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                </button>
              </div>
            </div>
          </div>

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
                    className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
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