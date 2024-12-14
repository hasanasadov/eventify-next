"use client";

import { useState, useEffect } from "react";
import { EventSideBarItem, EventSideBarItemSkeleton } from "./EventSideBarItem";
import { getEvents } from "@/services/events";
import LOGO from "@/assets/logo.png";

const EventsSection = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLinks = async () => {
      getEvents()
        .then((res) => {
          setEvents(res.data);
          setLoading(false);
        })
        .catch(() => {
          setEvents([
            {
              event: {
                title: "Server Error",
                description: "Please try again later",
                poster_image_link: LOGO,
              },
            },
          ]);
          setLoading(false);
        });
    };
    fetchLinks();
  }, []);

  return (
    <div
      className={`flex flex-col items-center gap-3 w-full overflow-y-auto h-full pb-4 `}
    >
      {loading ? (
        <>
          <EventSideBarItemSkeleton />
          <EventSideBarItemSkeleton />
        </>
      ) : (
        events.map((item, idx) => <EventSideBarItem key={idx} item={item} />)
      )}
    </div>
  );
};

export default EventsSection;
