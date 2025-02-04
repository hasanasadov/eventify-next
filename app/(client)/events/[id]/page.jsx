"use client";

import Map from "@/components/shared/Map";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { getEventById, getEventComments } from "@/services/events";
import { FavoriteBorder } from "@mui/icons-material";
import { Favorite } from "@mui/icons-material";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { toast } from "sonner";

const EventDetail = () => {
  const { id } = useParams();
  const [isFavorite, setIsFavorite] = useState(false);

  const {
    data: eventData,
    isError,
    isLoading,
  } = useQuery({
    queryKey: [QUERY_KEYS.EVENT, id],
    queryFn: () => getEventById(id),
  });

  const {
    data: eventComments,
    isError: commentsError,
    isLoading: commentsLoading,
  } = useQuery({
    queryKey: [QUERY_KEYS.EVENT_COMMENTS, id],
    queryFn: () => getEventComments(id),
  });

  console.log(eventData, eventComments);
  const [newComment, setNewComment] = useState("");

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

  const { event, location } = eventData || {};

  return (
    <div className="p-6 my-6 container mx-auto bg-gradient-to-r bg-white rounded-lg border-2">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex flex-col md:flex-row gap-6">
        {event?.poster_image_link ? (
          <img
            src={event.poster_image_link}
            alt={event?.title || "Event Poster"}
            className="w-full md:w-1/2 max-h-[500px] object-cover rounded-lg border-2"
          />
        ) : (
          <div className="w-full md:w-1/2 h-64 bg-gray-300 rounded-lg border-2 flex items-center justify-center">
            <p className="text-gray-500">No Poster Available</p>
          </div>
        )}
        <div className="bg-white p-6 flex-1 rounded-lg border-2 space-y-4 relative">
          <h1 className="text-4xl font-extrabold text-green-500 mb-4">
            {event?.title || "Event Title"}
          </h1>
          <p>
            <span className="font-semibold text-blue-600">Date:</span>{" "}
            {event?.date
              ? new Date(event.date).toLocaleDateString()
              : "No date available"}
          </p>
          <p>
            <span className="font-semibold text-purple-600">Start Time:</span>{" "}
            {event?.start || "Not specified"}
          </p>
          <p>
            <span className="font-semibold text-pink-600">Finish Time:</span>{" "}
            {event?.finish || "Not specified"}
          </p>
          <p>
            <span className="font-semibold text-green-600">Description:</span>{" "}
            {event?.description || "No description provided"}
          </p>
          <p>
            <span className="font-semibold text-yellow-600">Event Type:</span>{" "}
            {event?.event_type || "Type not specified"}
          </p>
          <p>
            <span className="font-semibold text-red-600">Likes:</span>{" "}
            {event?.num_likes || 0}
          </p>
          <div className="mt-6 absolute top-1 right-4">
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
      {location?.lat && location?.lng && (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Location
          </h2>
          <Map
            imageSource={event?.poster_image_link}
            title={event?.title}
            location={location}
          />
        </div>
      )}
      <div className="mt-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Comments</h2>
        <div className="space-y-4">
          {eventComments?.length > 0 ? (
            comments.map((comment, index) => (
              <div key={index} className="bg-gray-100 p-4 rounded-lg border-2">
                <p>{comment.comment}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No comments yet.</p>
          )}
        </div>
        <div className="mt-4 flex items-center">
          <input
            type="text"
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            // onClick={handleAddComment}
            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
