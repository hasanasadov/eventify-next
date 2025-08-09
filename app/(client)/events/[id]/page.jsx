"use client";

import Map from "@/components/shared/Map";
import { Button } from "@/components/ui/button";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { Renderif } from "@/lib/utils";
import eventServices, { getEventById } from "@/actions/events";
import { FavoriteBorder } from "@mui/icons-material";
import { Favorite } from "@mui/icons-material";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { toast } from "sonner";

const EventDetail = () => {
  const { id } = useParams();
  const [isFavorite, setIsFavorite] = useState(false);
  const forceSignIn = true;
  const [newComment, setNewComment] = useState("");
  const [sliceCount, setSliceCount] = useState(3);

  const {
    data: event,
    isError,
    isLoading,
  } = useQuery({
    queryKey: [QUERY_KEYS.EVENTS, id],
    queryFn: () => getEventById(id),
  });

  const eventDate = new Date(event?.date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const eventStart = new Date(event?.start).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
  });
  const eventEnd = new Date(event?.end).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
  });

  console.log(event);
  const eventComments = event?.comments || [];
  const location = event?.location || {};

  console.log(location);

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="flex flex-col justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-600"></div>
          <p className="mt-4 text-green-500 font-semibold">
            Loading event details...
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
    <div className="p-6 my-6 container mx-auto bg-gradient-to-r bg-white rounded-lg border-2">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex items-center justify-between mb-6">
        <Link href="/events" className="text-sm text-blue-500 hover:underline">
          Back to list
        </Link>
      </div>
      <div className="flex flex-col md:flex-row gap-6">
        <Renderif condition={event?.imageURL}>
          <img
            src={event?.imageURL}
            alt={event?.title || "Event Poster"}
            className="w-full md:max-w-[50%]  h-full  object-contain rounded-lg border-2"
          />
        </Renderif>
        <Renderif condition={!event?.imageURL}>
          <div className="w-full md:w-1/2 h-64 bg-gray-300 rounded-lg border-2 flex items-center justify-center">
            <p className="text-gray-500">No Poster Available</p>
          </div>
        </Renderif>
        <div className="bg-white p-6 flex-1 flex flex-col justify-between gap-5 rounded-lg border-2  relative">
          <div className="space-y-4">
            <h1 className="text-4xl font-extrabold text-green-500 mb-4">
              {event?.title || "Event Title"}
              <span className="text-xl"> ({event?.type})</span>
            </h1>

            <div>
              <span
                className="
            text-xl font-semibold text-gray-800 mb-4
            "
              >
                Date :
              </span>
              <span> {eventDate || "Not specified"}</span>
            </div>

            <div className="flex items-center gap-4">
              <p>
                <span className="font-semibold ">From : </span>{" "}
                {eventStart || "Not specified"}
              </p>
              <p>
                <span className="font-semibold ">To : </span>{" "}
                {eventEnd || "Not specified"}
              </p>
            </div>

            <p className="text-md">
              {event?.description || "No description provided"}
            </p>
          </div>
          <div className="flex justify-center">
            <Renderif condition={event?.goto}>
              <Button
                onClick={() => window.open(event.goto, "_blank").focus()}
                className="bg-black hover:bg-opacity-40 text-white hover:bg-black text-xl font-sans p-5 md:w-1/2 w-full "
              >
                Buy Ticket
              </Button>
            </Renderif>
          </div>

          {/* <p>
            <span className="font-semibold text-yellow-600">Event Type:</span>{" "}
            {event?.type || "Type not specified"}
          </p> */}
          {/* <p>
            <span className="font-semibold text-red-600">Likes:</span>{" "}
            {event?.num_likes || 0}
          </p> */}
          {/* <div className="mt-6 absolute top-1 right-4">
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
      {location?.lat && location?.lng && (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Location
          </h2>
          <Map
            imageSource={event?.imageURL}
            title={event?.title}
            location={location}
          />
        </div>
      )}
      <div className="mt-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Comments</h2>
        <div className="space-y-4">
          <Renderif condition={eventComments?.length && !isError}>
            {eventComments?.slice(0, sliceCount).map((comment, index) => (
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

          <Renderif condition={isLoading}>
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
          <Renderif condition={!eventComments?.length && !isLoading}>
            <p className="text-gray-500">No comments yet.</p>
          </Renderif>
          <Button
            disabled={!eventComments?.length || isLoading}
            onClick={() => {
              sliceCount === -1 ? setSliceCount(3) : setSliceCount(-1);
            }}
            className={`mt-4 ${
              isError || (!isError && !isLoading && !eventComments.length)
                ? "hidden"
                : ""
            } `}
          >
            <Renderif condition={sliceCount === -1}>Hide Comments</Renderif>
            <Renderif condition={sliceCount !== -1}>Show All Comments</Renderif>
            <Renderif condition={eventComments?.length && sliceCount !== -1}>
              ({eventComments?.length})
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
    </div>
  );
};

export default EventDetail;
