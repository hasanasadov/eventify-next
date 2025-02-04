"use client";

import { getVenues } from "@/services/venues";
import { VenueSideBarItem } from "./VenueSideBarItem";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/queryKeys";

const VenuesSection = () => {
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
      <div className="flex flex-col items-center gap-3 w-full overflow-y-auto h-full pb-4">
        Loading...
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center gap-3 w-full overflow-y-auto h-full pb-4 px-2">
      {venues?.map((venue, idx) => (
        <VenueSideBarItem key={idx} venue={venue} />
      ))}
    </div>
  );
};

export default VenuesSection;
