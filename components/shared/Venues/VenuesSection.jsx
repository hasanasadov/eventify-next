"use client";

import { VenueSideBarItem } from "./VenueSideBarItem";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/queryKeys";
import PulseSkeleton from "../PulseSkeleton";
import { getVenues } from "@/actions/venues";

const VenuesSection = () => {
  const {
    data: venues,
    isError,
    isLoading,
  } = useQuery({
    queryKey: [QUERY_KEYS.VENUES],
    queryFn: getVenues,
  });

  console.log(venues);

  if (isError) {
    return (
      <div className="flex flex-col items-center gap-3">
        <h2 className="text-lg font-bold text-center">Something went wrong</h2>
        <p className="text-sm text-center">
          We could not fetch the venues at the moment. Please try again later.
        </p>
      </div>
    );
  }

  if (isLoading || !venues) {
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
      {venues?.map((venue, idx) => (
        <VenueSideBarItem key={idx} venue={venue} />
      ))}
    </div>
  );
};

export default VenuesSection;
