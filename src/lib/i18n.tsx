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
    hero_title: "Vos plats préférés livrés chez vous",
    hero_subtitle: "La première marketplace de cuisine camerounaise",
    order_now: "Commander maintenant",
    specialties_title: "Découvrez nos spécialités",
    specialties_subtitle:
      "Des plats authentiques préparés avec amour par les meilleures cuisinières du Cameroun.",
    why_title: "Pourquoi rejoindre Nyama",
    why_subtitle:
      "Nous offrons aux cuisinières et livreurs les meilleurs outils pour réussir.",
    trust_title: "Ils nous font confiance",
    partner_cta_title: "Collaborez avec nous",
    partner_cta_desc: "Développez votre activité culinaire avec NYAMA",
    rider_cta_title: "Roulez avec nous",
    rider_cta_desc: "Devenez livreur et gagnez votre vie",
    stat_cooks: "Cuisinières",
    stat_dishes: "Plats",
    stat_cities: "Villes",
    stat_support: "Support",
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
    hero_title: "Your favorite meals, delivered to you",
    hero_subtitle: "The first Cameroonian food marketplace",
    order_now: "Order now",
    specialties_title: "Discover our specialties",
    specialties_subtitle:
      "Authentic dishes prepared with love by the best cooks in Cameroon.",
    why_title: "Why join Nyama",
    why_subtitle:
      "We give cooks and riders the best tools to succeed.",
    trust_title: "They trust us",
    partner_cta_title: "Partner with us",
    partner_cta_desc: "Grow your food business with NYAMA",
    rider_cta_title: "Ride with us",
    rider_cta_desc: "Become a rider and earn a living",
    stat_cooks: "Cooks",
    stat_dishes: "Dishes",
    stat_cities: "Cities",
    stat_support: "Support",
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
    hero_title: "Ya favorite chop, we go bring am ya house",
    hero_subtitle: "Di first place for Cameroon chop online",
    order_now: "Order now now",
    specialties_title: "Shine eye for our special chop",
    specialties_subtitle:
      "Correct chop wey our cook dem dey prepare with love.",
    why_title: "Why you go join Nyama",
    why_subtitle:
      "We give cook and bensikin di best tool for make dem win.",
    trust_title: "People wey trust we",
    partner_cta_title: "Join we",
    partner_cta_desc: "Make ya chop business grow with NYAMA",
    rider_cta_title: "Ride with we",
    rider_cta_desc: "Be bensikin, make ya moni",
    stat_cooks: "Cook dem",
    stat_dishes: "Chop",
    stat_cities: "Town",
    stat_support: "Support",
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
