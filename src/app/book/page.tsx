import Link from "next/link";
import { brand } from "@/config/brand";
import BookingForm from "@/components/BookingForm";

export const metadata = {
  title: `Book ${brand.businessName}`,
};

export default function BookPage() {
  return (
    <main className="flex-1 px-6 py-16 sm:px-10 sm:py-24">
      <div className="mx-auto max-w-xl">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-mute transition-colors hover:text-paper"
        >
          ← Back to home
        </Link>

        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-violet">
          Booking request
        </p>
        <h1 className="mt-3 font-display text-4xl leading-tight text-paper sm:text-5xl">
          Book {brand.businessName}
        </h1>
        <p className="mt-4 text-mute">
          Fill in your event details below. You&apos;ll get a confirmation
          once it&apos;s submitted, and {brand.businessName} will be in touch
          on WhatsApp once your booking is accepted.
        </p>

        <div className="mt-10 rounded-3xl border border-border bg-surface/60 p-6 shadow-2xl shadow-black/30 sm:p-8">
          <BookingForm />
        </div>
      </div>
    </main>
  );
}
