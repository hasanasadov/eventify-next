"use client";

import { useState, useEffect } from "react";
import { EventSideBarItem, EventSideBarItemSkeleton } from "./EventSideBarItem";
import { getEvents } from "@/services/events";

const EventsSection = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchLinks = async () => {
      getEvents()
        .then((res) => {
          setEvents(res.data);
          setLoading(false);
          setError(false);
        })
        .catch(() => {
          setEvents([]);
          setLoading(false);
          setError(true);
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
      ) : error ? (
        <div className="flex flex-col items-center gap-3">
          <h2 className="text-lg font-bold text-center">
            Something went wrong
          </h2>
          <p className="text-sm text-center">
            We couldn't fetch the events at the moment. Please try again later.
          </p>
        </div>
      ) : (
        events.map((item, idx) => <EventSideBarItem key={idx} item={item} />)
      )}
    </div>
  );
};

export default EventsSection;
