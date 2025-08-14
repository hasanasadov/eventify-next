"use client";

import EventItem from "@/app/(client)/events/EventItem";
import React from "react";

export default function VenueUpcomingEvents({ venueEvents }) {
  return (
    <section
      aria-labelledby="venue-upcoming-heading"
      className="glass md:p-6 p-4 rounded-xl"
    >
      <h2
        id="venue-upcoming-heading"
        className="text-2xl font-semibold text-white mb-4"
      >
        Upcoming Events
      </h2>

      {venueEvents?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {venueEvents.map((item) => (
            <EventItem key={item.id} event={item} />
          ))}
        </div>
      ) : (
        <p className="text-white/90">No events found for this venue.</p>
      )}
    </section>
  );
}
