"use client";

import { useState } from "react";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://nyama-api-production.up.railway.app/api/v1";

const API_ORIGIN = API_URL.replace(/\/api\/v1\/?$/, "");

type Props = {
  label: string;
  hint?: string;
  required?: boolean;
  accept?: string;
  accent?: "gold" | "forest" | "orange";
  onUploaded: (url: string | null) => void;
};

const accentMap = {
  gold: {
    ring: "focus:ring-gold/30",
    active: "bg-gold-50 text-gold-700 ring-2 ring-gold",
    button: "bg-gold text-white hover:bg-gold-600",
  },
  forest: {
    ring: "focus:ring-forest-500/30",
    active: "bg-forest-50 text-forest-700 ring-2 ring-forest-500",
    button: "bg-forest-500 text-white hover:bg-forest-600",
  },
  orange: {
    ring: "focus:ring-orange-500/30",
    active: "bg-orange-50 text-orange-700 ring-2 ring-orange-500",
    button: "bg-orange-500 text-white hover:bg-orange-600",
  },
};

export default function DocumentUploader({
  label,
  hint,
  required,
  accept = "image/jpeg,image/png,application/pdf",
  accent = "gold",
  onUploaded,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const tone = accentMap[accent];

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch(`${API_URL}/uploads/document`, {
        method: "POST",
        body: fd,
      });
      if (!res.ok) {
        const err = await res.json().catch(() => null);
        const msg = Array.isArray(err?.message)
          ? err.message.join(" · ")
          : err?.message;
        throw new Error(msg || `Erreur ${res.status}`);
      }
      const data = await res.json();
      setFileName(file.name);
      setUploadedUrl(data.url);
      onUploaded(data.url);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Erreur d'envoi du fichier";
      setError(message);
      onUploaded(null);
    } finally {
      setLoading(false);
      e.target.value = "";
    }
  }

  function clear() {
    setFileName(null);
    setUploadedUrl(null);
    onUploaded(null);
  }

  const preview = uploadedUrl
    ? uploadedUrl.startsWith("http")
      ? uploadedUrl
      : `${API_ORIGIN}${uploadedUrl}`
    : null;

  return (
    <div>
      <label className="block text-sm font-medium text-charcoal mb-1.5">
        {label} {required && <span className="text-orange-500">*</span>}
      </label>
      {hint && <p className="text-xs text-charcoal/50 mb-2">{hint}</p>}
      {uploadedUrl ? (
        <div
          className={`flex items-center gap-3 p-3 rounded-btn ${tone.active}`}
        >
          {preview && (
            <div className="w-14 h-14 rounded-md overflow-hidden bg-white flex-shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={preview}
                alt={fileName ?? "document"}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold truncate">
              {fileName ?? "Document chargé"}
            </p>
            <p className="text-xs opacity-70">Fichier prêt à être envoyé</p>
          </div>
          <button
            type="button"
            onClick={clear}
            className="text-xs underline opacity-80 hover:opacity-100"
          >
            Remplacer
          </button>
        </div>
      ) : (
        <label
          className={`flex flex-col items-center justify-center w-full py-6 px-4 rounded-btn bg-background border-2 border-dashed border-charcoal/15 cursor-pointer transition-colors hover:bg-charcoal/5 ${tone.ring}`}
        >
          <svg
            className="w-8 h-8 text-charcoal/40 mb-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16a4 4 0 01-.88-7.9A5 5 0 0115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          <span className="text-sm text-charcoal/70">
            {loading ? "Envoi…" : "Cliquer pour choisir un fichier"}
          </span>
          <span className="text-xs text-charcoal/40 mt-0.5">
            JPG, PNG, PDF · max 5 Mo
          </span>
          <input
            type="file"
            accept={accept}
            disabled={loading}
            onChange={handleFile}
            className="hidden"
          />
        </label>
      )}
      {error && (
        <p className="mt-1.5 text-xs text-red-600">{error}</p>
      )}
    </div>
  );
}
