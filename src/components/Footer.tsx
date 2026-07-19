import Link from "next/link";
import { brand } from "@/config/brand";
import SocialLinks from "./SocialLinks";
import Waveform from "./Waveform";

export default function Footer() {
  return (
    <footer className="border-t border-border px-6 py-16 sm:px-10">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-8 text-center">
        <Waveform />

        <h2 className="font-display text-3xl leading-tight text-paper sm:text-4xl">
          Ready to book {brand.businessName}?
        </h2>
        <p className="max-w-md text-mute">
          Tell me about your event and I&apos;ll be in touch to confirm the
          details.
        </p>

        <Link
          href="/book"
          className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-violet to-magenta px-7 py-4 text-sm font-bold uppercase tracking-wide text-paper shadow-[0_10px_40px_-10px_rgba(178,75,243,0.6)] transition-transform hover:scale-[1.03]"
        >
          Book {brand.businessName}
          <span aria-hidden>→</span>
        </Link>

        <SocialLinks className="mt-4" />

        <p className="mt-6 text-xs text-mute-2">
          {brand.footerNote} · © {new Date().getFullYear()} {brand.businessName}
        </p>
      </div>
    </footer>
  );
}
