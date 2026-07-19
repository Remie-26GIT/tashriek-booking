export type BookingStatus = "pending" | "accepted" | "declined";

export interface Booking {
  id: string;
  created_at: string;
  client_name: string;
  phone_number: string;
  email: string | null;
  event_type: string;
  event_date: string; // ISO date (YYYY-MM-DD)
  event_time: string; // HH:MM
  venue: string;
  notes: string | null;
  status: BookingStatus;
  whatsapp_sent_at: string | null;
}

export type NewBooking = Pick<
  Booking,
  | "client_name"
  | "phone_number"
  | "email"
  | "event_type"
  | "event_date"
  | "event_time"
  | "venue"
  | "notes"
>;
