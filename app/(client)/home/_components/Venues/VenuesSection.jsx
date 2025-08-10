"use client";

import { VenueSideBarItem } from "./VenueSideBarItem";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { getVenues } from "@/actions/venues";
import PulseSkeleton from "@/components/shared/PulseSkeleton";
import IsError from "@/components/shared/IsError";

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
    return <IsError text="venues" />;
  }

  if (isLoading || !venues) {
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
      {venues?.map((venue, idx) => (
        <VenueSideBarItem key={idx} venue={venue} />
      ))}
    </div>
  );
};

export default VenuesSection;
