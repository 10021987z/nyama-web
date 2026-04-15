"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LocationSelector from "@/components/LocationSelector";
import CountryCodeSelect from "@/components/CountryCodeSelect";
import DocumentUploader from "@/components/DocumentUploader";
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
  const [idDocumentUrl, setIdDocumentUrl] = useState<string | null>(null);
  const [kitchenPhotoUrl, setKitchenPhotoUrl] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!city || !quarter) {
      setError("Veuillez sélectionner votre ville et votre quartier.");
      setLoading(false);
      return;
    }

    if (!idDocumentUrl || !kitchenPhotoUrl) {
      setError(
        "Merci de téléverser votre pièce d'identité et une photo de votre cuisine.",
      );
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
      idDocumentUrl,
      // La photo cuisine utilise le champ selfieUrl côté API
      selfieUrl: kitchenPhotoUrl,
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
              Candidature envoyée ! 🎉
            </h1>
            <p className="text-charcoal/70 text-lg mb-2">
              Un email de confirmation a été envoyé.
            </p>
            <p className="text-charcoal/60 mb-6">
              Vous recevrez une réponse sous <strong>48 heures</strong>.
            </p>
            <a
              href="https://wa.me/237699000000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-btn text-white font-semibold"
              style={{ backgroundColor: "#25D366" }}
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
              </svg>
              Contacter le support WhatsApp
            </a>
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

          {/* KYC Documents */}
          <div className="pt-2 border-t border-charcoal/10">
            <h2 className="font-serif text-xl text-charcoal mb-1">
              Documents KYC
            </h2>
            <p className="text-sm text-charcoal/60 mb-5">
              Nous avons besoin de deux pièces pour valider votre candidature.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <DocumentUploader
                label="Pièce d'identité (CNI)"
                hint="Recto-verso de la CNI"
                required
                accent="forest"
                onUploaded={setIdDocumentUrl}
              />
              <DocumentUploader
                label="Photo de la cuisine"
                hint="Plan d'ensemble propre et lumineux"
                required
                accent="forest"
                accept="image/jpeg,image/png"
                onUploaded={setKitchenPhotoUrl}
              />
            </div>
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
