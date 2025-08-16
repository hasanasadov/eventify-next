"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { Container } from "@/components/ui/Container";
import LoadingComp from "@/components/shared/Loading";
import IsError from "@/components/shared/IsError";
import { RenderIf } from "@/utils/RenderIf";

import CommentsSection from "@/components/sections/CommentsSection";
import LocationSection from "@/components/sections/LocationSection";
import useBackgroundBlur from "@/hooks/useBackgroundBlur";

import { getVenueById } from "@/actions/venues";
import { createVenueComment, deleteVenueComment } from "@/actions/comments";

import { QUERY_KEYS } from "@/constants/queryKeys";
// If you use a dedicated EventItem card, keep this import and fix the path to yours:
import VenueUpcomingEvents from "@/components/sections/VenueUpcomingEvents";

export default function VenueDetail() {
  const params = useParams();
  const id = useMemo(() => {
    const raw = params?.id;
    return Array.isArray(raw) ? raw[0] : raw;
  }, [params]);

  const {
    data: venue,
    isError,
    isLoading,
  } = useQuery({
    queryKey: [QUERY_KEYS.VENUES, id],
    queryFn: () => getVenueById(id),
    enabled: Boolean(id),
  });
  console.log("Fetched venue comments:", venue);
  const bgRef = useBackgroundBlur();

  const venueComments = Array.isArray(venue?.Comment) ? venue.Comment : [];
  const venueEvents = Array.isArray(venue?.events) ? venue.events : [];
  const venueLocation = venue?.location || {};

  if (isLoading) return <LoadingComp />;
  if (isError || !venue) return <IsError text="venue details" />;

  return (
    <div className="relative text-white">
      {/* Background image */}
      <div
        ref={bgRef}
        id="venue-bg"
        className="fixed inset-0 w-screen h-screen bg-center bg-no-repeat transition-all duration-300 will-change-transform will-change-filter"
        style={{
          backgroundImage: `url(${venue?.imageURL || "/logo.png"})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Dark overlay for readability */}
      <div className="fixed inset-0 bg-black/40" />

      {/* Foreground content */}
      <Container className="relative z-10">
        <div className="flex flex-col gap-6 py-4">
          <div className="flex items-center justify-between glass-button w-fit">
            <Link href="/venues" className="text-sm px-3 py-1">
              Back to list
            </Link>
          </div>

          {/* Hero */}
          <section
            aria-labelledby="venue-hero"
            className="flex flex-col lg:flex-row gap-6 md:gap-12"
          >
            <RenderIf condition={Boolean(venue?.imageURL)}>
              <img
                src={venue?.imageURL || "/logo.png"}
                alt={venue?.title || "Venue image"}
                className="w-full lg:max-w-[50%] glass h-full object-contain rounded-lg border-2"
                loading="eager"
                decoding="async"
              />
            </RenderIf>

            <RenderIf condition={!venue?.imageURL}>
              <div className="w-full md:w-1/2 h-64 bg-gray-300/60 rounded-lg border-2 flex items-center justify-center text-black">
                <p className="text-gray-700">No Image Available</p>
              </div>
            </RenderIf>

            <div className="glass md:p-6 p-4 flex-1 rounded-lg border-2 space-y-6 relative">
              <h1 id="venue-hero" className="text-3xl font-bold text-blue-400">
                {venue?.title}{" "}
                <span className="text-white/80 text-lg">
                  ({venue?.type || "—"})
                </span>
              </h1>

              <div className="flex flex-col md:flex-row justify-between gap-8">
                <div className="w-full md:w-1/2 space-y-2">
                  <h3 className="text-2xl font-semibold">Working Hours</h3>
                  <p className="text-base text-white/90">
                    Open:{" "}
                    <span className="font-medium">{venue?.openAT ?? "—"}</span>{" "}
                    — Close:{" "}
                    <span className="font-medium">{venue?.closeAT ?? "—"}</span>
                  </p>
                </div>

                <div className="flex-1">
                  <h2 className="text-2xl font-semibold mb-2">Description</h2>
                  <p className="text-base text-white/90">
                    {venue?.description || "No description provided."}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Location (reused) */}
          <LocationSection
            location={venueLocation}
            title="Location"
            listId="venue-location"
          />

          {/* Comments (reused, generic) */}
          <CommentsSection
            initialComments={venueComments}
            isError={isError}
            isLoading={isLoading}
            hookOptions={{
              resourceId: id,
              parentField: "venueId",
              createFn: createVenueComment,
              deleteFn: deleteVenueComment,
              invalidateKey: [QUERY_KEYS.VENUES, id],
            }}
            title="Comments"
            listId="venue-comments"
          />

          <VenueUpcomingEvents venueEvents={venueEvents} />
        </div>
      </Container>
    </div>
  );
}
