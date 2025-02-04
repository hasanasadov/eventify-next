"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import SideBarLeft from "@/components/shared/SideBarLeft";
import SideBarRight from "@/components/shared/SideBarRight";
import MainMap from "@/components/shared/MainMap";
// import { useAppSelector } from "@/hooks/redux";
// import { selectAuth } from "@/store/auth";

export default function HomePage() {
  // const { user, loading } = useAppSelector(selectAuth);
  // console.log("user", user);

  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth <= 768) {
      router.replace("/events");
    }
  }, [router]);

  return (
    <div className="flex justify-between flex-col md:flex-row p-8 w-full bg-gray-50">
      <SideBarLeft />{" "}
      <div className="flex-grow min-h-[70vh] rounded-xl overflow-hidden md:mx-6 my-6 md:my-0">
        <MainMap />
      </div>
      <SideBarRight />{" "}
    </div>
  );
}
