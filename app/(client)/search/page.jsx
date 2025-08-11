"use client";

import { QUERY_KEYS } from "@/constants/queryKeys";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import EventItem from "../events/EventItem";
import VenueItem from "../venues/VenueItem";
import { searchEvents } from "@/actions/events";
import { searchVenues } from "@/actions/venues";
import { RenderIf } from "@/utils/RenderIf";
import IsError from "@/components/shared/IsError";
import { Container } from "@/components/ui/Container";
import { InputWithButton } from "@/components/ui/search";
import { useSearchParams } from "next/navigation";

const SearchResult = () => {
  const searchParams = useSearchParams();
  const searchtext = searchParams.get("s") || "";

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

  if (eventsError || venuesError) {
    return <IsError text="search results" />;
  }
  return (
    <Container className="flex flex-col space-y-4 ">
      <InputWithButton />
      <EventsSection eventsData={eventsData} eventsLoading={eventsLoading} />
      <VenuesSection venuesData={venuesData} venuesLoading={venuesLoading} />
    </Container>
  );
};

const EventsSection = ({ eventsData, eventsLoading }) => {
  if (eventsLoading) {
    return (
      <div className="glass p-4">
        <div className="flex  items-center justify-start">
          <h1 className="text-2xl text-center  font-bold text-[#075E54] dark:text-[#18f3d9]">
            Searching Events...
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="glass p-4 pb-0">
      <div className="flex  items-center justify-start">
        <h1 className="text-2xl text-center  font-bold text-[#075E54] dark:text-[#18f3d9]">
          <RenderIf condition={eventsData?.length > 0}>Found Events</RenderIf>
          <RenderIf condition={eventsData?.length === 0}>
            {" "}
            No Events Found
          </RenderIf>
        </h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-4">
        {eventsData?.map((item) => (
          <EventItem key={item.id} event={item} />
        ))}
      </div>
    </div>
  );
};

const VenuesSection = ({ venuesData, venuesLoading }) => {
  if (venuesLoading) {
    return (
      <div className="glass p-4">
        <div className="flex  items-center justify-start">
          <h1 className="text-2xl text-center  font-bold text-[#075E54] dark:text-[#18f3d9]">
            Searching Venues...
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="glass p-4 pb-0">
      <div className="flex items-center justify-start">
        <h1 className="text-2xl text-center  font-bold text-[#075E54]  dark:text-[#18f3d9]">
          <RenderIf condition={venuesData?.length > 0}>Found Venues</RenderIf>
          <RenderIf condition={venuesData?.length === 0}>
            {" "}
            No Venues Found
          </RenderIf>
        </h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-4">
        {venuesData?.map((item) => (
          <VenueItem key={item.id} venue={item} />
        ))}
      </div>
    </div>
  );
};

export default SearchResult;
