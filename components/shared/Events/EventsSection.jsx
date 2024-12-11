"use client";

import { useState, useEffect } from "react";
import { BASE_URL } from "@/constants";
import { EventSideBarItem, EventSideBarItemSkeleton } from "./EventSideBarItem";

const EventsSection = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const res = await fetch(`${BASE_URL}/events`);
        const data = await res.json();
        setEvents(data);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setLoading(false);
      }
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
