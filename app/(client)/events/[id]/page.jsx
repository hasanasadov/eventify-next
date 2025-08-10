"use client";

import Map from "@/components/shared/Map";
import { Button } from "@/components/ui/button";
import { QUERY_KEYS } from "@/constants/queryKeys";
import eventServices, { getEventById } from "@/actions/events";
import { FavoriteBorder } from "@mui/icons-material";
import { Favorite } from "@mui/icons-material";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { toast } from "sonner";
import { RenderIf } from "@/utils/RenderIf";
import IsError from "@/components/shared/IsError";
import { Container } from "@/components/ui/Container";

const EventDetail = () => {
  const { id } = useParams();
  const [isFavorite, setIsFavorite] = useState(false);

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

  const eventComments = event?.comments || [];
  const location = event?.location || {};

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <div className="flex flex-col justify-center items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-600"></div>
          <p className="mt-4 text-green-500 font-semibold">
            Loading event details...
          </p>
        </div>
      </div>
    );

  if (isError) return <IsError />;

  return (
    <Container>
      <div className="flex flex-col gap-6 ">
        <div className="flex items-center justify-between glass-button w-fit">
          <Link href="/events" className="text-sm  px-3 py-1  ">
            Back to list
          </Link>
        </div>
        <div className="flex flex-col md:flex-row gap-6 md:gap-12">
          <RenderIf condition={event?.imageURL}>
            <img
              src={event?.imageURL}
              alt={event?.title || "Event Poster"}
              className="w-full md:max-w-[50%] glass h-full  object-contain rounded-lg border-2"
            />
          </RenderIf>
          <RenderIf condition={!event?.imageURL}>
            <div className="w-full md:w-1/2 h-64 bg-gray-300 rounded-lg border-2 flex items-center justify-center">
              <p className="text-gray-500">No Poster Available</p>
            </div>
          </RenderIf>
          <div className="bg-white dark:bg-black glass p-6 flex-1 flex flex-col justify-between gap-5 rounded-lg border-2  relative">
            <div className="space-y-4">
              <h1 className="text-4xl font-extrabold text-green-500 mb-4">
                {event?.title || "Event Title"}
                <span className="text-xl"> ({event?.type})</span>
              </h1>

              <div>
                <span
                  className="
            text-xl font-semibold text-gray-800 dark:text-white mb-4
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
              <RenderIf condition={event?.goto}>
                <Button
                  onClick={() => window.open(event.goto, "_blank").focus()}
                  variant="glass"
                  className="!bg-black dark:!bg-white  !text-white dark:!text-black  text-xl font-sans p-5 md:w-1/2 w-full "
                >
                  Buy Ticket
                </Button>
              </RenderIf>
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
        <LocationSection location={location} />
        <CommentsSection
          eventComments={eventComments}
          isError={isError}
          isLoading={isLoading}
        />
      </div>
    </Container>
  );
};

const LocationSection = ({ location }) => {
  return (
    <div>
      {location?.lat && location?.lng && (
        <div className="">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            Location
          </h2>
          <Map
            imageSource={location?.imageURL}
            title={location?.title}
            location={location}
          />
        </div>
      )}
    </div>
  );
};

const CommentsSection = ({ eventComments, isError, isLoading }) => {
  const forceSignIn = true;
  const [newComment, setNewComment] = useState("");
  const [sliceCount, setSliceCount] = useState(3);
  return (
    <div className="">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
        Comments
      </h2>
      <div className="space-y-4">
        <RenderIf condition={eventComments?.length && !isError}>
          {eventComments?.slice(0, sliceCount).map((comment, index) => (
            <div
              key={index}
              className="bg-gray-100 dark:bg-black p-4 flex items-center justify-between rounded-lg border-2"
            >
              <p>{comment.content}</p>
              <p className="text-gray-500 text-sm">{comment.author}</p>
            </div>
          ))}
        </RenderIf>

        <RenderIf condition={isLoading}>
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
        </RenderIf>
        <RenderIf condition={!eventComments?.length && !isLoading}>
          <p className="text-gray-500">No comments yet.</p>
        </RenderIf>
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
          <RenderIf condition={sliceCount === -1}>Hide Comments</RenderIf>
          <RenderIf condition={sliceCount !== -1}>Show All Comments</RenderIf>
          <RenderIf condition={eventComments?.length && sliceCount !== -1}>
            ({eventComments?.length})
          </RenderIf>
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
          className="flex-1 glass-border border border-gray-300 rounded-lg px-4 py-2 focus:outline-none"
        />
        <Button
          // onClick={handleAddComment}
          disabled={forceSignIn}
          className="ml-2 "
          variant="glass"
        >
          Post
        </Button>
      </div>
    </div>
  );
};

export default EventDetail;
