"use client";

import Image from "next/image";
import { brand } from "@/config/brand";

export default function VinylRecord() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[420px]">
      {/* Ambient glow behind the record */}
      <div
        aria-hidden
        className="absolute -inset-10 rounded-full bg-violet/20 blur-3xl"
      />

      {/* The record itself */}
      <div className="vinyl vinyl-spin relative aspect-square w-full">
        {/* Label */}
        <div className="absolute inset-[30%] overflow-hidden rounded-full border-4 border-ink shadow-inner">
          <Image
            src={brand.images.profile}
            alt={brand.businessName}
            fill
            sizes="200px"
            className="object-cover"
            priority
          />
        </div>
        {/* Center spindle */}
        <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink" />
      </div>

      {/* Tonearm */}
      <div
        aria-hidden
        className="absolute -right-4 -top-6 h-40 w-40 origin-top-right rotate-[18deg] transition-transform duration-700 ease-out sm:h-48 sm:w-48"
      >
        <div className="absolute right-6 top-0 h-full w-2 rounded-full bg-gradient-to-b from-mute-2 to-surface-2 shadow-lg" />
        <div className="absolute right-3 top-0 h-6 w-8 rounded-sm bg-surface-2 shadow" />
        <div className="absolute bottom-6 right-2 h-4 w-4 rotate-45 rounded-sm bg-gold shadow" />
      </div>
    </div>
  );
}
