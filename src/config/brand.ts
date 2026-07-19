/**
 * BRAND CONFIG
 * ------------------------------------------------------------------
 * This is the single file to edit when reusing this template for a
 * new entertainer (DJ, musician, MC, photographer, etc).
 *
 * Nothing else in the codebase should need to change for a rebrand:
 *  - Swap the text below.
 *  - Swap the images in /public/images (same filenames).
 *  - Update the CSS variables in src/app/globals.css if you also
 *    want a different colour palette.
 *  - Update your .env with the new Supabase project + WhatsApp number.
 * ------------------------------------------------------------------
 */

export type MixProvider = "soundcloud" | "mixcloud" | "youtube";

export const brand = {
  // Core identity
  businessName: "Tashriek Music",
  tagline: "Cape Town DJ & Entertainer",
  heroHeadline: "Music that moves the room.",
  heroSubheadline:
    "Cape Town-based DJ and entertainer bringing curated sound and unforgettable energy to weddings, private parties, corporate events and club nights.",

  // About / bio section
  aboutTitle: "About Tashriek",
  bio: [
    "Tashriek Music is a Cape Town-based DJ and entertainer with a reputation for reading a room and keeping it moving all night long.",
    "From intimate private functions to large club nights and corporate functions, every set is built around one goal: giving guests an experience they'll talk about long after the last song.",
  ],

  // Location & contact
  location: "Cape Town, South Africa",
  whatsappNumber: "27724323283s", // international format, no + or leading 0
  contactEmail: "bookings@tashriekmusic.co.za",

  // Images (place files in /public/images with these exact names)
  images: {
    profile: "/images/profile.jpg",
    ogImage: "/images/og-image.jpg",
  },

  // Embedded latest mix — swap the src URL for a SoundCloud / Mixcloud / YouTube embed
  latestMix: {
    title: "Latest Mix",
    embedUrl:
      "https://w.soundcloud.com/player/?url=https%3A%2F%2Fsoundcloud.com%2Fsoundcloud%2Fsets%2Fsoundcloud-pulse-charts&color=%23b163f2&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false",
    provider: "soundcloud" as MixProvider,
  },

  // Social links — leave a link blank ("") to hide that icon
  socials: {
    instagram: "https://instagram.com/tashriekmusic",
    tiktok: "https://tiktok.com/@tashriekmusic",
    youtube: "https://youtube.com/@tashriekmusic",
    facebook: "",
  },

  // Event types offered — shown as options in the booking form
  eventTypes: [
    "Wedding",
    "Birthday Party",
    "Club Event",
    "Corporate Event",
    "Private Event",
    "Other",
  ],

  // WhatsApp message sent to a client once a booking is accepted.
  // Available placeholders: {clientName}, {eventDate}, {eventType}, {businessName}
  whatsappAcceptedTemplate:
    "Hi {clientName}, thank you for booking {businessName}. Your booking request for {eventDate} has been accepted. I'm looking forward to discussing the final details of your event with you. Feel free to send through any additional information regarding your event.",

  // WhatsApp message sent to a client if a booking is declined.
  whatsappDeclinedTemplate:
    "Hi {clientName}, thank you for your interest in booking {businessName} for your event on {eventDate}. Unfortunately I'm unable to take on this booking, but I really appreciate you thinking of me. Wishing you all the best for your event!",

  // Footer
  footerNote: "Professional bookings, organised through WhatsApp.",
};

export type Brand = typeof brand;
