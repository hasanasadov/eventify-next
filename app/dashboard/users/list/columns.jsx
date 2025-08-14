// app/(dashboard)/dashboard/users/list/columns.jsx
"use client";

import { paths } from "@/constants/paths";
import { format } from "date-fns";
import { Trash2Icon } from "lucide-react";
import { Edit2Icon } from "lucide-react";
import Link from "next/link";
// əgər DataTable Tanstack-ın ColumnDef istifadə edirsə:
export const columns = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => row.original.name || "—",
  },
  {
    accessorKey: "username",
    header: "Username",
    cell: ({ row }) => row.original.username || "—",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => row.original.role || "USER",
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => {
      const d = row.original.createdAt
        ? new Date(row.original.createdAt)
        : null;
      return d ? format(d, "yyyy-MM-dd HH:mm") : "—";
    },
  },
  {
    accessorKey: "",
    header: "Actions",
    cell: (data) => {
      return (
        <div className=" text-yellow-500 flex items-center justify-start gap-4">
          <Link href={paths.DASHBOARD.USERS.EDIT(data.row.original.id)}>
            <Edit2Icon className="w-4 h-4 hover:scale-110" />
          </Link>
          <Link href={paths.DASHBOARD.USERS.DELETE(data.row.original.id)}>
            <Trash2Icon className="w-4 h-4 text-red-600 hover:scale-110" />
          </Link>
        </div>
      );
    },
  },
];
