export type CountryCode = {
  code: string;
  country: string;
  flag: string;
  iso: string;
};

export const COUNTRY_CODES: CountryCode[] = [
  { iso: "CM", code: "+237", country: "Cameroun", flag: "🇨🇲" },
  { iso: "FR", code: "+33", country: "France", flag: "🇫🇷" },
  { iso: "BE", code: "+32", country: "Belgique", flag: "🇧🇪" },
  { iso: "CH", code: "+41", country: "Suisse", flag: "🇨🇭" },
  { iso: "DE", code: "+49", country: "Allemagne", flag: "🇩🇪" },
  { iso: "GB", code: "+44", country: "Royaume-Uni", flag: "🇬🇧" },
  { iso: "IT", code: "+39", country: "Italie", flag: "🇮🇹" },
  { iso: "ES", code: "+34", country: "Espagne", flag: "🇪🇸" },
  { iso: "US", code: "+1", country: "États-Unis", flag: "🇺🇸" },
  { iso: "CA", code: "+1", country: "Canada", flag: "🇨🇦" },
  { iso: "CI", code: "+225", country: "Côte d'Ivoire", flag: "🇨🇮" },
  { iso: "SN", code: "+221", country: "Sénégal", flag: "🇸🇳" },
  { iso: "TD", code: "+235", country: "Tchad", flag: "🇹🇩" },
  { iso: "GA", code: "+241", country: "Gabon", flag: "🇬🇦" },
  { iso: "CG", code: "+242", country: "Congo", flag: "🇨🇬" },
  { iso: "CD", code: "+243", country: "RD Congo", flag: "🇨🇩" },
  { iso: "NG", code: "+234", country: "Nigeria", flag: "🇳🇬" },
  { iso: "RW", code: "+250", country: "Rwanda", flag: "🇷🇼" },
];

export const DEFAULT_COUNTRY = COUNTRY_CODES[0];
