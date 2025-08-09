"use client";

import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/queryKeys";
import VenueItem from "./VenueItem";
import PulseSkeleton from "@/components/shared/PulseSkeleton";
import { getVenues } from "@/actions/venues";

const VenuesPage = () => {
  const {
    data: venues,
    isError,
    isLoading,
  } = useQuery({
    queryKey: [QUERY_KEYS.VENUES],
    queryFn: getVenues,
  });

  if (isError) {
    return (
      <div className="flex flex-col items-center gap-3 min-h-[70vh]">
        <h2 className="text-lg font-bold text-center">Something went wrong</h2>
        <p className="text-sm text-center">
          We could not fetch the venues at the moment. Please try again later.
        </p>
      </div>
    );
  }

  console.log("venuespage", venues);
  if (isLoading || !venues) {
    return (
      <div className="min-h-[70vh] bg-gray-50 dark:bg-black py-8 px-6">
        <div className="flex  items-center justify-center">
          <h1 className="text-4xl text-center pb-8 mr-4 font-bold text-[#075E54]">
            Explore Venues
          </h1>
        </div>
        <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:grid-cols-4 w-full overflow-y-auto h-full pb-4">
          <PulseSkeleton className={"h-96 m-0"} />
          <PulseSkeleton className={"h-96 m-0"} />
          <PulseSkeleton className={"h-96 m-0"} />
          <PulseSkeleton className={"h-96 m-0"} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[70vh] bg-gray-50 dark:bg-black py-8 px-6">
      <div className="flex  items-center justify-center">
        <h1 className="text-4xl text-center pb-8 font-bold text-[#075E54]">
          Explore venues
        </h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {venues?.map((item) => (
          <VenueItem key={item.id} venue={item} />
        ))}
      </div>
    </div>
  );
};

export default VenuesPage;
