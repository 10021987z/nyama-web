"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "fr" | "en" | "pidgin";

const STORAGE_KEY = "nyama_web_lang";

const dict: Record<Lang, Record<string, string>> = {
  fr: {
    home: "Accueil",
    become_partner: "Devenir partenaire",
    become_rider: "Devenir livreur",
    admin_space: "Espace Admin",
    language: "Langue",
    cgu: "Conditions d'utilisation",
    support: "Aide & Support",
    contact: "Nous contacter",
    apply: "Postuler",
    submit: "Envoyer",
    full_name: "Nom complet",
    phone: "Téléphone",
    email: "Email",
    city: "Ville",
    quartier: "Quartier",
    message: "Message",
  },
  en: {
    home: "Home",
    become_partner: "Become a partner",
    become_rider: "Become a rider",
    admin_space: "Admin",
    language: "Language",
    cgu: "Terms of Service",
    support: "Help & Support",
    contact: "Contact us",
    apply: "Apply",
    submit: "Send",
    full_name: "Full name",
    phone: "Phone",
    email: "Email",
    city: "City",
    quartier: "Area",
    message: "Message",
  },
  pidgin: {
    home: "Home",
    become_partner: "Join as cook",
    become_rider: "Join as bensikin",
    admin_space: "Admin",
    language: "Language",
    cgu: "Di rules",
    support: "Help me",
    contact: "Talk to we",
    apply: "Apply now",
    submit: "Send am",
    full_name: "Your name",
    phone: "Phone",
    email: "Email",
    city: "Town",
    quartier: "Quarter",
    message: "Wetin you wan tell we",
  },
};

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("fr");

  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
    if (stored === "fr" || stored === "en" || stored === "pidgin") {
      setLangState(stored);
    }
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem(STORAGE_KEY, l);
  };

  const t = (key: string) => dict[lang][key] ?? dict.fr[key] ?? key;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): Ctx {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    return {
      lang: "fr",
      setLang: () => {},
      t: (key: string) => dict.fr[key] ?? key,
    };
  }
  return ctx;
}

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { lang, setLang } = useLanguage();
  return (
    <select
      value={lang}
      onChange={(e) => setLang(e.target.value as Lang)}
      className={`text-sm bg-transparent border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:border-orange-500 ${className}`}
      aria-label="Language"
    >
      <option value="fr">FR</option>
      <option value="en">EN</option>
      <option value="pidgin">Pidgin</option>
    </select>
  );
}
