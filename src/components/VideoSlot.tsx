"use client";

import { useRef, useState } from "react";
import { Play } from "@phosphor-icons/react/dist/ssr";

type VideoSlotProps = {
  src?: string;
  poster?: string;
  label: string;
};

export default function VideoSlot({ src, poster, label }: VideoSlotProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [activated, setActivated] = useState(false);

  if (!src) {
    return (
      <div className="flex aspect-video flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-surface/50 text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="h-8 w-8 text-muted"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 10.5 19.5 8.25v7.5l-3.75-2.25m-9.75 3h6.75a1.5 1.5 0 0 0 1.5-1.5v-6a1.5 1.5 0 0 0-1.5-1.5H6a1.5 1.5 0 0 0-1.5 1.5v6a1.5 1.5 0 0 0 1.5 1.5Z"
          />
        </svg>
        <p className="px-4 font-mono text-xs text-muted">
          Footage coming soon: {label}
        </p>
      </div>
    );
  }

  const activate = () => {
    // Act on the element directly — don't defer through rAF, which can be
    // throttled (background tab) and would leave the play button dead.
    const v = videoRef.current;
    if (v) {
      v.load();
      void v.play().catch(() => {});
    }
    setActivated(true);
  };

  return (
    <div className="group overflow-hidden rounded-lg border border-border bg-surface transition-colors hover:border-accent/50">
      <div className="relative aspect-video w-full bg-black">
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          controls={activated}
          playsInline
          // preload="none" keeps the video bytes (and even the poster fetch)
          // off the critical path until the viewer actually wants it.
          preload="none"
          className="h-full w-full"
        />
        {!activated && (
          <button
            onClick={activate}
            aria-label={`Play video: ${label}`}
            className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/20 transition-colors hover:bg-black/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/30 bg-black/60 backdrop-blur transition-transform duration-200 group-hover:scale-105">
              <Play size={22} weight="fill" className="ml-0.5 text-white" />
            </span>
          </button>
        )}
      </div>
      <p className="border-t border-border px-3 py-2 font-mono text-xs text-muted">
        {label}
      </p>
    </div>
  );
}
