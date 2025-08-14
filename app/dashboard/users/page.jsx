// app/(dashboard)/dashboard/users/page.jsx
"use client";

import { useQuery } from "@tanstack/react-query";
import { columns } from "./list/columns";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/shared/DataTable";
import Link from "next/link";
import { paths } from "@/constants/paths";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { getUsers } from "@/actions/users";
import LoadingComp from "@/components/shared/Loading";

const DashboardUsersPage = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [QUERY_KEYS.USERS],
    queryFn: () => getUsers(),
  });

  if (isLoading) {
    return <LoadingComp />; 
  }

  if (isError) {
    return (
      <div className="flex flex-col gap-1 justify-center items-center mt-32">
        <p className="text-2xl font-bold mb-3 text-red-500">
          Something went wrong!
        </p>
        <Button asChild className="mt-4">
          <Link href="/">Go Back To Home</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="pt-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-green-500 font-bold text-2xl">Users</h2>

        <Button asChild>
          <Link
            className="!bg-green-700 glass-button text-white hover:scale-105"
            href={paths?.DASHBOARD?.USERS?.CREATE || "/dashboard/users/create"}
          >
            Create User
          </Link>
        </Button>
      </div>

      <DataTable columns={columns} data={data || []} />
    </div>
  );
};

export default DashboardUsersPage;
