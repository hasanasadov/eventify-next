"use client";

import { QUERY_KEYS } from "@/constants/queryKeys";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import EventItem from "../events/EventItem";
import VenueItem from "../venues/VenueItem";
import PulseSkeleton from "@/components/shared/PulseSkeleton";
import { searchEvents } from "@/actions/events";
import { searchVenues } from "@/actions/venues";
import { RenderIf } from "@/utils/RenderIf";
import IsError from "@/components/shared/IsError";

const SearchResult = () => {
  const searchtext =
    typeof window !== "undefined" ? localStorage.getItem("searchText") : "";

  const {
    data: eventsData,
    isError: eventsError,
    isLoading: eventsLoading,
  } = useQuery({
    queryKey: [QUERY_KEYS.SEARCH_EVENTS, searchtext],
    queryFn: () => searchEvents(searchtext),
  });

  const {
    data: venuesData,
    isError: venuesError,
    isLoading: venuesLoading,
  } = useQuery({
    queryKey: [QUERY_KEYS.SEARCH_VENUES, searchtext],
    queryFn: () => searchVenues(searchtext),
  });

  console.log("Events Data:", eventsData);
  console.log("Venues Data:", venuesData);

  if (eventsError || venuesError) {
    return <IsError text="search results" />;
  }
  return (
    <div className="min-h-[70vh] bg-gray-50 dark:bg-black   ">
      <div className="container mx-auto flex flex-col gap-10 py-8 px-6">
        <EventsSection eventsData={eventsData} eventsLoading={eventsLoading} />
        <VenuesSection venuesData={venuesData} venuesLoading={venuesLoading} />
      </div>
    </div>
  );
};

const EventsSection = ({ eventsData, eventsLoading }) => {
  return (
    <>
      <div className="flex  items-center justify-start">
        <h1 className="text-2xl text-center  font-bold text-[#075E54] dark:text-[#18f3d9]">
          <RenderIf condition={eventsData?.length > 0 || eventsLoading}>
            Found Events
          </RenderIf>
          <RenderIf condition={eventsData?.length === 0}>
            {" "}
            No Events Found
          </RenderIf>
        </h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <RenderIf condition={eventsLoading}>
          <PulseSkeleton className={"h-96 m-0"} />
          <PulseSkeleton className={"h-96 m-0"} />
          <PulseSkeleton className={"h-96 m-0"} />
          <PulseSkeleton className={"h-96 m-0"} />
        </RenderIf>

        {eventsData?.map((item) => (
          <EventItem key={item.id} event={item} />
        ))}
      </div>
    </>
  );
};

const VenuesSection = ({ venuesData, venuesLoading }) => {
  return (
    <>
      <div className="flex py-4 items-center justify-start">
        <h1 className="text-2xl text-center  font-bold text-[#075E54] dark:text-[#18f3d9]">
          <RenderIf condition={venuesData?.length > 0 || venuesLoading}>
            Found Venues
          </RenderIf>
          <RenderIf condition={venuesData?.length === 0}>
            {" "}
            No Venues Found
          </RenderIf>
        </h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <RenderIf condition={venuesLoading}>
          <PulseSkeleton className={"h-96 m-0"} />
          <PulseSkeleton className={"h-96 m-0"} />
          <PulseSkeleton className={"h-96 m-0"} />
          <PulseSkeleton className={"h-96 m-0"} />
        </RenderIf>
        {venuesData?.map((item) => (
          <VenueItem key={item.id} venue={item} />
        ))}
      </div>
    </>
  );
};

export default SearchResult;
