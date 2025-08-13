"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { FavoriteBorder } from "@mui/icons-material";
import { Favorite } from "@mui/icons-material";
import EventItem from "../../events/EventItem";
import Map from "@/components/shared/Map";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { Button } from "@/components/ui/button";
import { getVenueById } from "@/actions/venues";
import { RenderIf } from "@/utils/RenderIf";
import { Container } from "@/components/ui/Container";
import IsError from "@/components/shared/IsError";
import LoadingComp from "@/components/shared/Loading";

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

  const venueComments = venue?.comments || [];
  const venueEvents = venue?.events || [];
  const venueLocation = venue?.location || {};

  if (isLoading) return <LoadingComp />;

  if (isError) return <IsError text="venue details" />;

  return (
    <div className="relative !text-white">
      <div
        id="event-bg"
        className="fixed top-0 !w-screen md:!h-screen h-full left-0 md:cover bg-center bg-no-repeat transition-all duration-500"
        style={{
          backgroundImage: `url(${venue?.imageURL || "/logo.png"})`,
          // backgroundColor: "#000", // black fill for empty areas
        }}
      ></div>

      {/* Dark overlay for readability */}
      <div className="fixed top-0 left-0 w-full h-full bg-black/40"></div>

      <Container>
        <div className="flex flex-col gap-6 ">
          <div className="flex items-center justify-between glass-button w-fit">
            <Link href="/venues" className="text-sm  px-3 py-1  ">
              Back to list
            </Link>
          </div>
          <div className="flex flex-col md:flex-row gap-6 md:gap-12">
            <RenderIf condition={venue?.imageURL}>
              <img
                src={venue?.imageURL || "/logo.png"}
                alt={venue?.title}
                className="w-full md:max-w-[50%] glass h-full  object-contain rounded-lg border-2"
              />
            </RenderIf>
            <RenderIf condition={!venue?.imageURL}>
              <div className="w-full md:w-1/2 h-64 bg-gray-300 rounded-lg border-2 flex items-center justify-center">
                <p className="text-gray-500">No Image Available</p>
              </div>
            </RenderIf>
            <div className="bg-white glass md:p-6 p-4 flex-1 rounded-lg border-2 space-y-6 relative">
              <div className="text-blue-500">
                <span className="text-3xl font-bold ">{venue?.title}</span>{" "}
                <span className="text-md!">({venue?.type})</span>
              </div>

              <div className="flex flex-col  justify-between gap-8 ">
                <div className="w-full md:w-1/2 space-y-2">
                  <h3 className="text-2xl font-semibold ">Working Hours</h3>
                  <p className="text-md text-gray-600 dark:text-white ">
                    Open: <span className="font-medium">{venue?.openAT}</span> -
                    Close: <span className="font-medium">{venue?.closeAT}</span>
                  </p>
                </div>
                <div>
                  <h2 className="text-2xl  text-gray-800 dark:text-white  mb-4 font-semibold">
                    Description
                  </h2>
                  <p className="text-md text-gray-600 dark:text-white ">
                    {venue?.description}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <LocationSection venueLocation={venueLocation} />
          <CommentsSection
            venueComments={venueComments}
            isLoading={isLoading}
            isError={isError}
          />
          <UpcomingEventsSection venueEvents={venueEvents} />
        </div>
      </Container>
    </div>
  );
};

const LocationSection = ({ venueLocation }) => {
  return (
    <div className="glass md:p-6 p-4 ">
      {venueLocation?.lat && venueLocation?.lng && (
        <div className=" ">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white  mb-4">
            Location
          </h2>
          <div className="flex flex-col lg:flex-row gap-6 ">
            <div className="glass w-full md:w-1/4 p-6 ">
              <div>
                <h3 className="text-lg font-semibold mb-2">Address</h3>
                <p className="text-sm text-gray-600 dark:text-white">
                  {venueLocation?.title || "Unknown"}
                </p>
                <p className="text-sm text-gray-600 dark:text-white">
                  {venueLocation?.lng || "Unknown"}
                  {" N"}
                </p>
                <p className="text-sm text-gray-600 dark:text-white">
                  {venueLocation?.lat || "Unknown"}
                  {" E"}
                </p>
              </div>
              <div className="flex items-center justify-end">
                <img
                  src={venueLocation?.imageURL}
                  alt={venueLocation?.title}
                  className=" glass w-40"
                />
              </div>
            </div>
            <div className="glass  w-full md:w-3/4 h-80 overflow-hidden ">
              <Map
                imageSource={venueLocation?.imageURL}
                title={venueLocation?.title}
                location={venueLocation}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const UpcomingEventsSection = ({ venueEvents }) => {
  return (
    <div className="glass md:p-6 p-4 ">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white  mb-4">
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
  );
};

const CommentsSection = ({ venueComments, isError, isLoading }) => {
  const forceSignIn = true;
  const [newComment, setNewComment] = useState("");
  const [sliceCount, setSliceCount] = useState(3);
  return (
    <div className="glass md:p-6 p-4 ">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white  mb-4">
        Comments
      </h2>
      <div className="space-y-4">
        <RenderIf condition={venueComments?.length && !isError}>
          {venueComments?.slice(0, sliceCount).map((comment, index) => (
            <div
              key={index}
              className="bg-gray-100 p-4 flex items-center justify-between rounded-lg border-2"
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
        <RenderIf condition={!venueComments?.length && !isLoading}>
          <p className="text-gray-500">No comments yet.</p>
        </RenderIf>
        <Button
          disabled={!venueComments?.length || isLoading}
          onClick={() => {
            sliceCount === -1 ? setSliceCount(3) : setSliceCount(-1);
          }}
          className={`mt-4 ${
            isError || (!isError && !isLoading && !venueComments.length)
              ? "hidden"
              : ""
          } `}
        >
          <RenderIf condition={sliceCount === -1}>Hide Comments</RenderIf>
          <RenderIf condition={sliceCount !== -1}>Show All Comments</RenderIf>
          <RenderIf condition={venueComments?.length && sliceCount !== -1}>
            ({venueComments?.length})
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
          className="flex-1 border glass-border border-gray-300 rounded-lg px-4 py-2 focus:!outline-none"
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

export default VenueDetail;
