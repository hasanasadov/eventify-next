import { TimelapseOutlined } from "@mui/icons-material";
import Link from "next/link";
import React from "react";

const SideBarRight = () => {
  const links = [
    {
      id: 1,
      title: "Upcoming Event 1",
      desc: "Upcoming Event 1 Description",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf6zoRR_FPG7f2knECoYTgOuETejMYPg71vg&s",
    },
    {
      id: 2,
      title: "Upcoming Event 2",
      desc: "Upcoming Event 2 Description",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf6zoRR_FPG7f2knECoYTgOuETejMYPg71vg&s",
    },
    {
      id: 3,
      title: "Upcoming Event 3",
      desc: "Upcoming Event 3 Description",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf6zoRR_FPG7f2knECoYTgOuETejMYPg71vg&s",
    },
    {
      id: 4,
      title: "Upcoming Event 4",
      desc: "Upcoming Event 4 Description",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf6zoRR_FPG7f2knECoYTgOuETejMYPg71vg&s",
    },
    {
      id: 5,
      title: "Upcoming Event 5",
      desc: "Upcoming Event 5 Description",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf6zoRR_FPG7f2knECoYTgOuETejMYPg71vg&s",
    },
    {
      id: 6,
      title: "Upcoming Event 6",
      desc: "Upcoming Event 6 Description",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf6zoRR_FPG7f2knECoYTgOuETejMYPg71vg&s",
    },

    {
      id: 7,
      title: "Upcoming Event 7",
      desc: "Upcoming Event 7 Description",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf6zoRR_FPG7f2knECoYTgOuETejMYPg71vg&s",
    },
    {
      id: 8,
      title: "Upcoming Event 8",
      desc: "Upcoming Event 8 Description",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf6zoRR_FPG7f2knECoYTgOuETejMYPg71vg&s",
    },
  ];
  return (
    <div className="h-[40vh] md:h-[80vh] md:w-1/4 w-full bg-gray-100 rounded-3xl overflow-hidden shadow-lg">
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-center h-16 w-full border-b border-gray-700">
          <h1 className="text-2xl font-extrabold text-green-700">
            Upcoming Events
          </h1>
        </div>
        <div className="flex flex-col items-center gap-3 w-full overflow-y-auto h-full py-4">
          {links.map((item) => (
            <Link
              href={"/events/" + item.id}
              key={item.id}
              className="flex items-center p-4 gap-4 w-[90%] bg-gray-400 rounded-lg relative"
            >
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center overflow-hidden">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col gap-1 items-start justify-center">
                <h1 className="font-semibold text-lg">{item.title}</h1>
                <p className="text-sm text-gray-700">{item.desc}</p>
              </div>
              <div className="absolute flex top-2 right-2">
                <button className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                  <TimelapseOutlined className="h-4 w-4" />
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SideBarRight;
