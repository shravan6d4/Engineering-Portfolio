"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { CaretLeft, CaretRight, X } from "@phosphor-icons/react/dist/ssr";

export type GalleryImage = {
  src: string;
  caption: string;
  width: number;
  height: number;
  reference?: boolean;
};

export default function Gallery({ images }: { images: GalleryImage[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);

  const next = () =>
    setOpenIndex((i) => (i === null ? i : (i + 1) % images.length));
  const prev = () =>
    setOpenIndex((i) =>
      i === null ? i : (i - 1 + images.length) % images.length,
    );

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIndex(null);
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    // Lock background scroll while the lightbox owns the viewport.
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openIndex, images.length]);

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {images.map((img, i) => (
          <button
            key={img.src}
            onClick={() => setOpenIndex(i)}
            className="group relative overflow-hidden rounded-lg border border-border bg-surface text-left cursor-pointer"
          >
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={img.src}
                alt={img.caption}
                fill
                sizes="(min-width: 640px) 33vw, 50vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <p className="border-t border-border bg-surface px-2.5 py-1.5 font-mono text-[11px] text-muted">
              {img.reference ? "Reference: " : ""}
              {img.caption}
            </p>
          </button>
        ))}
      </div>

      {openIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={images[openIndex].caption}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm sm:p-8"
          onClick={() => setOpenIndex(null)}
          onTouchStart={(e) => {
            touchStartX.current = e.touches[0].clientX;
          }}
          onTouchEnd={(e) => {
            if (touchStartX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchStartX.current;
            if (Math.abs(dx) > 50) (dx < 0 ? next : prev)();
            touchStartX.current = null;
          }}
        >
          <button
            aria-label="Close"
            className="absolute right-4 top-4 cursor-pointer rounded-md border border-border bg-surface p-2 text-foreground transition-colors hover:border-accent hover:text-accent"
            onClick={() => setOpenIndex(null)}
          >
            <X size={16} weight="bold" />
          </button>

          {images.length > 1 && (
            <>
              <button
                aria-label="Previous image"
                className="absolute left-2 z-10 cursor-pointer rounded-md border border-border bg-surface/80 p-2 text-foreground transition-colors hover:border-accent hover:text-accent sm:left-6"
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
              >
                <CaretLeft size={18} weight="bold" />
              </button>
              <button
                aria-label="Next image"
                className="absolute right-2 z-10 cursor-pointer rounded-md border border-border bg-surface/80 p-2 text-foreground transition-colors hover:border-accent hover:text-accent sm:right-6"
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
              >
                <CaretRight size={18} weight="bold" />
              </button>
            </>
          )}

          <div
            className="relative max-h-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[openIndex].src}
              alt={images[openIndex].caption}
              width={images[openIndex].width}
              height={images[openIndex].height}
              className="max-h-[80vh] w-auto rounded-lg border border-border object-contain"
            />
            <p className="mt-3 text-center font-mono text-xs text-muted">
              {images[openIndex].reference ? "Reference: " : ""}
              {images[openIndex].caption}{" "}
              <span className="text-foreground/50">
                {openIndex + 1}/{images.length}
              </span>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
