import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-forest-500 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Logo & description */}
          <div className="md:col-span-2">
            <span className="text-3xl font-serif text-orange-400 font-bold">
              NYAMA
            </span>
            <p className="mt-3 text-forest-100 max-w-md">
              La première marketplace de cuisine camerounaise. Commandez vos
              plats traditionnels préférés et faites-vous livrer partout au
              Cameroun.
            </p>
          </div>

          {/* Liens */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Liens utiles</h3>
            <ul className="space-y-2 text-forest-100">
              <li>
                <Link
                  href="/devenir-partenaire"
                  className="hover:text-orange-400 transition-colors"
                >
                  Devenir partenaire
                </Link>
              </li>
              <li>
                <Link
                  href="/devenir-livreur"
                  className="hover:text-orange-400 transition-colors"
                >
                  Devenir livreur
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/login"
                  className="hover:text-orange-400 transition-colors"
                >
                  Espace Admin
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-2 text-forest-100">
              <li>support@nyama.cm</li>
              <li>+237 6XX XXX XXX</li>
              <li>Douala, Cameroun</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-forest-200 text-sm"
          style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
        >
          <p>&copy; 2026 NYAMA Cameroon. Tous droits réservés.</p>
          <p>Fait avec &#10084;&#65039; à Douala</p>
        </div>
      </div>
    </footer>
  );
}
