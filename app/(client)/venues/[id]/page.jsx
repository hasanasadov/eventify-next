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
import { QUERY_KEYS } from "@/constants/queryKeys";
import { toast } from "sonner";
import { Renderif } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import eventServices from "@/services/events";
import venueServices from "@/services/venues";

const VenueDetail = () => {
  const { id } = useParams();
  const [isFavorite, setIsFavorite] = useState(false);
  const forceSignIn = true;
  const [newComment, setNewComment] = useState("");
  const [sliceCount, setSliceCount] = useState(3);

  const {
    data: venue,
    isError,
    isLoading,
  } = useQuery({
    queryKey: [QUERY_KEYS.VENUES, id],
    queryFn: () => venueServices.getVenueById(id),
  });

  const {
    data: allEvents,
    isError: eventsError,
    isLoading: eventsLoading,
  } = useQuery({
    queryKey: [QUERY_KEYS.EVENTS],
    queryFn: eventServices.getEvents,
  });

  const {
    data: venueComments,
    isError: commentsError,
    isLoading: commentsLoading,
  } = useQuery({
    queryKey: [QUERY_KEYS.VENUE_COMMENTS, id],
    queryFn: () => venueServices.getVenueComments(id),
  });

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
            <Link
              href="/venues"
              className="text-sm text-blue-500 hover:underline"
            >
              Back to list
            </Link>
          </div>
          <div className="flex flex-col md:flex-row gap-8 md:gap-12">
            <Renderif condition={venue?.image_1_link}>
              <img
                src={venue.image_1_link}
                alt={venue.name}
                className="w-full md:max-w-[50%]  h-full  object-contain rounded-lg border-2"
              />
            </Renderif>
            <Renderif condition={!venue?.image_1_link}>
              <div className="w-full md:w-1/2 h-64 bg-gray-300 rounded-lg border-2 flex items-center justify-center">
                <p className="text-gray-500">No Image Available</p>
              </div>
            </Renderif>
            <div className="bg-white p-6 flex-1 rounded-lg border-2 space-y-6 relative">
              <div className="text-blue-500">
                <span className="text-3xl font-bold ">{venue.name}</span>{" "}
                <span className="text-md!">({venue.venue_type})</span>
              </div>

              <div className="flex flex-col  justify-between gap-8 ">
                <div className="w-full md:w-1/2 space-y-2">
                  <h3 className="text-2xl font-semibold ">Working Hours</h3>
                  <p className="text-md text-gray-600">
                    Open:{" "}
                    <span className="font-medium">{venue.work_hours_open}</span>{" "}
                    - Close:{" "}
                    <span className="font-medium">
                      {venue.work_hours_close}
                    </span>
                  </p>
                </div>
                <div>
                  <h2 className="text-2xl  text-gray-800 mb-4 font-semibold">
                    Description
                  </h2>
                  <p className="text-md text-gray-600">{venue.description}</p>
                </div>

                {/* <div className="mt-6 absolute top-0 right-4">
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
                </div> */}
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
          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Comments
            </h2>
            <div className="space-y-4">
              <Renderif condition={venueComments?.length && !commentsError}>
                {venueComments?.slice(0, sliceCount).map((comment, index) => (
                  <div
                    key={index}
                    className="bg-gray-100 p-4 flex items-center justify-between rounded-lg border-2"
                  >
                    <p>{comment.comment.content}</p>
                    <p className="text-gray-500 text-sm">
                      {comment.owner.username}
                    </p>
                  </div>
                ))}
              </Renderif>

              <Renderif condition={commentsLoading}>
                <div className="animate-pulse bg-gray-100 p-4 flex items-center justify-between rounded-lg border-2">
                  <div className="h-4 w-1/4 bg-gray-200 rounded-lg"></div>
                  <div className="h-4 w-1/12 bg-gray-200 rounded-lg"></div>
                </div>
                <div className="animate-pulse bg-gray-100 p-4 flex items-center justify-between rounded-lg border-2">
                  <div className="h-4 w-1/4 bg-gray-200 rounded-lg"></div>
                  <div className="h-4 w-1/12 bg-gray-200 rounded-lg"></div>
                </div>
                <div className="animate-pulse bg-gray-100 p-4 flex items-center justify-between rounded-lg border-2">
                  <div className="h-4 w-1/4 bg-gray-200 rounded-lg"></div>
                  <div className="h-4 w-1/12 bg-gray-200 rounded-lg"></div>
                </div>
              </Renderif>
              <Renderif condition={!venueComments?.length && !commentsLoading}>
                <p className="text-gray-500">No comments yet.</p>
              </Renderif>
              <Button
                disabled={!venueComments?.length || commentsLoading}
                onClick={() => {
                  sliceCount === -1 ? setSliceCount(3) : setSliceCount(-1);
                }}
                className={`mt-4 ${
                  commentsError ||
                  (!commentsError && !commentsLoading && !venueComments.length)
                    ? "hidden"
                    : ""
                } `}
              >
                <Renderif condition={sliceCount === -1}>Hide Comments</Renderif>
                <Renderif condition={sliceCount !== -1}>
                  Show All Comments
                </Renderif>
                <Renderif
                  condition={venueComments?.length && sliceCount !== -1}
                >
                  ({venueComments?.length})
                </Renderif>
              </Button>
            </div>
            <div className="mt-4 flex items-center">
              <input
                type="text"
                placeholder={`${
                  forceSignIn ? "You need to sign in to" : ""
                } Add a comment...`}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <Button
                // onClick={handleAddComment}
                disabled={forceSignIn}
                className="ml-2 "
              >
                Post
              </Button>
            </div>
          </div>
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
