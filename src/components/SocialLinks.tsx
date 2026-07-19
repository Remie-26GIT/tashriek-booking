import { brand } from "@/config/brand";

type IconProps = { className?: string };

function InstagramIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className={className}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TikTokIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M16.6 5.82a4.28 4.28 0 0 1-3.16-1.4A4.27 4.27 0 0 1 12.4 1.5H9.4v14.1a2.6 2.6 0 1 1-2.6-2.6c.25 0 .5.03.73.09V10a5.6 5.6 0 1 0 4.87 5.55V9.03a7.24 7.24 0 0 0 4.2 1.34V7.37a4.26 4.26 0 0 1-2-.13v.02Z" />
    </svg>
  );
}

function YoutubeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className={className}>
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
      <path d="M10.5 9.5 15 12l-4.5 2.5v-5Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className={className}>
      <path d="M15 8.5h2V5.2c-.35-.05-1.53-.15-2.9-.15-2.87 0-4.84 1.75-4.84 4.97V12.5H6.6v3.7h2.66V21H13v-4.8h2.55l.4-3.7H13V10.4c0-1.07.29-1.9 1.9-1.9Z" />
    </svg>
  );
}

const links = [
  { key: "instagram", label: "Instagram", Icon: InstagramIcon },
  { key: "tiktok", label: "TikTok", Icon: TikTokIcon },
  { key: "youtube", label: "YouTube", Icon: YoutubeIcon },
  { key: "facebook", label: "Facebook", Icon: FacebookIcon },
] as const;

export default function SocialLinks({ className = "" }: { className?: string }) {
  const active = links.filter((l) => brand.socials[l.key]);

  if (active.length === 0) return null;

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {active.map(({ key, label, Icon }) => (
        <a
          key={key}
          href={brand.socials[key]}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-mute transition-colors hover:border-violet hover:text-violet"
        >
          <Icon className="h-5 w-5" />
        </a>
      ))}
    </div>
  );
}
