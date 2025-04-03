import React from "react";
import { SideBarItems } from "./_components/DashboardSidebar";
import Link from "next/link";

const DashboardMainPage = () => {
  return (
    <>
      <h2 className="text-orange-600 font-bold text-2xl py-6 ">
        Dashboard Main Page
      </h2>
      <div className="grid grid-cols-2 gap-4">
        {SideBarItems.map((item) => (
          <Link href={item.url} key={item.url}>
            <div className="flex items-center justify-center h-16 border  border-orange-400 ">
              <item.icon className="w-6 h-6 mr-2" />
              <span>{item.title}</span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default DashboardMainPage;
