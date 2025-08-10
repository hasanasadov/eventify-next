"use client";

import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/queryKeys";
import VenueItem from "./VenueItem";
import PulseSkeleton from "@/components/shared/PulseSkeleton";
import { getVenues } from "@/actions/venues";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/Container";
import IsError from "@/components/shared/IsError";

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
    return <IsError text="venues" />;
  }

  console.log("venuespage", venues);
  if (isLoading || !venues) {
    return (
      <Container>
        <div className="flex items-center justify-center">
          <h1 className="text-4xl text-center pb-8 mr-4 font-bold text-[#075E54] dark:text-[#18f3d9]">
            Explore Venues
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
    <Container>
      <div className="flex  items-center justify-center">
        <h1 className="text-4xl text-center hidden md:block pb-8 font-bold text-[#075E54] dark:text-[#18f3d9]">
          Explore Venues
        </h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {venues?.map((item) => (
          <VenueItem key={item.id} venue={item} />
        ))}
      </div>
    </Container>
  );
};

export default VenuesPage;
