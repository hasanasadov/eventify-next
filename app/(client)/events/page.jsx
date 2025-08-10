"use client";

import EventItem from "./EventItem";
import { getEvents } from "@/actions/events";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/queryKeys";
import PulseSkeleton from "@/components/shared/PulseSkeleton";
import { Button } from "@/components/ui/button";

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
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] gap-4 p-4">
        <svg
          className="w-12 h-12 text-red-500 mb-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 48 48"
        >
          <circle cx="24" cy="24" r="22" strokeWidth="4" />
          <line x1="16" y1="16" x2="32" y2="32" strokeWidth="4" />
          <line x1="32" y1="16" x2="16" y2="32" strokeWidth="4" />
        </svg>
        <h2 className="text-lg font-semibold text-center text-red-600">
          Unable to load venues
        </h2>
        <p className="text-sm text-center text-gray-500">
          There was a problem fetching the venues. Please check your connection
          and try again.
        </p>
        <Button
          variant="glass"
          className="mt-2 px-4 py-2 !bg-red-500 text-white rounded hover:!bg-red-600 transition"
          onClick={() => window.location.reload()}
        >
          Retry
        </Button>
      </div>
    );
  }
  if (isLoading || !events) {
    return (
      <div className="min-h-[70vh] bg-gray-50 dark:bg-black  py-8 px-6">
        <div className="container mx-auto">
          <div className="flex  items-center justify-center">
            <h1 className="text-4xl text-center pb-8 font-bold text-[#075E54] dark:text-[#18f3d9] dark:text-[#18f3d9]">
              Explore Events
            </h1>
          </div>
          <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:grid-cols-4 w-full overflow-y-auto h-full pb-4">
            <PulseSkeleton className={"h-96 m-0"} />
            <PulseSkeleton className={"h-96 m-0"} />
            <PulseSkeleton className={"h-96 m-0"} />
            <PulseSkeleton className={"h-96 m-0"} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[70vh] bg-gray-50 dark:bg-black py-8 px-6">
      <div className="container mx-auto">
        <div className="flex  items-center justify-center">
          <h1 className="text-4xl text-center pb-8 font-bold text-[#075E54] dark:text-[#18f3d9] dark:text-[#18f3d9]">
            Explore Events
          </h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {events.map((item) => (
            <EventItem key={item.id} event={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
