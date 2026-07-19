import Link from "next/link";
import { brand } from "@/config/brand";
import VinylRecord from "./VinylRecord";
import Waveform from "./Waveform";

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pb-20 pt-36 sm:px-10 sm:pt-44">
      {/* Ambient background glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-violet/10 blur-[120px]"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-violet">
            {brand.tagline} · {brand.location}
          </p>

          <h1 className="font-display text-5xl leading-[0.95] text-paper sm:text-6xl md:text-7xl">
            {brand.heroHeadline}
          </h1>

          <p className="mt-6 max-w-xl text-base text-mute sm:text-lg">
            {brand.heroSubheadline}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-6">
            <Link
              href="/book"
              className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-gold to-[#f3d38a] px-7 py-4 text-sm font-bold uppercase tracking-wide text-ink shadow-[0_10px_40px_-10px_rgba(232,184,92,0.6)] transition-transform hover:scale-[1.03]"
            >
              Book {brand.businessName}
              <span aria-hidden>→</span>
            </Link>

            <Waveform />
          </div>
        </div>

        <VinylRecord />
      </div>
    </section>
  );
}
