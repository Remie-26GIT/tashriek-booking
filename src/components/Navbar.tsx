import Link from "next/link";
import { brand } from "@/config/brand";

export default function Navbar() {
  return (
    <header className="absolute top-0 left-0 right-0 z-30">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 sm:px-10">
        <Link
          href="/"
          className="font-display text-xl tracking-wide text-paper sm:text-2xl"
        >
          {brand.businessName}
        </Link>

        <Link
          href="/book"
          className="group inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-paper backdrop-blur transition-colors hover:border-violet hover:text-violet sm:text-sm"
        >
          Book Now
          <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </Link>
      </nav>
    </header>
  );
}
