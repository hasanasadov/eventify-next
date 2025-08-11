"use client";

import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/queryKeys";
import VenueItem from "./VenueItem";
import PulseSkeleton from "@/components/shared/PulseSkeleton";
import { getVenues } from "@/actions/venues";
import { Container } from "@/components/ui/Container";
import IsError from "@/components/shared/IsError";
import HeroSlider from "@/components/shared/HeroSlider";
import HorizontalScroller from "@/components/shared/HorizontalScroller";
import IsNone from "@/components/shared/IsNone";
import LoadingComp from "@/components/shared/Loading";

// small helper
const titleCase = (s) =>
  s
    .replace(/[-_]+/g, " ")
    .replace(
      /\w\S*/g,
      (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
    );

const VenuesPage = () => {
  const {
    data: venues,
    isError,
    isLoading,
  } = useQuery({
    queryKey: [QUERY_KEYS.VENUES],
    queryFn: getVenues,
  });

  if (isError) return <IsError text="venues" />;

  if (isLoading) {
    return <LoadingComp />;
  }

  if (!venues?.length) {
    return <IsNone text="venues" />;
  }

  // ---- group by `type` dynamically ----
  const grouped = venues.reduce((acc, v) => {
    const key = v.type && v.type.trim() ? v.type : "other";
    (acc[key] ||= []).push(v);
    return acc;
  }, {}); // ✅ object, not []

  // Largest buckets first
  const sections = Object.entries(grouped).sort(
    (a, b) => b[1].length - a[1].length
  );

  // Pick featured venues that have an image; sort by createdAt (newest first)
  const featured = [...venues]
    .filter((v) => !!v.imageURL)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 5);

  const slides = featured.map((v) => ({
    id: v.id,
    title: v.title,
    subtitle: v.location?.title ?? "", // show location name if available
    // Show work hours if present, otherwise created date
    date:
      v.openAT && v.closeAT
        ? `${v.openAT} – ${v.closeAT}`
        : v.openAT || v.closeAT || new Date(v.createdAt).toLocaleDateString(),
    ctaHref: `/venues/${v.id}`,
    ctaText: "View Venue",
    imageUrl: v.imageURL,
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
                <VenueItem venue={item} />
              </div>
            ))}
          </HorizontalScroller>
        </section>
      ))}
    </Container>
  );
};

export default VenuesPage;
