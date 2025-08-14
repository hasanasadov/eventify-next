"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { Container } from "@/components/ui/Container";
import LoadingComp from "@/components/shared/Loading";
import IsError from "@/components/shared/IsError";
import { RenderIf } from "@/utils/RenderIf";

import { getEventById } from "@/actions/events";
import { QUERY_KEYS } from "@/constants/queryKeys";
import useBackgroundBlur from "@/hooks/useBackgroundBlur";
import CommentsSection from "@/components/sections/CommentsSection";
import LocationSection from "@/components/sections/LocationSection";
import { createEventComment, deleteEventComment } from "@/actions/comments";

export default function EventDetail() {
  const params = useParams();
  const id = useMemo(() => {
    const raw = params?.id;
    return Array.isArray(raw) ? raw[0] : raw;
  }, [params]);

  const {
    data: event,
    isError,
    isLoading,
  } = useQuery({
    queryKey: [QUERY_KEYS.EVENTS, id],
    queryFn: () => getEventById(id),
    enabled: Boolean(id),
  });

  const bgRef = useBackgroundBlur();

  const eventDate = React.useMemo(() => {
    if (!event?.date) return "Not specified";
    try {
      return new Date(event.date).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    } catch {
      return "Not specified";
    }
  }, [event?.date]);

  const eventStart = event?.start ?? "—";
  const eventEnd = event?.end ?? "—";
  const eventComments = Array.isArray(event?.Comment) ? event.Comment : [];
  const location = event?.location || {};

  if (isLoading) return <LoadingComp />;
  if (isError || !event) return <IsError />;

  return (
    <div className="relative text-white">
      {/* Background image */}
      <div
        ref={bgRef}
        id="event-bg"
        className="fixed inset-0 w-screen h-screen bg-center bg-no-repeat transition-all duration-300 will-change-transform will-change-filter"
        style={{
          backgroundImage: `url(${event?.imageURL || "/fallback.jpg"})`,
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
            <Link href="/events" className="text-sm px-3 py-1">
              Back to list
            </Link>
          </div>

          <section
            aria-labelledby="event-hero"
            className="flex flex-col md:flex-row gap-6 md:gap-12"
          >
            <RenderIf condition={Boolean(event?.imageURL)}>
              <img
                src={event?.imageURL}
                alt={event?.title ? `${event.title} poster` : "Event Poster"}
                className="w-full md:max-w-[50%] glass h-full object-contain rounded-lg border-2"
                loading="eager"
                decoding="async"
              />
            </RenderIf>

            <RenderIf condition={!event?.imageURL}>
              <div className="w-full md:w-1/2 h-64 bg-gray-300/60 rounded-lg border-2 flex items-center justify-center text-black">
                <p className="text-gray-700">No Poster Available</p>
              </div>
            </RenderIf>

            <div className="glass md:p-6 p-4 flex-1 flex flex-col justify-between gap-5 rounded-lg border-2 relative">
              <div className="space-y-4">
                <h1
                  id="event-hero"
                  className="text-4xl font-extrabold text-green-400"
                >
                  {event?.title || "Event Title"}{" "}
                  <span className="text-xl text-white/80">
                    ({event?.type || "—"})
                  </span>
                </h1>

                <div className="text-white/90">
                  <span className="text-xl font-semibold">Date: </span>
                  <span>{eventDate}</span>
                </div>

                <div className="flex items-center gap-4 text-white/90">
                  <p>
                    <span className="font-semibold">From: </span> {eventStart}
                  </p>
                  <p>
                    <span className="font-semibold">To: </span> {eventEnd}
                  </p>
                </div>

                <p className="text-base leading-relaxed">
                  {event?.description || "No description provided."}
                </p>
              </div>

              <div className="flex justify-center">
                <RenderIf condition={Boolean(event?.goto)}>
                  <a
                    href={event.goto}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-md border border-white/20 bg-white/20 px-5 py-2 text-base font-medium hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/40 transition"
                  >
                    Buy Ticket
                  </a>
                </RenderIf>
              </div>
            </div>
          </section>

          <LocationSection
            location={event?.location}
            title="Location"
            listId="event-location"
          />

          <CommentsSection
            initialComments={eventComments}
            isError={isError}
            isLoading={isLoading}
            hookOptions={{
              resourceId: id,
              parentField: "eventId",
              createFn: createEventComment,
              deleteFn: deleteEventComment,
              invalidateKey: [QUERY_KEYS.EVENTS, id],
            }}
            title="Comments"
          />
        </div>
      </Container>
    </div>
  );
}
