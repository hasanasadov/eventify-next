"use client";

import { QUERY_KEYS } from "@/constants/queryKeys";
import { EventSideBarItem } from "./EventSideBarItem";
import { getEvents } from "@/services/events";
import { useQuery } from "@tanstack/react-query";
import PulseSkeleton from "../PulseSkeleton";

const EventsSection = () => {
  const {
    data: events,
    isError,
    isLoading,
  } = useQuery({
    queryKey: [QUERY_KEYS.EVENTS],
    queryFn: getEvents,
  });

  if (isError) {
    return (
      <div className="flex flex-col items-center gap-3">
        <h2 className="text-lg font-bold text-center">Something went wrong</h2>
        <p className="text-sm text-center">
          We could not fetch the events at the moment. Please try again later.
        </p>
      </div>
    );
  }

  if (isLoading || !events) {
    return (
      <>
        <PulseSkeleton />
        <PulseSkeleton />
        <PulseSkeleton />
      </>
    );
  }

  return (
    <div className="flex flex-col items-center gap-3 w-full overflow-y-auto h-full pb-4 ">
      {events.map((item, idx) => (
        <EventSideBarItem key={idx} item={item} />
      ))}
    </div>
  );
};

export default EventsSection;
