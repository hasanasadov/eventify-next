import { paths } from "@/constants/paths";
import { Edit2Icon, Trash2Icon } from "lucide-react";
import Link from "next/link";
export const columns = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "image_1_link",
    header: "Image",
    cell: (data) => {
      return (
        <img
          src={data.row.original.image_1_link}
          alt="V"
          className="w-10 h-10 object-cover rounded-lg"
        />
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "work_hours_open",
    header: "Open",
  },
  {
    accessorKey: "work_hours_close",
    header: "Close",
  },
  {
    accessorKey: "venue_type",
    header: "Type",
  },
  {
    accessorKey: "",
    header: "Actions",
    cell: (data) => {
      return (
        <div className=" text-yellow-500 flex items-center justify-center gap-4">
          <Link href={paths.DASHBOARD.VENUES.EDIT(data.row.original.id)}>
            <Edit2Icon className="w-4 h-4 hover:scale-110" />
          </Link>
          <Link href={paths.DASHBOARD.VENUES.DELETE(data.row.original.id)}>
            <Trash2Icon className="w-4 h-4 text-red-600 hover:scale-110" />
          </Link>
        </div>
      );
    },
  },
];
