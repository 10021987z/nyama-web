"use client";

import Navbar from "@/components/Navbar";
import { useLanguage } from "@/lib/i18n";

export default function CguPage() {
  const { lang } = useLanguage();
  const content = cguContent[lang] ?? cguContent.fr;

  return (
    <>
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-serif text-charcoal font-bold mb-6">
          {content.title}
        </h1>
        <p className="text-sm text-gray-500 mb-8">{content.updated}</p>
        <div className="prose prose-orange max-w-none space-y-6">
          {content.sections.map((s) => (
            <section key={s.heading}>
              <h2 className="text-xl font-bold text-charcoal mb-2">
                {s.heading}
              </h2>
              <p className="text-charcoal/80 leading-relaxed whitespace-pre-line">
                {s.body}
              </p>
            </section>
          ))}
        </div>
      </main>
    </>
  );
}

const cguContent = {
  fr: {
    title: "Conditions d'utilisation",
    updated: "Dernière mise à jour : avril 2026",
    sections: [
      {
        heading: "1. Objet",
        body: "NYAMA est une marketplace qui met en relation des cuisinières camerounaises, des livreurs indépendants et des clients. Ces conditions régissent l'utilisation de la plateforme.",
      },
      {
        heading: "2. Inscription",
        body: "L'inscription est gratuite. Les cuisinières et livreurs doivent fournir une pièce d'identité valide et accepter les conditions spécifiques à leur rôle.",
      },
      {
        heading: "3. Commandes et paiement",
        body: "Les paiements sont effectués via MTN Mobile Money, Orange Money ou cash à la livraison. NYAMA retient une commission de 15% sur chaque commande.",
      },
      {
        heading: "4. Livraison",
        body: "Les livreurs s'engagent à respecter les délais annoncés et la qualité du produit livré. En cas de problème, contactez le support.",
      },
      {
        heading: "5. Annulation et remboursement",
        body: "Une commande peut être annulée tant qu'elle n'a pas été acceptée par la cuisinière. Passé ce stade, le remboursement est étudié au cas par cas.",
      },
      {
        heading: "6. Données personnelles",
        body: "NYAMA respecte votre vie privée. Vos données ne sont jamais vendues à des tiers.",
      },
      {
        heading: "7. Contact",
        body: "Pour toute question : support@nyama.cm ou WhatsApp +237 699 000 000.",
      },
    ],
  },
  en: {
    title: "Terms of Service",
    updated: "Last updated: April 2026",
    sections: [
      {
        heading: "1. Purpose",
        body: "NYAMA is a marketplace connecting Cameroonian cooks, independent riders and customers. These terms govern the use of the platform.",
      },
      {
        heading: "2. Registration",
        body: "Registration is free. Cooks and riders must provide a valid ID and accept the role-specific conditions.",
      },
      {
        heading: "3. Orders and payment",
        body: "Payments are made via MTN Mobile Money, Orange Money or cash on delivery. NYAMA takes a 15% commission on each order.",
      },
      {
        heading: "4. Delivery",
        body: "Riders commit to respecting announced timings and the quality of delivered goods. For any issue, contact support.",
      },
      {
        heading: "5. Cancellation and refund",
        body: "An order can be cancelled as long as it hasn't been accepted by the cook. After that, refunds are reviewed case by case.",
      },
      {
        heading: "6. Personal data",
        body: "NYAMA respects your privacy. Your data is never sold to third parties.",
      },
      {
        heading: "7. Contact",
        body: "Any question: support@nyama.cm or WhatsApp +237 699 000 000.",
      },
    ],
  },
  pidgin: {
    title: "Di Rules",
    updated: "Last change: April 2026",
    sections: [
      {
        heading: "1. Wetin dis be",
        body: "NYAMA na place wey dey connect cook, bensikin man and customer. Dese rules dey show how we go use am.",
      },
      {
        heading: "2. How to join",
        body: "Registration no cost anytin. Cook and bensikin must show ID paper and agree to di work rules.",
      },
      {
        heading: "3. Di moni matter",
        body: "Pay dey go through MTN Momo, Orange Money or cash wen chop reach. NYAMA dey take 15% for every chop.",
      },
      {
        heading: "4. Delivery",
        body: "Bensikin man must respect time and di chop condition. If any wahala dey, call support.",
      },
      {
        heading: "5. If you wan cancel",
        body: "You fit cancel wen cook neva accept. After dat, we go look am one by one.",
      },
      {
        heading: "6. Ya information",
        body: "NYAMA no dey sell ya information to nobody.",
      },
      {
        heading: "7. Call we",
        body: "For any palava: support@nyama.cm or WhatsApp +237 699 000 000.",
      },
    ],
  },
} as const;
