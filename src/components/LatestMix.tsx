import { brand } from "@/config/brand";
import Waveform from "./Waveform";

export default function LatestMix() {
  const { latestMix } = brand;
  const isVideo = latestMix.provider === "youtube";

  return (
    <section
      id="mixes"
      className="border-t border-border bg-surface/40 px-6 py-20 sm:px-10"
    >
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 flex items-center gap-4">
          <Waveform />
          <h2 className="font-display text-2xl tracking-wide text-paper sm:text-3xl">
            {latestMix.title}
          </h2>
        </div>

        <div
          className={`overflow-hidden rounded-2xl border border-border shadow-2xl shadow-black/40 ${
            isVideo ? "aspect-video" : ""
          }`}
        >
          <iframe
            title={latestMix.title}
            src={latestMix.embedUrl}
            width="100%"
            height={isVideo ? "100%" : 300}
            allow="autoplay"
            loading="lazy"
            className="block"
          />
        </div>
      </div>
    </section>
  );
}
