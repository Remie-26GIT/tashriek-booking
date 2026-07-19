import { brand } from "@/config/brand";
import type { Booking } from "@/types/booking";

/**
 * Normalises a South African-style local number (e.g. 071 234 5678)
 * or an already-international number into the digits-only
 * international format that wa.me expects (e.g. 27712345678).
 */
export function normalisePhoneNumber(raw: string): string {
  const digits = raw.replace(/\D/g, "");

  if (digits.startsWith("0")) {
    // Local SA number like 0712345678 -> 27712345678
    return `27${digits.slice(1)}`;
  }

  if (digits.startsWith("27")) {
    return digits;
  }

  // Already has some other country code, or is otherwise international
  return digits;
}

function formatEventDate(isoDate: string): string {
  const date = new Date(`${isoDate}T00:00:00`);
  return date.toLocaleDateString("en-ZA", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function fillTemplate(
  template: string,
  booking: Pick<Booking, "client_name" | "event_date" | "event_type">
): string {
  return template
    .replaceAll("{clientName}", booking.client_name)
    .replaceAll("{eventDate}", formatEventDate(booking.event_date))
    .replaceAll("{eventType}", booking.event_type)
    .replaceAll("{businessName}", brand.businessName);
}

export function buildAcceptedMessage(booking: Booking): string {
  return fillTemplate(brand.whatsappAcceptedTemplate, booking);
}

export function buildDeclinedMessage(booking: Booking): string {
  return fillTemplate(brand.whatsappDeclinedTemplate, booking);
}

export function buildWhatsappLink(phoneNumber: string, message: string): string {
  const number = normalisePhoneNumber(phoneNumber);
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
