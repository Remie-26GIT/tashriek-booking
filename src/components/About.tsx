import { brand } from "@/config/brand";

export default function About() {
  return (
    <section id="about" className="border-t border-border px-6 py-20 sm:px-10">
      <div className="mx-auto max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-violet">
          {brand.aboutTitle}
        </p>
        <div className="mt-6 space-y-5">
          {brand.bio.map((paragraph, i) => (
            <p key={i} className="text-lg leading-relaxed text-mute">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
