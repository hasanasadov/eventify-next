"use client";

import { VenueSideBarItem } from "./VenueSideBarItem";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { getVenues } from "@/actions/venues";
import IsError from "@/components/shared/IsError";
import IsNone from "@/components/shared/IsNone";
import LoadingComp from "@/components/shared/Loading";

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

  if (isLoading) {
    return <LoadingComp />;
  }

  if (!venues?.length) {
    return <IsNone text="venues" />;
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
