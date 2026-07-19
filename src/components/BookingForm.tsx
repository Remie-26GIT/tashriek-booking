"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createClient } from "@/lib/supabase/client";
import { brand } from "@/config/brand";
import BookingSuccess from "@/components/BookingSuccess";
import Waveform from "@/components/Waveform";

const bookingSchema = z.object({
  client_name: z.string().min(2, "Please enter your full name"),
  phone_number: z
    .string()
    .min(9, "Please enter a valid phone number")
    .max(20, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email").optional().or(z.literal("")),
  event_type: z.string().min(1, "Please select an event type"),
  event_date: z.string().min(1, "Please select the event date"),
  event_time: z.string().min(1, "Please select the event time"),
  venue: z.string().min(2, "Please enter the venue or location"),
  notes: z.string().optional(),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

const inputClasses =
  "w-full rounded-xl border border-border bg-surface px-4 py-3 text-paper placeholder:text-mute-2 transition-colors focus:border-violet focus:outline-none";

export default function BookingForm() {
  const [submittedName, setSubmittedName] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: { event_type: "" },
  });

  const selectedEventType = watch("event_type");

  async function onSubmit(values: BookingFormValues) {
    setServerError(null);
    const supabase = createClient();

    const { error } = await supabase.from("bookings").insert({
      client_name: values.client_name,
      phone_number: values.phone_number,
      email: values.email || null,
      event_type: values.event_type,
      event_date: values.event_date,
      event_time: values.event_time,
      venue: values.venue,
      notes: values.notes || null,
      status: "pending",
    });

    if (error) {
      setServerError(
        "Something went wrong sending your request. Please try again, or reach out directly."
      );
      return;
    }

    setSubmittedName(values.client_name);
  }

  if (submittedName) {
    return <BookingSuccess clientName={submittedName} />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-7" noValidate>
      <div>
        <label htmlFor="client_name" className="mb-2 block text-sm font-semibold text-paper">
          Full name
        </label>
        <input
          id="client_name"
          type="text"
          className={inputClasses}
          placeholder="Your full name"
          {...register("client_name")}
        />
        {errors.client_name && (
          <p className="mt-2 text-sm text-danger">{errors.client_name.message}</p>
        )}
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="phone_number" className="mb-2 block text-sm font-semibold text-paper">
            Phone number
          </label>
          <input
            id="phone_number"
            type="tel"
            inputMode="tel"
            className={inputClasses}
            placeholder="071 234 5678"
            {...register("phone_number")}
          />
          {errors.phone_number && (
            <p className="mt-2 text-sm text-danger">{errors.phone_number.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-semibold text-paper">
            Email <span className="text-mute-2">(optional)</span>
          </label>
          <input
            id="email"
            type="email"
            className={inputClasses}
            placeholder="you@example.com"
            {...register("email")}
          />
          {errors.email && (
            <p className="mt-2 text-sm text-danger">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div>
        <span className="mb-3 block text-sm font-semibold text-paper">Event type</span>
        <div className="flex flex-wrap gap-2">
          {brand.eventTypes.map((type) => {
            const active = selectedEventType === type;
            return (
              <button
                key={type}
                type="button"
                onClick={() => setValue("event_type", type, { shouldValidate: true })}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "border-violet bg-violet/15 text-violet"
                    : "border-border text-mute hover:border-violet/60 hover:text-paper"
                }`}
              >
                {type}
              </button>
            );
          })}
        </div>
        {errors.event_type && (
          <p className="mt-2 text-sm text-danger">{errors.event_type.message}</p>
        )}
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="event_date" className="mb-2 block text-sm font-semibold text-paper">
            Event date
          </label>
          <input
            id="event_date"
            type="date"
            className={`${inputClasses} font-mono`}
            {...register("event_date")}
          />
          {errors.event_date && (
            <p className="mt-2 text-sm text-danger">{errors.event_date.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="event_time" className="mb-2 block text-sm font-semibold text-paper">
            Event time
          </label>
          <input
            id="event_time"
            type="time"
            className={`${inputClasses} font-mono`}
            {...register("event_time")}
          />
          {errors.event_time && (
            <p className="mt-2 text-sm text-danger">{errors.event_time.message}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="venue" className="mb-2 block text-sm font-semibold text-paper">
          Venue / location
        </label>
        <input
          id="venue"
          type="text"
          className={inputClasses}
          placeholder="Venue name and area, e.g. The Test Kitchen, Woodstock"
          {...register("venue")}
        />
        {errors.venue && (
          <p className="mt-2 text-sm text-danger">{errors.venue.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="notes" className="mb-2 block text-sm font-semibold text-paper">
          Additional notes <span className="text-mute-2">(optional)</span>
        </label>
        <textarea
          id="notes"
          rows={4}
          className={inputClasses}
          placeholder="Guest count, music preferences, timeline, or anything else worth knowing"
          {...register("notes")}
        />
      </div>

      {serverError && <p className="text-sm text-danger">{serverError}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="flex w-full items-center justify-center gap-3 rounded-full bg-gradient-to-r from-gold to-[#f3d38a] px-7 py-4 text-sm font-bold uppercase tracking-wide text-ink shadow-[0_10px_40px_-10px_rgba(232,184,92,0.6)] transition-transform hover:scale-[1.01] disabled:opacity-70"
      >
        {isSubmitting ? (
          <>
            Sending request <Waveform />
          </>
        ) : (
          "Send booking request"
        )}
      </button>
    </form>
  );
}
