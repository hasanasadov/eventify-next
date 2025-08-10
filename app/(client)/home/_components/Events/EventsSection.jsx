"use client";

import { QUERY_KEYS } from "@/constants/queryKeys";
import { EventSideBarItem } from "./EventSideBarItem";
import { useQuery } from "@tanstack/react-query";
import { getEvents } from "@/actions/events";
import PulseSkeleton from "@/components/shared/PulseSkeleton";
import IsError from "@/components/shared/IsError";

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
      <IsError text="events" />
    );
  }

  if (isLoading || !events) {
    return (
      <div className="flex flex-col gap-4 px-4">
        <PulseSkeleton />
        <PulseSkeleton />
        <PulseSkeleton />
      </div>
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
