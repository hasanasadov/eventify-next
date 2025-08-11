"use client";

import EventItem from "./EventItem";
import { getEvents } from "@/actions/events";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/queryKeys";
import PulseSkeleton from "@/components/shared/PulseSkeleton";
import { Container } from "@/components/ui/Container";
import IsError from "@/components/shared/IsError";
import HorizontalScroller from "@/components/shared/HorizontalScroller";
import HeroSlider from "@/components/shared/HeroSlider";

// If you have a global util, move these there
const titleCase = (s) =>
  s
    .replace(/[-_]+/g, " ")
    .replace(
      /\w\S*/g,
      (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
    );

const EventsPage = () => {
  const {
    data: events,
    isError,
    isLoading,
  } = useQuery({
    queryKey: [QUERY_KEYS.EVENTS],
    queryFn: getEvents,
  });

  if (isError) return <IsError text="events" />;

  if (isLoading || !events) {
    return (
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-4">
          <PulseSkeleton className="h-96 m-0" />
          <PulseSkeleton className="h-96 m-0" />
          <PulseSkeleton className="h-96 m-0" />
          <PulseSkeleton className="h-96 m-0" />
        </div>
      </Container>
    );
  }

  // ---- group by `type` dynamically ----
  const grouped = events.reduce((acc, ev) => {
    const key = ev.type && ev.type.trim() ? ev.type : "other";
    (acc[key] ||= []).push(ev);
    return acc;
  }, {});

  // Optional: order sections by largest count first (like “highlights” feel)
  const sections = Object.entries(grouped).sort(
    (a, b) => b[1].length - a[1].length
  ); // [ [type, Event[]], ... ]

  const featured = [...events]
    .filter((e) => e.imageURL) // must have a wide visual
    .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())
    .slice(0, 5);

  const slides = featured.map((e) => ({
    id: e.id,
    title: e.title,
    subtitle: e.venue?.title ?? "",
    date: e.start,
    ctaHref: `/events/${e.id}`, // change to your route (slug if you have it)
    ctaText: "Get Tickets",
    imageUrl: e.imageURL,
    badgeUrl: e.badgeUrl ?? e.organizer?.logo ?? undefined,
  }));
  return (
    <Container className="space-y-12">
      <HeroSlider slides={slides} />

      {sections.map(([type, list]) => (
        <section key={type} className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-semibold">
            {titleCase(type)}
          </h2>

          <HorizontalScroller>
            {list.map((item) => (
              <div key={item.id} className="snap-start shrink-0 w-[280px]">
                <EventItem event={item} className="w-full" />
              </div>
            ))}
          </HorizontalScroller>
        </section>
      ))}
    </Container>
  );
};

export default EventsPage;
