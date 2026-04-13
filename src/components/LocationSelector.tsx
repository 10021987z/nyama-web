"use client";

import { cameroonLocations, cities } from "@/data/cameroon-locations";

interface LocationSelectorProps {
  selectedCity: string;
  selectedQuarter: string;
  onCityChange: (city: string) => void;
  onQuarterChange: (quarter: string) => void;
}

export default function LocationSelector({
  selectedCity,
  selectedQuarter,
  onCityChange,
  onQuarterChange,
}: LocationSelectorProps) {
  const quarters = selectedCity ? cameroonLocations[selectedCity] || [] : [];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-charcoal mb-1.5">
          Ville <span className="text-orange-500">*</span>
        </label>
        <select
          value={selectedCity}
          onChange={(e) => {
            onCityChange(e.target.value);
            onQuarterChange("");
          }}
          required
          className="w-full px-4 py-3 rounded-btn bg-background text-charcoal focus:outline-none focus:ring-2 focus:ring-orange-500/30 transition-shadow appearance-none"
        >
          <option value="">Sélectionner une ville</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-charcoal mb-1.5">
          Quartier <span className="text-orange-500">*</span>
        </label>
        <select
          value={selectedQuarter}
          onChange={(e) => onQuarterChange(e.target.value)}
          required
          disabled={!selectedCity}
          className="w-full px-4 py-3 rounded-btn bg-background text-charcoal focus:outline-none focus:ring-2 focus:ring-orange-500/30 transition-shadow appearance-none disabled:opacity-50"
        >
          <option value="">
            {selectedCity
              ? "Sélectionner un quartier"
              : "Choisissez d'abord une ville"}
          </option>
          {quarters.map((q) => (
            <option key={q} value={q}>
              {q}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
