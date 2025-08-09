"use client";

import { useQuery } from "@tanstack/react-query";
import { columns } from "./list/columns";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/shared/DataTable";
import LoadingComp from "@/components/shared/Loading";
import { QUERY_KEYS } from "@/constants/queryKeys";
import Link from "next/link";
import { paths } from "@/constants/paths";
import   { getEvents }  from "@/actions/events";

const DashboardEventsPage = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [QUERY_KEYS.EVENTS],
    queryFn: getEvents,
  });

  if (isLoading) {
    <LoadingComp />;
  }

  if (isError) {
    return (
      <div className="flex flex-col gap-1 jkustify-center items-center mt-32">
        <p className="text-2xl font-bold mb-3 text-green-500">
          Something went wrong!
        </p>
        <Button className="mt-4">
          <Link to="">Go Back To Home</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="pt-6 ">
      <div className="flex justify-between items-center mb-6">
        <h2 className=" text-green-500 font-bold text-2xl ">Events</h2>
        <Button asChild>
          <Link className="!bg-green-700 hover:scale-105 " href={paths.DASHBOARD.EVENTS.CREATE}>
            Create Event
          </Link>
        </Button>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default DashboardEventsPage;
