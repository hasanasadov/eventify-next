"use client";

import { useState, useEffect } from "react";
import { BASE_URL } from "@/constants";

import EventSideBarItem from "./EventSideBarItem";
const EventsSection = ({ eventsButton }) => {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    const fetchLinks = async () => {
      const res = await fetch(`${BASE_URL}/events`);
      const data = await res.json();
      setEvents(data);
    };
    fetchLinks();
  }, []);

  return (
    <div
      className={`flex flex-col items-center gap-3 w-full overflow-y-auto h-full py-4  ${
        eventsButton ? "flex" : "hidden"
      }`}
    >
      {events.map((item, idx) => (
        <EventSideBarItem key={idx} item={item} />
      ))}
    </div>
  );
};

export default EventsSection;
