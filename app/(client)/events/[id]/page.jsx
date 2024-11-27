"use client";

import { BASE_URL } from "@/constants";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const EventDetail = () => {
  const params = useParams();
  const { id } = params;
  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const res = await fetch(`${BASE_URL}/events/${id}`);
        if (!res.ok) {
          throw new Error("Failed to fetch event details. Please try again.");
        }
        const event = await res.json();
        setEventData(event);

        const commentsRes = await fetch(`${BASE_URL}/events/${id}/comments`);
        if (commentsRes.ok) {
          const commentsData = await commentsRes.json();
          setComments(commentsData);
        }
      } catch (err) {
        setError(err.message);
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [id]);

  const handleAddComment = async () => {
    if (!newComment.trim()) {
      toast.error("Comment cannot be empty!");
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/events/${id}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comment: newComment }),
      });

      if (!res.ok) throw new Error("Failed to add comment.");

      const comment = await res.json();
      setComments((prev) => [...prev, comment]);
      setNewComment("");
      toast.success("Comment added!");
    } catch (err) {
      toast.error(err.message);
    }
  };

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
            Loading event details...
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

  const { event, location } = eventData || {};

  return (
    <div className="p-6 max-w-5xl mx-auto bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 rounded-lg shadow-lg">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="flex flex-col md:flex-row gap-6">
        {event?.poster_image_link ? (
          <img
            src={event.poster_image_link}
            alt={event?.title || "Event Poster"}
            className="w-full md:w-1/2 max-h-[500px] object-cover rounded-lg shadow-xl"
          />
        ) : (
          <div className="w-full md:w-1/2 h-64 bg-gray-300 rounded-lg shadow-lg flex items-center justify-center">
            <p className="text-gray-500">No Poster Available</p>
          </div>
        )}
        <div className="bg-white p-6 flex-1 rounded-lg shadow-lg space-y-4">
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
          <button
            onClick={toggleFavorite}
            className={`mt-4 px-4 py-2 rounded text-white transition ${isFavorite
              ? "bg-red-500 hover:bg-red-600"
              : "bg-blue-500 hover:bg-blue-600"
              }`}
          >
            {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
          </button>
        </div>
      </div>
      {location?.lat && location?.lng && (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Location
          </h2>
          <iframe
            title="Google Map"
            src={`https://www.google.com/maps/embed/v1/view?key=YOUR_API_KEY&center=${location.lat},${location.lng}&zoom=14`}
            className="w-full h-96 rounded-lg shadow-md"
            allowFullScreen
          />
        </div>
      )}
      <div className="mt-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Comments</h2>
        <div className="space-y-4">
          {comments.length > 0 ? (
            comments.map((comment, index) => (
              <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-md">
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
            onClick={handleAddComment}
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
