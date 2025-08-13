"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils"; // or replace with your own class joiner
import { Button } from "../ui/button";
import { ArrowRightIcon } from "lucide-react";
import { ArrowLeftIcon } from "lucide-react";

export default function HorizontalScroller({
  className,
  children,
  itemWidth = 200,
  gap = 24,
}) {
  const ref = useRef(null);

  const scrollByAmount = itemWidth + gap;

  const scrollLeft = () =>
    ref.current?.scrollBy({ left: -scrollByAmount, behavior: "smooth" });
  const scrollRight = () =>
    ref.current?.scrollBy({ left: scrollByAmount, behavior: "smooth" });

  return (
    <div className={cn("relative", className)}>
      {/* Fade edges */}
      <div className="pointer-events-none absolute hidden md:block inset-y-0 left-0 w-10 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="pointer-events-none absolute hidden md:block inset-y-0 right-0 w-10 bg-gradient-to-l from-background to-transparent z-10" />

      {/* Buttons */}
      <Button
        variant="glass"
        onClick={scrollLeft}
        aria-label="Scroll left"
        className="hidden md:flex !absolute left-2 top-1/2 -translate-y-1/2 z-20 h-10 w-10 items-center justify-center rounded-full  transition"
      >
        <ArrowLeftIcon />
      </Button>
      <Button
        variant="glass"
        onClick={scrollRight}
        aria-label="Scroll right"
        className="hidden md:flex !absolute right-2 top-1/2 -translate-y-1/2 z-20 h-10 w-10 items-center justify-center rounded-full  transition"
      >
        <ArrowRightIcon />
      </Button>

      {/* Track */}
      <div
        ref={ref}
        className="flex overflow-x-auto snap-x snap-mandatory gap-6 pr-4 md:pl-20 scrollbar-hide"
        style={{
          scrollPaddingLeft: 40,
          scrollSnapType: "x mandatory",
        }}
      >
        {children}
      </div>
    </div>
  );
}
