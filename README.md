# Entertainer Booking CRM — built for Tashriek Music

A reusable booking management system for DJs, musicians, MCs, photographers
and other entertainers. Built with **Next.js 16 (App Router)**, **Tailwind
CSS v4**, and **Supabase** (database + auth), and designed to be deployed on
**Vercel**.

It replaces Instagram DM booking chaos with:

- A premium landing page (bio, latest mix, socials, booking CTA).
- A booking request form clients fill in themselves.
- An admin dashboard to accept/decline requests.
- One-tap **"Message Client on WhatsApp"** with a pre-written message,
  triggered automatically the moment a booking is accepted.

---

## 1. Stack

| Layer        | Tech                                             |
|--------------|-----------------------------------------------------|
| Framework    | Next.js 16 (App Router, TypeScript, Turbopack)      |
| Styling      | Tailwind CSS v4                                     |
| Forms        | React Hook Form + Zod validation                    |
| Database/Auth| Supabase (Postgres + Row Level Security + Auth)     |
| Hosting      | Vercel                                              |

---

## 2. Local setup

```bash
npm install
cp .env.example .env.local   # then fill in your Supabase keys, see below
npm run dev
```

Open http://localhost:3000 for the landing page and
http://localhost:3000/admin/login for the dashboard.

> **Note on fonts:** the design uses Google Fonts (Anton, Manrope, IBM Plex
> Mono) via `next/font/google`, which downloads the font files at build
> time. This needs normal internet access — it works out of the box on
> Vercel and on any machine with unrestricted internet, but will fail to
> build inside network-locked sandboxes/CI that block `fonts.googleapis.com`.

---

## 3. Supabase setup

1. Create a free project at [supabase.com](https://supabase.com).
2. Go to **SQL Editor** and run the contents of `supabase/schema.sql`. This
   creates the `bookings` table, a `booking_status` enum
   (`pending` / `accepted` / `declined`), and Row Level Security policies so:
   - Anyone (anonymous visitors) can **submit** a booking.
   - Only a **signed-in admin** can view, update, or delete bookings.
3. Go to **Authentication → Users → Add user** and create the login the
   entertainer will use to sign in at `/admin/login` (their email +
   a password you set). You don't need to build a signup flow — this is a
   single-admin system by design.
4. Go to **Project Settings → API** and copy:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Put both into `.env.local` (and later into Vercel's environment variables).

---

## 4. Deploying to Vercel

1. Push this project to a GitHub repository.
2. In [Vercel](https://vercel.com), click **New Project** and import the repo.
3. Add the two environment variables from step 3 above under
   **Settings → Environment Variables**.
4. Deploy. That's it — no server to manage.

Every future booking request, accept/decline action, and WhatsApp message
all run through Supabase and the client's browser; there's no backend to
maintain.

---

## 5. How the booking workflow works

1. A client fills in the form at `/book` (name, phone, optional email,
   event type, date, time, venue, notes). This inserts a row into
   `bookings` with `status = 'pending'`.
2. The client immediately sees an in-app confirmation screen — no email
   setup required.
3. The entertainer signs in at `/admin/login` and sees the booking appear
   in the **Pending** column of the dashboard.
4. Clicking **Accept** updates the row to `status = 'accepted'` and reveals
   a **Message on WhatsApp** button.
5. Clicking that button opens `wa.me` with the client's number and a
   pre-filled, professional message already typed in — the entertainer just
   hits send inside WhatsApp. From that point, all further back-and-forth
   happens in WhatsApp, exactly as requested.
6. **Declining** works the same way, with its own message template.
7. Any accepted booking with a future date automatically appears in the
   **Upcoming events** section at the top of the dashboard.

---

## 6. Reusing this template for a new client

Everything client-specific lives in **one file**:
`src/config/brand.ts`. To rebrand for a new DJ, musician, MC or
photographer:

1. Duplicate this project (or `git clone` it into a new repo).
2. Edit `src/config/brand.ts`:
   - Business name, tagline, bio copy, hero headline.
   - WhatsApp number, contact email, location.
   - Social links (leave any field as `""` to hide that icon).
   - Event types offered.
   - The two WhatsApp message templates (accepted / declined).
   - The latest-mix embed URL (SoundCloud, Mixcloud or YouTube).
3. Replace `public/images/profile.jpg` and `public/images/og-image.jpg`
   with the new client's photos (same filenames, so nothing else needs to
   change).
4. Optional — change the colour palette: every colour used across the
   whole app is a CSS variable defined at the top of
   `src/app/globals.css` (`--violet`, `--gold`, `--ink`, etc.). Change the
   hex values there and the entire site re-themes.
5. Create a new Supabase project for the new client (step 3 above) and
   point `.env.local` / Vercel env vars at it. **Each client gets their own
   Supabase project**, so bookings and logins never mix between clients.
6. Deploy as a new Vercel project.

No component code needs to change for a standard rebrand — the layout,
booking form, dashboard, and WhatsApp logic are all client-agnostic.

---

## 7. Project structure

```
src/
  app/
    page.tsx                  landing page
    book/page.tsx              booking form page
    admin/login/page.tsx       admin sign-in
    admin/dashboard/page.tsx   admin dashboard (protected)
  components/
    Hero, About, LatestMix, SocialLinks, Footer, Navbar, VinylRecord, Waveform
    admin/  Dashboard, BookingCard, StatusBadge, LoginForm, LogoutButton
  config/
    brand.ts                   <-- the file you edit to rebrand
  lib/
    supabase/client.ts         browser Supabase client
    supabase/server.ts         server Supabase client
    supabase/middleware.ts     session refresh + route protection
    whatsapp.ts                message templates + wa.me link builder
  types/
    booking.ts
  proxy.ts                     Next.js 16 request boundary (auth gate for /admin)
supabase/
  schema.sql                   run once per Supabase project
```

---

## 8. Design notes

The visual language (dark violet/magenta palette, a spinning vinyl record
with the artist's photo as the label, and a waveform motif used as a
loading/divider element) was chosen specifically for a DJ/entertainer
brand. If you're reusing this for a very different kind of entertainer
(e.g. a photographer), consider swapping the vinyl/waveform signature
elements for something suited to that craft — the components are isolated
in `VinylRecord.tsx` and `Waveform.tsx` so they're easy to replace without
touching layout or logic.
