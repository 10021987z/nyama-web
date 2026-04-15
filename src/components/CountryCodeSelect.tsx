"use client";

import { COUNTRY_CODES } from "@/lib/country-codes";

type Props = {
  value: string;
  onChange: (iso: string) => void;
  accent?: "forest" | "gold";
};

export default function CountryCodeSelect({
  value,
  onChange,
  accent = "forest",
}: Props) {
  const bg = accent === "gold" ? "bg-gold-50" : "bg-forest-50";
  const color = accent === "gold" ? "text-gold-700" : "text-forest-500";

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Indicatif pays"
      className={`px-2 py-3 ${bg} ${color} text-sm font-medium rounded-l-btn outline-none cursor-pointer border-r border-white/40`}
    >
      {COUNTRY_CODES.map((c) => (
        <option key={c.iso} value={c.iso}>
          {c.flag} {c.code}
        </option>
      ))}
    </select>
  );
}
