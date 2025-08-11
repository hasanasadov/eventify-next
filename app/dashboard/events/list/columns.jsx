import { paths } from "@/constants/paths";
import { Edit2Icon, Trash2Icon } from "lucide-react";
import Link from "next/link";
export const columns = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "imageURL",
    header: "Image",
    cell: (data) => {
      return (
        <img
          src={data.row.original.imageURL}
          alt="Event Picture"
          className="w-10 h-10 object-cover rounded-lg"
        />
      );
    },
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "location",
    header: "Location",
    cell: (data) => {
      return data.row.original.location?.title || "No Location";
    },
  },
  {
    accessorKey: "start",
    header: "Start",
  },
  {
    accessorKey: "end",
    header: "Finish",
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: (data) => {
      return new Date(data.row.original.date).toLocaleDateString();
    },
  },
  {
    accessorKey: "venueId",
    header: "Venue ID",
  },
  {
    accessorKey: "",
    header: "Actions",
    cell: (data) => {
      return (
        <div className=" text-yellow-500 flex items-center justify-center gap-4">
          <Link href={paths.DASHBOARD.EVENTS.EDIT(data.row.original.id)}>
            <Edit2Icon className="w-4 h-4 hover:scale-110" />
          </Link>
          <Link href={paths.DASHBOARD.EVENTS.DELETE(data.row.original.id)}>
            <Trash2Icon className="w-4 h-4 text-red-600 hover:scale-110" />
          </Link>
        </div>
      );
    },
  },
];
