"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import { useLanguage } from "@/lib/i18n";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://nyama-api-production.up.railway.app/api/v1";

export default function HelpPage() {
  const { lang, t } = useLanguage();
  const content = helpContent[lang] ?? helpContent.fr;

  const [form, setForm] = useState({
    subject: "",
    message: "",
    contactPhone: "",
    contactEmail: "",
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/support/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category: "OTHER",
          subject: form.subject,
          message: form.message,
          contactPhone: form.contactPhone || undefined,
          contactEmail: form.contactEmail || undefined,
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setSent(true);
      setForm({ subject: "", message: "", contactPhone: "", contactEmail: "" });
    } catch (err) {
      setError(content.error);
      console.error(err);
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-serif text-charcoal font-bold mb-2">
          {content.title}
        </h1>
        <p className="text-charcoal/70 mb-8">{content.intro}</p>

        <div className="grid md:grid-cols-2 gap-8">
          <section>
            <h2 className="text-xl font-bold text-charcoal mb-4">
              {content.whatsappHeading}
            </h2>
            <a
              href="https://wa.me/237699000000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-500 text-white px-6 py-3 rounded-btn font-medium hover:bg-green-600 transition-colors"
            >
              {content.whatsappCta}
            </a>
            <p className="text-sm text-charcoal/60 mt-3">
              {content.whatsappHint}
            </p>

            <h3 className="text-lg font-bold text-charcoal mt-8 mb-3">
              {content.faqHeading}
            </h3>
            <div className="space-y-3">
              {content.faq.map((q) => (
                <details
                  key={q.q}
                  className="border border-gray-200 rounded-lg p-3"
                >
                  <summary className="font-medium cursor-pointer">
                    {q.q}
                  </summary>
                  <p className="mt-2 text-sm text-charcoal/80">{q.a}</p>
                </details>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-charcoal mb-4">
              {content.formHeading}
            </h2>
            {sent ? (
              <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
                {content.success}
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-3">
                <input
                  required
                  minLength={3}
                  placeholder={content.subjectPh}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-orange-500"
                  value={form.subject}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, subject: e.target.value }))
                  }
                />
                <textarea
                  required
                  minLength={5}
                  rows={5}
                  placeholder={t("message")}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-orange-500"
                  value={form.message}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, message: e.target.value }))
                  }
                />
                <input
                  placeholder={t("phone")}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-orange-500"
                  value={form.contactPhone}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, contactPhone: e.target.value }))
                  }
                />
                <input
                  type="email"
                  placeholder={t("email")}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-orange-500"
                  value={form.contactEmail}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, contactEmail: e.target.value }))
                  }
                />
                {error && (
                  <p className="text-sm text-red-600">{error}</p>
                )}
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full bg-orange-500 text-white py-3 rounded-btn font-medium hover:bg-orange-600 transition-colors disabled:opacity-60"
                >
                  {sending ? "…" : t("submit")}
                </button>
              </form>
            )}
          </section>
        </div>
      </main>
    </>
  );
}

const helpContent = {
  fr: {
    title: "Aide & Support",
    intro:
      "Une question ? Un problème avec une commande ? On est là pour toi.",
    whatsappHeading: "Nous joindre directement",
    whatsappCta: "💬 Écrire sur WhatsApp",
    whatsappHint:
      "Du lundi au dimanche, 8h à 22h. Réponse habituelle en moins de 10 minutes.",
    faqHeading: "Questions fréquentes",
    faq: [
      {
        q: "Comment suivre ma commande ?",
        a: "Ouvre l'application NYAMA, onglet Commandes. Tu verras la position du livreur en temps réel.",
      },
      {
        q: "Je veux annuler ma commande",
        a: "C'est possible tant que la cuisinière n'a pas accepté. Passe par l'app ou contacte-nous sur WhatsApp.",
      },
      {
        q: "Devenir cuisinière ou livreur",
        a: "Remplis le formulaire sur /devenir-partenaire ou /devenir-livreur. On revient vers toi sous 48h.",
      },
    ],
    formHeading: "Ouvrir un ticket",
    subjectPh: "Sujet (ex : commande #1234)",
    success:
      "Message envoyé. On te répond sur ton numéro ou ton email sous peu.",
    error: "Impossible d'envoyer le message. Utilise WhatsApp en attendant.",
  },
  en: {
    title: "Help & Support",
    intro: "Got a question? Issue with an order? We're here for you.",
    whatsappHeading: "Reach us directly",
    whatsappCta: "💬 Chat on WhatsApp",
    whatsappHint: "Monday–Sunday, 8am–10pm. Usual reply under 10 minutes.",
    faqHeading: "Frequently asked",
    faq: [
      {
        q: "How do I track my order?",
        a: "Open the NYAMA app, Orders tab. You'll see the rider's live position.",
      },
      {
        q: "I want to cancel my order",
        a: "Possible as long as the cook hasn't accepted. Use the app or ping us on WhatsApp.",
      },
      {
        q: "Become a cook or rider",
        a: "Fill the form at /devenir-partenaire or /devenir-livreur. We get back to you within 48h.",
      },
    ],
    formHeading: "Open a ticket",
    subjectPh: "Subject (e.g. order #1234)",
    success: "Message sent. We'll reply to your phone or email shortly.",
    error: "Could not send the message. Use WhatsApp instead.",
  },
  pidgin: {
    title: "Help Me",
    intro: "You get question? Problem for chop? We dey for you.",
    whatsappHeading: "Talk to we direct",
    whatsappCta: "💬 Yab we for WhatsApp",
    whatsappHint: "Monday to Sunday, 8am to 10pm. We go reply under 10 min.",
    faqHeading: "Question wey plenty people dey ask",
    faq: [
      {
        q: "How I go see where my chop dey?",
        a: "Open NYAMA app, press Orders. You go see where bensikin man dey.",
      },
      {
        q: "I wan cancel",
        a: "You fit cancel wen cook neva accept. Use app or ping we for WhatsApp.",
      },
      {
        q: "I wan become cook or bensikin",
        a: "Fill form for /devenir-partenaire or /devenir-livreur. We go reply within 48h.",
      },
    ],
    formHeading: "Open a ticket",
    subjectPh: "Wetin (example: order #1234)",
    success: "Message don go. We go reply ya phone or email.",
    error: "We no fit send. Use WhatsApp.",
  },
} as const;
