"use client";

import EventItem from "./EventItem";
import { getEvents } from "@/actions/events";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/queryKeys";
import PulseSkeleton from "@/components/shared/PulseSkeleton";
import { Container } from "@/components/ui/Container";
import IsError from "@/components/shared/IsError";

const EventsPage = () => {
  const {
    data: events,
    isError,
    isLoading,
  } = useQuery({
    queryKey: [QUERY_KEYS.EVENTS],
    queryFn: getEvents,
  });

  console.log("Events:", events);

  if (isError) {
    return <IsError text="events" />;
  }
  if (isLoading || !events) {
    return (
      <Container>
        <div className="flex  items-center justify-center">
          <h1 className="text-4xl text-center pb-8 font-bold text-[#075E54]  dark:text-[#18f3d9]">
            Explore Events
          </h1>
        </div>
        <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:grid-cols-4 w-full overflow-y-auto h-full pb-4">
          <PulseSkeleton className={"h-96 m-0"} />
          <PulseSkeleton className={"h-96 m-0"} />
          <PulseSkeleton className={"h-96 m-0"} />
          <PulseSkeleton className={"h-96 m-0"} />
        </div>
      </Container>
    );
  }

  return (
    <Container className="">
      <div className="flex  items-center justify-center">
        <h1 className="text-4xl hidden md:block text-center pb-4 font-bold text-[#075E54] dark:text-green-500">
          Explore Events
        </h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {events.map((item) => (
          <EventItem key={item.id} event={item} />
        ))}
      </div>
    </Container>
  );
};

export default EventsPage;
