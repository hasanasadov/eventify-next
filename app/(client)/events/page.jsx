"use client";

import EventItem from "./EventItem";
import { getEvents } from "@/actions/events";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { Container } from "@/components/ui/Container";
import IsError from "@/components/shared/IsError";
import HorizontalScroller from "@/components/shared/HorizontalScroller";
import HeroSlider from "@/components/shared/HeroSlider";
import IsNone from "@/components/shared/IsNone";
import LoadingComp from "@/components/shared/Loading";
import { titleCase } from "@/utils/titleCase";
import { dateTo } from "@/utils/dateTo";

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

  if (isLoading) {
    return <LoadingComp />;
  }

  if (!events?.length) {
    return <IsNone text="events" />;
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
  );

  const featured = [...events]
    .filter((e) => e.imageURL)
    .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())
    .slice(0, 5);

  const slides = featured.map((e) => ({
    id: e.id,
    title: e.title,
    subtitle: e.venue?.title ?? "",
    date:
      e.start && e.end
        ? `${dateTo(e.date)}  ${e.start} - ${e.end}`
        : e.start || e.end || new Date(e.createdAt).toLocaleDateString(),
    ctaHref: `/events/${e.id}`,
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
              <div key={item.id} className="snap-start  w-[400px]">
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
