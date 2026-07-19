import { createClient } from "@/lib/supabase/server";
import { brand } from "@/config/brand";
import Dashboard from "@/components/admin/Dashboard";
import LogoutButton from "@/components/admin/LogoutButton";
import type { Booking } from "@/types/booking";

export const metadata = {
  title: `Dashboard — ${brand.businessName}`,
};

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .order("event_date", { ascending: true });

  const bookings = (data ?? []) as Booking[];

  return (
    <main className="flex-1 px-6 py-10 sm:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-violet">
              {brand.businessName}
            </p>
            <h1 className="mt-1 font-display text-3xl text-paper sm:text-4xl">
              Booking Dashboard
            </h1>
          </div>
          <LogoutButton />
        </div>

        {error ? (
          <div className="rounded-2xl border border-danger/40 bg-danger/10 p-6 text-danger">
            Couldn&apos;t load bookings: {error.message}
          </div>
        ) : (
          <Dashboard initialBookings={bookings} />
        )}
      </div>
    </main>
  );
}
