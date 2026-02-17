"use client";

import * as React from "react";
import { BlockWrapper } from "./block-wrapper";
import type { PageBlock } from "@buildernet/utils";

type CarouselImage = { id: string; url: string; alt?: string };

export function CarouselBlock({
  block,
  theme,
  isEditor,
}: {
  block: PageBlock;
  theme?: Record<string, unknown>;
  isEditor?: boolean;
}) {
  const config = (block.config || {}) as {
    images?: CarouselImage[];
    autoplaySpeed?: number;
    behavior?: "smooth" | "snap";
  };
  const images = config.images ?? [];
  const autoplaySpeed = typeof config.autoplaySpeed === "number" ? config.autoplaySpeed : 5;
  const behavior = config.behavior ?? "smooth";

  if (isEditor) {
    return (
      <BlockWrapper blockId={block.id} animation={block.animation} isEditor>
        <div className="rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-8 text-center">
          <p className="text-slate-600 font-medium">Carousel</p>
          <p className="text-sm text-slate-500 mt-1">
            {images.length < 3
              ? `Add at least 3 images in settings (${images.length}/3)`
              : `${images.length} image${images.length === 1 ? "" : "s"}`}
          </p>
        </div>
      </BlockWrapper>
    );
  }

  if (images.length < 3) {
    return (
      <BlockWrapper blockId={block.id} animation={block.animation} isEditor={false}>
        <div className="py-8 text-center text-slate-500 text-sm">Add at least 3 images to the carousel.</div>
      </BlockWrapper>
    );
  }

  return (
    <BlockWrapper blockId={block.id} animation={block.animation} isEditor={false}>
      <CarouselInner
        images={images}
        autoplaySpeed={autoplaySpeed}
        behavior={behavior}
      />
    </BlockWrapper>
  );
}

function CarouselInner({
  images,
  autoplaySpeed,
  behavior,
}: {
  images: CarouselImage[];
  autoplaySpeed: number;
  behavior: "smooth" | "snap";
}) {
  const [index, setIndex] = React.useState(0);
  const next = () => setIndex((i) => (i + 1) % images.length);
  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);

  React.useEffect(() => {
    if (autoplaySpeed <= 0) return;
    const t = setInterval(next, autoplaySpeed * 1000);
    return () => clearInterval(t);
  }, [autoplaySpeed, images.length]);

  const transition = behavior === "smooth" ? "transform 0.4s ease-out" : "transform 0.15s ease-out";

  return (
    <div className="relative w-full overflow-hidden rounded-xl bg-slate-100">
      <div
        className="flex"
        style={{
          transform: `translateX(-${index * 100}%)`,
          transition,
        }}
      >
        {images.map((img) => (
          <div
            key={img.id}
            className="min-w-full flex-shrink-0 aspect-[21/9] md:aspect-[3/1] relative"
          >
            <img
              src={img.url}
              alt={img.alt ?? ""}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={prev}
        className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow-md flex items-center justify-center text-slate-700 hover:bg-white"
        aria-label="Previous"
      >
        ‹
      </button>
      <button
        type="button"
        onClick={next}
        className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow-md flex items-center justify-center text-slate-700 hover:bg-white"
        aria-label="Next"
      >
        ›
      </button>
      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
        {images.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIndex(i)}
            className={`w-2 h-2 rounded-full transition-colors ${
              i === index ? "bg-white" : "bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
