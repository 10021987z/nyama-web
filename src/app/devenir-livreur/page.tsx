"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LocationSelector from "@/components/LocationSelector";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const vehicleTypes = [
  { value: "moto", label: "Moto", emoji: "\uD83C\uDFCD\uFE0F" },
  { value: "velo", label: "Vélo", emoji: "\uD83D\uDEB2" },
  { value: "voiture", label: "Voiture", emoji: "\uD83D\uDE97" },
  { value: "a_pied", label: "À pied", emoji: "\uD83D\uDEB6" },
];

export default function DevenirLivreur() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [city, setCity] = useState("");
  const [quarter, setQuarter] = useState("");
  const [vehicleType, setVehicleType] = useState("moto");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = e.currentTarget;
    const data = new FormData(form);

    const body = {
      type: "livreur",
      firstName: data.get("firstName") as string,
      lastName: data.get("lastName") as string,
      phone: data.get("phone") as string,
      email: (data.get("email") as string) || undefined,
      city,
      quarter,
      vehicleType,
      idNumber: data.get("idNumber") as string,
    };

    try {
      const res = await fetch(`${API_URL}/partnerships`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => null);
        throw new Error(
          err?.message || "Une erreur est survenue. Veuillez réessayer."
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
            <div className="w-20 h-20 bg-gold-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-10 h-10 text-gold"
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
              Merci de vouloir rejoindre l&apos;équipe NYAMA.
            </p>
            <p className="text-charcoal/60">
              Nous vous contacterons sous{" "}
              <strong>48 heures</strong> pour finaliser votre inscription.
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
            Devenez livreur NYAMA
          </h1>
          <p className="text-charcoal/60 max-w-md mx-auto">
            Gagnez votre vie en livrant les meilleurs plats camerounais.
            Horaires flexibles, paiements rapides.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-card p-6 sm:p-10 card-shadow space-y-6"
        >
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
                className="w-full px-4 py-3 rounded-btn bg-background text-charcoal focus:outline-none focus:ring-2 focus:ring-gold/30 transition-shadow"
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
                className="w-full px-4 py-3 rounded-btn bg-background text-charcoal focus:outline-none focus:ring-2 focus:ring-gold/30 transition-shadow"
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
                <span className="inline-flex items-center px-3 bg-gold-50 text-gold-700 text-sm font-medium rounded-l-btn">
                  +237
                </span>
                <input
                  type="tel"
                  name="phone"
                  required
                  pattern="[0-9]{9}"
                  className="flex-1 px-4 py-3 rounded-r-btn bg-background text-charcoal focus:outline-none focus:ring-2 focus:ring-gold/30 transition-shadow"
                  placeholder="6XX XXX XXX"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-charcoal mb-1.5">
                Email
              </label>
              <input
                type="email"
                name="email"
                className="w-full px-4 py-3 rounded-btn bg-background text-charcoal focus:outline-none focus:ring-2 focus:ring-gold/30 transition-shadow"
                placeholder="votre@email.com (optionnel)"
              />
            </div>
          </div>

          {/* Location */}
          <LocationSelector
            selectedCity={city}
            selectedQuarter={quarter}
            onCityChange={setCity}
            onQuarterChange={setQuarter}
          />

          {/* Vehicle type */}
          <div>
            <label className="block text-sm font-medium text-charcoal mb-3">
              Type de véhicule <span className="text-orange-500">*</span>
            </label>
            <div className="grid grid-cols-4 gap-3">
              {vehicleTypes.map((v) => (
                <button
                  key={v.value}
                  type="button"
                  onClick={() => setVehicleType(v.value)}
                  className={`p-3 rounded-btn text-center transition-all ${
                    vehicleType === v.value
                      ? "bg-gold-50 text-gold-700 ring-2 ring-gold"
                      : "bg-background text-charcoal hover:bg-gold-50/50"
                  }`}
                >
                  <span className="block text-xl mb-0.5">{v.emoji}</span>
                  <span className="font-medium text-xs">{v.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* CNI */}
          <div>
            <label className="block text-sm font-medium text-charcoal mb-1.5">
              Numéro CNI <span className="text-orange-500">*</span>
            </label>
            <input
              type="text"
              name="idNumber"
              required
              className="w-full px-4 py-3 rounded-btn bg-background text-charcoal focus:outline-none focus:ring-2 focus:ring-gold/30 transition-shadow"
              placeholder="Numéro de carte nationale d'identité"
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
            className="w-full bg-gold text-white py-4 rounded-btn text-lg font-semibold hover:bg-gold-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Envoi en cours..." : "Devenir livreur NYAMA"}
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
