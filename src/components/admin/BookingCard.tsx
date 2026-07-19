"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Booking, BookingStatus } from "@/types/booking";
import {
  buildAcceptedMessage,
  buildDeclinedMessage,
  buildWhatsappLink,
} from "@/lib/whatsapp";
import StatusBadge from "./StatusBadge";

function formatDate(isoDate: string) {
  return new Date(`${isoDate}T00:00:00`).toLocaleDateString("en-ZA", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatTime(time: string) {
  return time.slice(0, 5);
}

export default function BookingCard({
  booking,
  onStatusChange,
}: {
  booking: Booking;
  onStatusChange: (id: string, status: BookingStatus) => void;
}) {
  const [updating, setUpdating] = useState(false);
  const [notesOpen, setNotesOpen] = useState(false);

  async function updateStatus(status: BookingStatus) {
    setUpdating(true);
    const supabase = createClient();
    const { error } = await supabase
      .from("bookings")
      .update({ status })
      .eq("id", booking.id);
    setUpdating(false);

    if (!error) {
      onStatusChange(booking.id, status);
    }
  }

  const whatsappMessage =
    booking.status === "accepted"
      ? buildAcceptedMessage(booking)
      : booking.status === "declined"
      ? buildDeclinedMessage(booking)
      : null;

  const whatsappLink = whatsappMessage
    ? buildWhatsappLink(booking.phone_number, whatsappMessage)
    : null;

  return (
    <div className="rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-violet/40">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-semibold text-paper">{booking.client_name}</p>
          <p className="mt-0.5 text-xs uppercase tracking-wide text-mute-2">
            {booking.event_type}
          </p>
        </div>
        <StatusBadge status={booking.status} />
      </div>

      <div className="mt-4 space-y-1.5 font-mono text-sm text-mute">
        <p>
          {formatDate(booking.event_date)} · {formatTime(booking.event_time)}
        </p>
        <p className="text-paper/80">{booking.venue}</p>
        <p>{booking.phone_number}</p>
        {booking.email && <p>{booking.email}</p>}
      </div>

      {booking.notes && (
        <div className="mt-3">
          <button
            type="button"
            onClick={() => setNotesOpen((v) => !v)}
            className="text-xs font-semibold text-violet hover:underline"
          >
            {notesOpen ? "Hide notes" : "View notes"}
          </button>
          {notesOpen && (
            <p className="mt-2 rounded-lg bg-surface-2 p-3 text-sm text-mute">
              {booking.notes}
            </p>
          )}
        </div>
      )}

      <div className="mt-5 flex flex-wrap gap-2">
        {booking.status === "pending" && (
          <>
            <button
              onClick={() => updateStatus("accepted")}
              disabled={updating}
              className="rounded-full bg-whatsapp/15 px-4 py-2 text-xs font-bold uppercase tracking-wide text-whatsapp transition-colors hover:bg-whatsapp/25 disabled:opacity-60"
            >
              Accept
            </button>
            <button
              onClick={() => updateStatus("declined")}
              disabled={updating}
              className="rounded-full bg-danger/15 px-4 py-2 text-xs font-bold uppercase tracking-wide text-danger transition-colors hover:bg-danger/25 disabled:opacity-60"
            >
              Decline
            </button>
          </>
        )}

        {whatsappLink && (
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-whatsapp px-4 py-2 text-xs font-bold uppercase tracking-wide text-ink transition-transform hover:scale-[1.03]"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
              <path d="M17.47 14.38c-.29-.14-1.7-.84-1.96-.93-.26-.1-.46-.14-.65.14-.2.29-.75.93-.92 1.12-.17.2-.34.22-.63.08-.29-.15-1.22-.45-2.32-1.43-.86-.76-1.44-1.71-1.6-2-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.51.15-.17.2-.29.29-.48.1-.2.05-.37-.02-.51-.08-.15-.65-1.57-.9-2.15-.24-.58-.48-.5-.65-.5-.17 0-.37-.02-.56-.02-.2 0-.51.07-.78.37-.26.29-1.02 1-1.02 2.43s1.05 2.82 1.19 3.01c.15.2 2.06 3.15 5 4.42.7.3 1.24.48 1.67.61.7.22 1.34.19 1.84.12.56-.08 1.7-.7 1.94-1.37.24-.68.24-1.26.17-1.38-.07-.13-.26-.2-.55-.34Z" />
              <path d="M12.02 2C6.5 2 2.02 6.48 2.02 12c0 1.87.5 3.62 1.4 5.13L2 22l4.99-1.38A9.96 9.96 0 0 0 12.02 22c5.52 0 10-4.48 10-10S17.54 2 12.02 2Zm0 18.18c-1.7 0-3.28-.5-4.61-1.36l-.33-.2-3.14.87.85-3.08-.21-.32a8.18 8.18 0 0 1-1.25-4.09c0-4.52 3.68-8.2 8.2-8.2s8.2 3.68 8.2 8.2-3.69 8.18-8.21 8.18Z" />
            </svg>
            Message on WhatsApp
          </a>
        )}

        {booking.status !== "pending" && (
          <button
            onClick={() => updateStatus("pending")}
            disabled={updating}
            className="rounded-full border border-border px-4 py-2 text-xs font-semibold uppercase tracking-wide text-mute transition-colors hover:text-paper disabled:opacity-60"
          >
            Move to pending
          </button>
        )}
      </div>
    </div>
  );
}
