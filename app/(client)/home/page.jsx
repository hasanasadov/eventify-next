"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import SideBarLeft from "@/app/(client)/home/_components/SideBarLeft";
import SideBarRight from "@/app/(client)/home/_components/SideBarRight";
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
    <div className="flex justify-between flex-col md:flex-row px-8 py-2 w-full ">
      <SideBarLeft />{" "}
      <div className="flex-grow min-h-[70vh]  glass rounded-xl overflow-hidden md:mx-6 my-6 md:my-0">
        <MainMap />
      </div>
      <SideBarRight />{" "}
    </div>
  );
}
