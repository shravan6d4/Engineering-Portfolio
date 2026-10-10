import VideoSlot from "./VideoSlot";

// The clips are encoded at 2.5x, so this brings playback to 9x real time.
const PLAYBACK_RATE = 9 / 2.5;

type HeightDemoProps = {
  heightLabel: string;
  note?: string;
  physicalSrc?: string;
  physicalPoster?: string;
  secondarySrc?: string;
  secondaryPoster?: string;
  secondaryLabel?: string;
  secondaryAvailable?: boolean;
  sped?: boolean;
};

export default function HeightDemo({
  heightLabel,
  note,
  physicalSrc,
  physicalPoster,
  secondarySrc,
  secondaryPoster,
  secondaryLabel = "OpenCV detection + sim overlay",
  secondaryAvailable = true,
  sped = true,
}: HeightDemoProps) {
  return (
    <div className="rounded-xl border border-border bg-surface/40 p-4 sm:p-5">
      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="font-mono text-sm font-medium text-foreground">
          {heightLabel}
        </h3>
        <div className="flex items-center gap-2">
          {sped && (
            <span className="rounded border border-border bg-surface px-2 py-0.5 font-mono text-[11px] text-muted">
              Playback: 9&times; speed
            </span>
          )}
        </div>
      </div>
      {note && <p className="mb-3 text-sm text-muted">{note}</p>}
      {secondaryAvailable ? (
        <div className="grid gap-3 sm:grid-cols-2">
          <VideoSlot
            src={physicalSrc}
            poster={physicalPoster}
            label="Physical arm (iPhone)"
            playbackRate={PLAYBACK_RATE}
          />
          <VideoSlot
            src={secondarySrc}
            poster={secondaryPoster}
            label={secondaryLabel}
            playbackRate={PLAYBACK_RATE}
          />
        </div>
      ) : (
        <div className="grid gap-3">
          <VideoSlot
            src={physicalSrc}
            poster={physicalPoster}
            label="Physical arm (iPhone)"
            playbackRate={PLAYBACK_RATE}
          />
        </div>
      )}
    </div>
  );
}
