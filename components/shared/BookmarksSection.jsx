import { BookmarkRemove } from "@mui/icons-material";
import Link from "next/link";
import React from "react";

const BookmarksSection = ({ saveButton }) => {
  const bookmarks = [
    {
      id: 1,
      title: "Bookmarked Event 1",
      desc: "Bookmarked Event 1 Description",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf6zoRR_FPG7f2knECoYTgOuETejMYPg71vg&s",
    },
    {
      id: 2,
      title: "Bookmarked Event 2",
      desc: "Bookmarked Event 2 description",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf6zoRR_FPG7f2knECoYTgOuETejMYPg71vg&s",
    },
  ];

  return (
    <div
      className={`flex flex-col items-center gap-3 w-full overflow-y-auto h-full py-4 ${
        saveButton ? "flex" : "hidden"
      }`}
    >
      {bookmarks.map((item) => (
        <Link
          href={"/favorites/" + item.id}
          key={item.id}
          className="items-center p-4 gap-4 w-[90%] bg-green-300 rounded-lg relative"
        >
          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center overflow-hidden">
            <img
              src={item.img}
              alt={item.id}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col gap-1 items-start justify-center">
            <h1 className="font-semibold text-lg">{item.title}</h1>
            <p className="text-sm text-gray-700">{item.desc}</p>
          </div>
          <div className="absolute flex top-2 right-2">
            <button className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
              <BookmarkRemove className="h-4 w-4" />
            </button>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default BookmarksSection;
