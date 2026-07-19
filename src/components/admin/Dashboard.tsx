"use client";

import { useMemo, useState } from "react";
import type { Booking, BookingStatus } from "@/types/booking";
import BookingCard from "./BookingCard";

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

const columns: { status: BookingStatus; title: string; hint: string }[] = [
  { status: "pending", title: "Pending", hint: "Awaiting your response" },
  { status: "accepted", title: "Accepted", hint: "Confirmed bookings" },
  { status: "declined", title: "Declined", hint: "Not moving forward" },
];

export default function Dashboard({ initialBookings }: { initialBookings: Booking[] }) {
  const [bookings, setBookings] = useState(initialBookings);

  function handleStatusChange(id: string, status: BookingStatus) {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status } : b))
    );
  }

  const counts = useMemo(
    () => ({
      pending: bookings.filter((b) => b.status === "pending").length,
      accepted: bookings.filter((b) => b.status === "accepted").length,
      declined: bookings.filter((b) => b.status === "declined").length,
    }),
    [bookings]
  );

  const upcoming = useMemo(
    () =>
      bookings
        .filter((b) => b.status === "accepted" && b.event_date >= todayIso())
        .sort((a, b) => a.event_date.localeCompare(b.event_date)),
    [bookings]
  );

  return (
    <div className="space-y-10">
      {/* Stat bar */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard label="Pending" value={counts.pending} accent="text-gold" />
        <StatCard label="Accepted" value={counts.accepted} accent="text-whatsapp" />
        <StatCard label="Declined" value={counts.declined} accent="text-danger" />
        <StatCard label="Upcoming events" value={upcoming.length} accent="text-violet" />
      </div>

      {/* Upcoming accepted events */}
      {upcoming.length > 0 && (
        <section>
          <h2 className="mb-4 font-display text-xl tracking-wide text-paper">
            Upcoming events
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {upcoming.map((booking) => (
              <BookingCard
                key={booking.id}
                booking={booking}
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>
        </section>
      )}

      {/* Kanban columns */}
      <section>
        <h2 className="mb-4 font-display text-xl tracking-wide text-paper">
          All bookings
        </h2>
        <div className="grid gap-6 lg:grid-cols-3">
          {columns.map((col) => {
            const items = bookings
              .filter((b) => b.status === col.status)
              .sort((a, b) => a.event_date.localeCompare(b.event_date));

            return (
              <div key={col.status}>
                <div className="mb-3 flex items-baseline justify-between">
                  <h3 className="font-semibold text-paper">{col.title}</h3>
                  <span className="font-mono text-xs text-mute-2">
                    {items.length} · {col.hint}
                  </span>
                </div>

                <div className="space-y-4">
                  {items.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-border p-6 text-center text-sm text-mute-2">
                      No {col.title.toLowerCase()} bookings.
                    </div>
                  ) : (
                    items.map((booking) => (
                      <BookingCard
                        key={booking.id}
                        booking={booking}
                        onStatusChange={handleStatusChange}
                      />
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function StatCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: number;
  accent: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-5">
      <p className={`font-display text-3xl ${accent}`}>{value}</p>
      <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-mute">
        {label}
      </p>
    </div>
  );
}
