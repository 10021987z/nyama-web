"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LocationSelector from "@/components/LocationSelector";
import CountryCodeSelect from "@/components/CountryCodeSelect";
import { COUNTRY_CODES, DEFAULT_COUNTRY } from "@/lib/country-codes";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://nyama-api-production.up.railway.app/api/v1";

function trim(v: FormDataEntryValue | null): string {
  return (v as string | null)?.toString().trim() ?? "";
}

export default function DevenirPartenaire() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [type, setType] = useState("cuisiniere");
  const [city, setCity] = useState("");
  const [quarter, setQuarter] = useState("");
  const [countryIso, setCountryIso] = useState(DEFAULT_COUNTRY.iso);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!city || !quarter) {
      setError("Veuillez sélectionner votre ville et votre quartier.");
      setLoading(false);
      return;
    }

    const form = e.currentTarget;
    const data = new FormData(form);
    const country =
      COUNTRY_CODES.find((c) => c.iso === countryIso) ?? DEFAULT_COUNTRY;
    const phoneDigits = trim(data.get("phone")).replace(/[^0-9]/g, "");
    const email = trim(data.get("email"));
    const description = trim(data.get("description"));

    const body = {
      type,
      firstName: trim(data.get("firstName")),
      lastName: trim(data.get("lastName")),
      phone: `${country.code}${phoneDigits}`,
      email: email || undefined,
      companyName: trim(data.get("companyName")) || undefined,
      description: description || undefined,
      city,
      quarter,
    };

    try {
      const res = await fetch(`${API_URL}/partnerships`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => null);
        const msg = Array.isArray(err?.message)
          ? err.message.join(" · ")
          : err?.message;
        throw new Error(
          msg || `Erreur ${res.status} — veuillez réessayer.`,
        );
      }

      setSubmitted(true);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Erreur de connexion au serveur.";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <main className="min-h-screen">
        <Navbar />
        <div className="max-w-2xl mx-auto px-4 py-20 text-center">
          <div className="bg-white rounded-card p-12 card-shadow">
            <div className="w-20 h-20 bg-forest-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-10 h-10 text-forest-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="font-serif text-3xl text-charcoal mb-4">
              Candidature envoyée !
            </h1>
            <p className="text-charcoal/70 text-lg mb-2">
              Merci pour votre intérêt envers NYAMA.
            </p>
            <p className="text-charcoal/60">
              Notre équipe examinera votre candidature et vous contactera sous{" "}
              <strong>48 heures</strong>.
            </p>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <Navbar />

      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="font-serif text-3xl sm:text-[40px] text-charcoal mb-3">
            Rejoignez la famille NYAMA
          </h1>
          <p className="text-charcoal/60 max-w-md mx-auto">
            Développez votre activité culinaire et touchez de nouveaux clients
            dans votre ville.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-card p-6 sm:p-10 card-shadow space-y-6"
        >
          {/* Type */}
          <div>
            <label className="block text-sm font-medium text-charcoal mb-3">
              Type de partenariat
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setType("cuisiniere")}
                className={`p-4 rounded-btn text-center transition-all ${
                  type === "cuisiniere"
                    ? "bg-orange-50 text-orange-600 ring-2 ring-orange-500"
                    : "bg-background text-charcoal hover:bg-orange-50/50"
                }`}
              >
                <span className="block text-2xl mb-1">&#127859;</span>
                <span className="font-medium text-sm">Restaurant</span>
              </button>
              <button
                type="button"
                onClick={() => setType("cuisiniere")}
                className={`p-4 rounded-btn text-center transition-all ${
                  type === "cuisiniere"
                    ? "bg-orange-50 text-orange-600 ring-2 ring-orange-500"
                    : "bg-background text-charcoal hover:bg-orange-50/50"
                }`}
              >
                <span className="block text-2xl mb-1">&#127858;</span>
                <span className="font-medium text-sm">
                  Cuisinière / Traiteur
                </span>
              </button>
            </div>
          </div>

          {/* Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-charcoal mb-1.5">
                Prénom <span className="text-orange-500">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                required
                className="w-full px-4 py-3 rounded-btn bg-background text-charcoal focus:outline-none focus:ring-2 focus:ring-orange-500/30 transition-shadow"
                placeholder="Votre prénom"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-charcoal mb-1.5">
                Nom <span className="text-orange-500">*</span>
              </label>
              <input
                type="text"
                name="lastName"
                required
                className="w-full px-4 py-3 rounded-btn bg-background text-charcoal focus:outline-none focus:ring-2 focus:ring-orange-500/30 transition-shadow"
                placeholder="Votre nom"
              />
            </div>
          </div>

          {/* Phone & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-charcoal mb-1.5">
                Téléphone <span className="text-orange-500">*</span>
              </label>
              <div className="flex">
                <CountryCodeSelect
                  value={countryIso}
                  onChange={setCountryIso}
                  accent="forest"
                />
                <input
                  type="tel"
                  name="phone"
                  required
                  pattern="[0-9 ]{6,15}"
                  className="flex-1 px-4 py-3 rounded-r-btn bg-background text-charcoal focus:outline-none focus:ring-2 focus:ring-orange-500/30 transition-shadow"
                  placeholder="6XX XXX XXX"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-charcoal mb-1.5">
                Email <span className="text-orange-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                required
                className="w-full px-4 py-3 rounded-btn bg-background text-charcoal focus:outline-none focus:ring-2 focus:ring-orange-500/30 transition-shadow"
                placeholder="votre@email.com"
              />
            </div>
          </div>

          {/* Company name */}
          <div>
            <label className="block text-sm font-medium text-charcoal mb-1.5">
              Nom de l&apos;établissement{" "}
              <span className="text-orange-500">*</span>
            </label>
            <input
              type="text"
              name="companyName"
              required
              className="w-full px-4 py-3 rounded-btn bg-background text-charcoal focus:outline-none focus:ring-2 focus:ring-orange-500/30 transition-shadow"
              placeholder="Ex: Chez Maman Rose"
            />
          </div>

          {/* Location */}
          <LocationSelector
            selectedCity={city}
            selectedQuarter={quarter}
            onCityChange={setCity}
            onQuarterChange={setQuarter}
          />

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-charcoal mb-1.5">
              Description de votre cuisine
            </label>
            <textarea
              name="description"
              rows={4}
              className="w-full px-4 py-3 rounded-btn bg-background text-charcoal focus:outline-none focus:ring-2 focus:ring-orange-500/30 transition-shadow resize-none"
              placeholder="Décrivez vos spécialités, votre expérience..."
            />
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 px-4 py-3 rounded-btn text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-forest-500 text-white py-4 rounded-btn text-lg font-semibold hover:bg-forest-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Envoi en cours..." : "Soumettre ma candidature"}
          </button>

          <p className="text-center text-xs text-charcoal/40 flex items-center justify-center gap-1.5">
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            Données chiffrées TLS 1.3
          </p>
        </form>
      </div>

      <Footer />
    </main>
  );
}
