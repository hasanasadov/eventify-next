"use client";

import React from "react";
import Map from "@/components/shared/Map";
import { RenderIf } from "@/utils/RenderIf";
import Link from "next/link";
import { Button } from "../ui/button";

export default function LocationSection({
  location,
  title = "Location",
  listId = "location",
}) {
  const hasCoords = Boolean(location?.lat) && Boolean(location?.lng);

  return (
    <section
      aria-labelledby={`${listId}-heading`}
      className="glass bg-white/30 dark:bg-black/30 backdrop-blur-md md:p-6 p-4 rounded-xl"
    >
      <RenderIf condition={hasCoords}>
        <div>
          <h2
            id={`${listId}-heading`}
            className="text-2xl font-semibold text-white mb-4"
          >
            {title}
          </h2>

          <div className="flex flex-col lg:flex-row gap-6">
            <div className="glass w-full lg:w-1/3 flex h-fit justify-between p-3 lg:p-6 rounded-lg">
              <div className="flex  flex-col justify-between">
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold">Address</h3>
                  <p className="text-sm text-white/90">
                    {location?.title || "Unknown"}
                  </p>
                </div>
                {/* <p className="text-sm text-white/80">
                  <span className="font-medium">Latitude:</span>{" "}
                  {location?.lat ?? "Unknown"}°
                </p>
                <p className="text-sm text-white/80">
                  <span className="font-medium">Longitude:</span>{" "}
                  {location?.lng ?? "Unknown"}°
                </p> */}
                <Link
                  href={`https://www.google.com/maps?q=${location?.lat},${location?.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="link" className="px-0 font-bold">
                    View on Google Maps
                  </Button>
                </Link>
              </div>

              <RenderIf condition={Boolean(location?.imageURL)}>
                <div className="flex  ">
                  <img
                    src={location?.imageURL}
                    alt={location?.title || "Location image"}
                    className="glass w-40 h-40 rounded-md border"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </RenderIf>
            </div>

            <div className="glass w-full lg:w-2/3  h-80 overflow-hidden rounded-lg">
              <Map
                imageSource={location?.imageURL}
                title={location?.title}
                location={location}
              />
            </div>
          </div>
        </div>
      </RenderIf>
    </section>
  );
}
