"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";

const VenueDetail = () => {
  const params = useParams();
  const { id } = params;
  const [venue, setVenue] = useState(null);
  const [venueEvents, setVenueEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  // Sample data - Replace with API data fetching as needed
  useEffect(() => {
    const fetchVenueDetails = async () => {
      try {
        const foundVenue = await fetch(
          `https://eventify-az.onrender.com/venues/${id}`
        ).then((res) => res.json());

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
        const events = await fetch(
          `https://eventify-az.onrender.com/events`
        ).then((res) => res.json());
        console.log(events);
        const venueEvents = events.filter((item) => item.event.venue_id == id);
        console.log(venueEvents);
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
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-blue-500 font-semibold">
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
            <h1 className="text-3xl font-bold text-green-700">{venue.name}</h1>
            <Link href="/" className="text-sm text-blue-500 hover:underline">
              Back to list
            </Link>
          </div>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/2">
              <img
                src={venue.image_1_link}
                alt={venue.name}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-xl font-semibold">Description</h2>
              <p className="text-sm text-gray-700">{venue.description}</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between gap-6">
            <div className="w-full md:w-1/2">
              <h2 className="text-xl font-semibold">Working Hours</h2>
              <p className="text-sm text-gray-700">
                Open: {venue.work_hours_open} - Close: {venue.work_hours_close}
              </p>
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="text-xl font-semibold">Venue Type</h2>
              <p className="text-sm text-gray-700">{venue.venue_type}</p>
            </div>
          </div>
          <div className="mt-6">
            <h2 className="text-xl font-semibold">Location</h2>
            <p className="text-sm text-gray-700">
              Latitude: {venue.lat}, Longitude: {venue.lng}
            </p>
            <div className="mt-4">
              {/* Embed Google Maps or custom map here */}
            </div>
          </div>
          <div className="mt-4">
            <button
              onClick={toggleFavorite}
              className={`px-4 py-2 rounded text-white transition ${
                isFavorite
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
            </button>
          </div>

          {/* Events Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Upcoming Events
            </h2>
            {venueEvents.length > 0 ? (
              <ul className="space-y-4">
                {venueEvents.map((item) => (
                  <li
                    key={item.event.id}
                    className="bg-gray-100 p-4 rounded-lg shadow-md"
                  >
                    <h3 className="text-xl font-bold">{item.event.title}</h3>
                    <h5>{item.event.description}</h5>
                    <p>
                      <span className="font-semibold">Date:</span>{" "}
                      {new Date(item.event.date).toLocaleDateString()}
                    </p>
                    <p>
                      <span className="font-semibold">Time:</span>{" "}
                      {item.event.start} - {item.event.finish}
                    </p>
                    <Link
                      href={`/events/${item.event.id}`}
                      className="text-blue-500 hover:underline"
                    >
                      View Details
                    </Link>
                  </li>
                ))}
              </ul>
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
