"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md card-shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-serif text-orange-500 font-bold">
              NYAMA
            </span>
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-charcoal hover:text-orange-500 transition-colors font-medium"
            >
              Accueil
            </Link>
            <Link
              href="/devenir-partenaire"
              className="text-charcoal hover:text-orange-500 transition-colors font-medium"
            >
              Devenir partenaire
            </Link>
            <Link
              href="/devenir-livreur"
              className="text-charcoal hover:text-orange-500 transition-colors font-medium"
            >
              Devenir livreur
            </Link>
            <Link
              href="/admin/login"
              className="bg-forest-500 text-white px-5 py-2 rounded-btn font-medium hover:bg-forest-600 transition-colors"
            >
              Espace Admin
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            <svg
              className="w-6 h-6 text-charcoal"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden pb-4 space-y-3">
            <Link
              href="/"
              className="block text-charcoal hover:text-orange-500 transition-colors font-medium py-2"
              onClick={() => setMobileOpen(false)}
            >
              Accueil
            </Link>
            <Link
              href="/devenir-partenaire"
              className="block text-charcoal hover:text-orange-500 transition-colors font-medium py-2"
              onClick={() => setMobileOpen(false)}
            >
              Devenir partenaire
            </Link>
            <Link
              href="/devenir-livreur"
              className="block text-charcoal hover:text-orange-500 transition-colors font-medium py-2"
              onClick={() => setMobileOpen(false)}
            >
              Devenir livreur
            </Link>
            <Link
              href="/admin/login"
              className="block bg-forest-500 text-white px-5 py-2 rounded-btn font-medium text-center hover:bg-forest-600 transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              Espace Admin
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
