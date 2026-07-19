import type { BookingStatus } from "@/types/booking";

const styles: Record<BookingStatus, string> = {
  pending: "bg-gold/15 text-gold border-gold/40",
  accepted: "bg-whatsapp/15 text-whatsapp border-whatsapp/40",
  declined: "bg-danger/15 text-danger border-danger/40",
};

const labels: Record<BookingStatus, string> = {
  pending: "Pending",
  accepted: "Accepted",
  declined: "Declined",
};

export default function StatusBadge({ status }: { status: BookingStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${styles[status]}`}
    >
      {labels[status]}
    </span>
  );
}
