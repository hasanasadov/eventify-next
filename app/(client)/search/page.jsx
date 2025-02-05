"use client";

import { QUERY_KEYS } from "@/constants/queryKeys";
import { searchEvents } from "@/services/events";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import EventItem from "../events/EventItem";
import { searchVenues } from "@/services/venues";
import VenueItem from "../venues/VenueItem";
import { Renderif } from "@/lib/utils";
import PulseSkeleton from "@/components/shared/PulseSkeleton";

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

  let {
    data: venuesData,
    isError: venuesError,
    isLoading: venuesLoading,
  } = useQuery({
    queryKey: [QUERY_KEYS.SEARCH_VENUES, searchtext],
    queryFn: () => searchVenues(searchtext),
  });

  if (eventsError || venuesError) {
    return (
      <div className="flex flex-col items-center gap-3 min-h-[70vh]">
        <h2 className="text-lg font-bold text-center">Something went wrong</h2>
        <p className="text-sm text-center">
          We could not fetch the data at the moment. Please try again later.
        </p>
      </div>
    );
  }
  return (
    <div className="min-h-[70vh] bg-gray-50  py-8 px-6 flex flex-col gap-10">
      <div className="flex  items-center justify-start">
        <h1 className="text-2xl text-center  font-bold text-[#075E54]">
          <Renderif condition={eventsData?.length > 0 || eventsLoading}>
            Found Events
          </Renderif>
          <Renderif condition={eventsData?.length === 0}>
            {" "}
            No Events Found
          </Renderif>
        </h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <Renderif condition={eventsLoading}>
          <PulseSkeleton className={"h-96 m-0"} />
          <PulseSkeleton className={"h-96 m-0"} />
          <PulseSkeleton className={"h-96 m-0"} />
          <PulseSkeleton className={"h-96 m-0"} />
        </Renderif>

        {eventsData?.map((item) => (
          <EventItem key={item.id} event={item} />
        ))}
      </div>

      <div className="flex py-4 items-center justify-start">
        <h1 className="text-2xl text-center  font-bold text-[#075E54]">
          <Renderif condition={venuesData?.length > 0 || venuesLoading}>
            Found Venues
          </Renderif>
          <Renderif condition={venuesData?.length === 0}>
            {" "}
            No Venues Found
          </Renderif>
        </h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <Renderif condition={venuesLoading}>
          <PulseSkeleton className={"h-96 m-0"} />
          <PulseSkeleton className={"h-96 m-0"} />
          <PulseSkeleton className={"h-96 m-0"} />
          <PulseSkeleton className={"h-96 m-0"} />
        </Renderif>
        {venuesData?.map((item) => (
          <VenueItem key={item.id} venue={item} />
        ))}
      </div>
    </div>
  );
};

export default SearchResult;
