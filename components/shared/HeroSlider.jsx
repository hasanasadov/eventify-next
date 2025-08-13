"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowLeftIcon } from "lucide-react";
import { ArrowRightIcon } from "lucide-react";
import { Button } from "../ui/button";

function fmtDate(d) {
  if (!d) return "";
  const dt = typeof d === "string" ? new Date(d) : d;
  return dt.toLocaleString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function HeroSlider({ slides, className, autoPlayMs = 5500 }) {
  const [index, setIndex] = useState(0);
  const timer = useRef(null);
  const hovering = useRef(false);

  const go = (i) => setIndex((prev) => (i + slides.length) % slides.length);
  const next = () => go(index + 1);
  const prev = () => go(index - 1);

  const start = () => {
    if (timer.current) return;
    timer.current = setInterval(() => {
      if (!hovering.current) next();
    }, autoPlayMs);
  };
  const stop = () => {
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
  };

  useEffect(() => {
    if (slides.length <= 1) return;
    start();
    return stop;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slides.length, autoPlayMs]);

  const widthStyle = useMemo(
    () => ({ transform: `translateX(-${index * 100}%)` }),
    [index]
  );

  if (slides.length === 0) return null;

  return (
    <div
      className={cn(
        "relative w-full rounded-3xl overflow-hidden bg-black/40",
        "shadow-lg border border-white/5",
        className
      )}
      onMouseEnter={() => (hovering.current = true)}
      onMouseLeave={() => (hovering.current = false)}
    >
      {/* Slides track */}
      <div className="relative h-[70vh] md:h-[75vh] lg:h-[85vh]">
        <div
          className="absolute inset-0 flex transition-transform duration-700 ease-out will-change-transform"
          style={widthStyle}
        >
          {slides.map((s) => (
            <div key={s.id} className="relative min-w-full h-full">
              {/* Image */}
              <img
                src={s.imageUrl}
                alt={s.title}
                className="absolute inset-0 h-full w-full object-cover"
                loading="eager"
              />
              {/* Vignette + left gradient */}
              <div className="absolute inset-0 bg-gradient-to-tr from-black/70 via-black/10 to-transparent" />
              <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-black/10" />

              {/* Content */}
              <div className="relative z-10 h-full w-full flex items-end md:items-center">
                <div className="px-6 md:px-10 lg:px-16 py-10 max-w-3xl text-white space-y-4">
                  {s.badgeUrl && (
                    <img
                      src={s.badgeUrl}
                      alt=""
                      className="h-14 w-14 md:h-16 md:w-16 object-contain drop-shadow"
                    />
                  )}
                  <h2 className="text-3xl md:text-5xl font-extrabold leading-tight">
                    {s.title}
                  </h2>
                  {(s.subtitle || s.date) && (
                    <div className="text-white/85">
                      {s.subtitle && <div>{s.subtitle}</div>}
                      {s.date && (
                        <div className="font-semibold">{fmtDate(s.date)}</div>
                      )}
                    </div>
                  )}
                  {s.ctaHref && (
                    <Link
                      href={s.ctaHref}
                      className="inline-flex h-11 items-center rounded-lg bg-white text-black px-5 font-semibold shadow hover:bg-white/90 transition"
                    >
                      {s.ctaText ?? "Get Tickets"}
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={cn(
              "h-2.5 w-2.5 rounded-full transition",
              i === index ? "bg-white" : "bg-white/50 hover:bg-white/70"
            )}
          />
        ))}
      </div>

      {/* Arrows (bottom-right like screenshot) */}
      <div className="absolute bottom-5 right-5 z-20 flex gap-2">
        <Button
          aria-label="Previous slide"
          variant="glass"
          onClick={prev}
          className="h-10 w-10 rounded-full !bg-white text-black/80 grid place-items-center shadow hover:bg-white/90"
        >
          <ArrowLeftIcon />
        </Button>
        <Button
          aria-label="Next slide"
          onClick={next}
          variant="glass"
          className="h-10 w-10 rounded-full !bg-white text-black/80 grid place-items-center shadow hover:bg-white/90"
        >
          <ArrowRightIcon />
        </Button>
      </div>
    </div>
  );
}
