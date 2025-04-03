"use client";

import { useQuery } from "@tanstack/react-query";
import { columns } from "./list/columns";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/shared/DataTable";
import LoadingComp from "@/components/shared/Loading";
import { QUERY_KEYS } from "@/constants/queryKeys";
import Link from "next/link";
import { paths } from "@/constants/paths";
import  eventServices  from "@/services/events";

const DashboardEventsPage = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [QUERY_KEYS.EVENTS],
    queryFn: eventServices.getEvents,
  });

  if (isLoading) {
    <LoadingComp />;
  }

  console.log(data);
  if (isError) {
    return (
      <div className="flex flex-col gap-1 jkustify-center items-center mt-32">
        <p className="text-2xl font-bold mb-3 text-orange-600">
          Something went wrong!
        </p>
        <Button className="mt-4">
          <Link to="">Go Back To Home</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="pt-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className=" text-orange-600 font-bold text-2xl ">Events</h2>
        <Button asChild>
          <Link className="!bg-orange-600" href={paths.DASHBOARD.EVENTS.CREATE}>
            Create Events
          </Link>
        </Button>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default DashboardEventsPage;
