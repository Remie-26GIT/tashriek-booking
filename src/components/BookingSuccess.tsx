import Link from "next/link";
import { brand } from "@/config/brand";
import Waveform from "@/components/Waveform";

export default function BookingSuccess({ clientName }: { clientName: string }) {
  const firstName = clientName.trim().split(" ")[0];

  return (
    <div className="flex flex-col items-center py-10 text-center">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-violet/40 bg-violet/10">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-8 w-8 text-violet"
        >
          <path d="M20 6 9 17l-5-5" />
        </svg>
      </div>

      <h2 className="font-display text-3xl text-paper sm:text-4xl">
        Request sent, {firstName}
      </h2>

      <p className="mt-4 max-w-md text-mute">
        Your booking request has been received. {brand.businessName} will
        review the details and get in touch to confirm once it&apos;s been
        accepted.
      </p>

      <Waveform className="mt-8" />

      <Link
        href="/"
        className="mt-10 inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold text-paper transition-colors hover:border-violet hover:text-violet"
      >
        Back to home
      </Link>
    </div>
  );
}
