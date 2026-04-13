import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const specialties = [
  {
    name: "Ndolé",
    price: "2 500",
    image: "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=600&h=400&fit=crop",
  },
  {
    name: "Poulet DG",
    price: "4 500",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&h=400&fit=crop",
  },
  {
    name: "Eru",
    price: "2 000",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&h=400&fit=crop",
  },
  {
    name: "Poisson braisé",
    price: "3 500",
    image: "https://images.unsplash.com/photo-1544943910-4c1dc44aab44?w=600&h=400&fit=crop",
  },
  {
    name: "Koki",
    price: "1 800",
    image: "https://images.unsplash.com/photo-1567982047351-76b6f93e38ee?w=600&h=400&fit=crop",
  },
  {
    name: "Mbongo tchobi",
    price: "3 000",
    image: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=600&h=400&fit=crop",
  },
];

const whyJoin = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
    title: "Visibilité maximale",
    desc: "Touchez des milliers de clients dans votre ville grâce à notre marketplace.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Revenus garantis",
    desc: "Paiements sécurisés via Orange Money et MTN MoMo. Virements réguliers.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    title: "App Pro dédiée",
    desc: "Gérez vos commandes, votre menu et vos horaires depuis l'application NYAMA Pro.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "Paiements Mobile Money",
    desc: "Orange Money, MTN MoMo ou paiement à la livraison. Flexibilité totale.",
  },
];

const stats = [
  { value: "15+", label: "Cuisinières" },
  { value: "50+", label: "Plats" },
  { value: "3", label: "Villes" },
  { value: "24/7", label: "Support" },
];

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1920&h=1080&fit=crop"
            alt="Cuisine camerounaise"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-forest-500/85 via-forest-500/70 to-forest-500/90" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-[56px] text-white leading-tight mb-6">
            Vos plats préférés livrés chez vous
          </h1>
          <p className="text-xl sm:text-2xl text-forest-100 mb-4">
            La première marketplace de cuisine camerounaise
          </p>
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white px-6 py-2 rounded-full text-sm mb-10">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            Douala &middot; Yaoundé &middot; Bafoussam &middot; Kribi
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#specialites"
              className="bg-orange-500 text-white px-8 py-4 rounded-btn text-lg font-semibold hover:bg-orange-600 transition-colors"
            >
              Commander maintenant
            </a>
            <Link
              href="/devenir-partenaire"
              className="bg-transparent text-white px-8 py-4 rounded-btn text-lg font-semibold hover:bg-white/10 transition-colors"
              style={{ border: "2px solid rgba(255,255,255,0.5)" }}
            >
              Devenir partenaire
            </Link>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-white card-shadow">
        <div className="max-w-5xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div key={s.label} className="text-center animate-count">
              <p className="text-3xl sm:text-4xl font-serif text-orange-500 font-bold">
                {s.value}
              </p>
              <p className="text-charcoal/70 mt-1 font-medium">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Specialties */}
      <section id="specialites" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-serif text-3xl sm:text-4xl text-charcoal text-center mb-4">
            Découvrez nos spécialités
          </h2>
          <p className="text-center text-charcoal/60 mb-12 max-w-xl mx-auto">
            Des plats authentiques préparés avec amour par les meilleures
            cuisinières du Cameroun.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {specialties.map((dish) => (
              <div
                key={dish.name}
                className="bg-white rounded-card overflow-hidden card-shadow hover:card-shadow-hover transition-shadow group"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={dish.image}
                    alt={dish.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5 flex justify-between items-center">
                  <h3 className="font-semibold text-lg text-charcoal">
                    {dish.name}
                  </h3>
                  <span className="font-mono text-orange-500 font-bold">
                    {dish.price} XAF
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why join */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-serif text-3xl sm:text-4xl text-charcoal text-center mb-4">
            Pourquoi rejoindre Nyama
          </h2>
          <p className="text-center text-charcoal/60 mb-12 max-w-xl mx-auto">
            Nous offrons aux cuisinières et livreurs les meilleurs outils pour
            réussir.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyJoin.map((item) => (
              <div
                key={item.title}
                className="bg-background rounded-card p-6 card-shadow hover:card-shadow-hover transition-shadow text-center"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-orange-50 text-orange-500 mb-4">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-lg text-charcoal mb-2">
                  {item.title}
                </h3>
                <p className="text-charcoal/60 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA cards */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-serif text-3xl sm:text-4xl text-charcoal text-center mb-12">
            Ils nous font confiance
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link
              href="/devenir-partenaire"
              className="relative rounded-card overflow-hidden min-h-[320px] flex items-end group"
            >
              <Image
                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&h=500&fit=crop"
                alt="Cuisinière camerounaise"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="relative z-10 p-8 text-white">
                <h3 className="font-serif text-2xl sm:text-3xl mb-2">
                  Collaborez avec nous
                </h3>
                <p className="text-white/80 mb-4">
                  Développez votre activité culinaire avec NYAMA
                </p>
                <span className="inline-flex items-center gap-2 bg-orange-500 px-6 py-3 rounded-btn font-semibold hover:bg-orange-600 transition-colors">
                  Devenir partenaire
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </div>
            </Link>

            <Link
              href="/devenir-livreur"
              className="relative rounded-card overflow-hidden min-h-[320px] flex items-end group"
            >
              <Image
                src="https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&h=500&fit=crop"
                alt="Livreur moto"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="relative z-10 p-8 text-white">
                <h3 className="font-serif text-2xl sm:text-3xl mb-2">
                  Roulez avec nous
                </h3>
                <p className="text-white/80 mb-4">
                  Devenez livreur et gagnez votre vie
                </p>
                <span className="inline-flex items-center gap-2 bg-gold px-6 py-3 rounded-btn font-semibold text-white hover:bg-gold-600 transition-colors">
                  Devenir livreur
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
