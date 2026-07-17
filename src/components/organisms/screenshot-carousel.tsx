"use client";

import { useRef, useState } from "react";

export function ScreenshotCarousel({ images, alt }: { images: string[]; alt: string }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  function scrollToIndex(target: number) {
    const track = trackRef.current;
    if (!track) return;
    const wraps = target < 0 || target >= images.length;
    const looped = (target + images.length) % images.length;
    // Wrapping (last -> first / first -> last) jumps instantly instead of
    // smooth-scrolling back through every slide in between.
    track.scrollTo({ left: looped * track.clientWidth, behavior: wraps ? "auto" : "smooth" });
  }

  function handleScroll() {
    const track = trackRef.current;
    if (!track) return;
    setIndex(Math.round(track.scrollLeft / track.clientWidth));
  }

  return (
    <div className="relative">
      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="flex snap-x snap-mandatory overflow-x-hidden scroll-smooth"
      >
        {images.map((src, i) => (
          <div
            key={src}
            className="flex h-64 w-full shrink-0 snap-center items-center justify-center border border-dashed border-border bg-secondary/20 sm:h-96"
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- screenshots
                keep their natural aspect ratio; we don't have stored
                width/height metadata for next/image's required layout props */}
            <img
              src={src}
              alt={`${alt} screenshot ${i + 1}`}
              loading={i === 0 ? "eager" : "lazy"}
              className="max-h-full max-w-full object-contain"
            />
          </div>
        ))}
      </div>

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => scrollToIndex(index - 1)}
            aria-label="Previous screenshot"
            className="absolute top-1/2 left-2 -translate-y-1/2 border border-dashed border-border bg-background/80 px-2 py-1 font-mono text-sm text-foreground transition-colors duration-200 hover:border-primary hover:text-primary"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={() => scrollToIndex(index + 1)}
            aria-label="Next screenshot"
            className="absolute top-1/2 right-2 -translate-y-1/2 border border-dashed border-border bg-background/80 px-2 py-1 font-mono text-sm text-foreground transition-colors duration-200 hover:border-primary hover:text-primary"
          >
            ›
          </button>

          <div className="mt-4 flex items-center justify-center gap-2">
            {images.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => scrollToIndex(i)}
                aria-label={`Go to screenshot ${i + 1}`}
                className={`h-2 w-2 border transition-colors duration-200 ${
                  i === index ? "border-primary bg-primary" : "border-border bg-transparent"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
