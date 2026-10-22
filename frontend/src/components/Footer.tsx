import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#131b2e] text-[#faf8ff] pt-16 pb-12 border-t border-[#283044]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Identity */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#00652c] text-white flex items-center justify-center font-bold">
                <span className="material-symbols-outlined text-2xl">eco</span>
              </div>
              <div>
                <span className="font-extrabold text-xl text-white block leading-tight">
                  Fontaine Verte
                </span>
                <span className="text-[11px] font-bold text-[#79db8d] uppercase tracking-wider">
                  SARL au capital de 3 000 000 FCFA
                </span>
              </div>
            </div>
            <p className="text-sm text-[#becabc] leading-relaxed">
              Acteur majeur du développement durable en Côte d’Ivoire. Spécialiste de la collecte maîtrisée, du traitement thermique pyrolytique et de la valorisation des déchets industriels et DASRI.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#00652c]/30 border border-[#00652c] text-[#95f8a7] text-xs font-bold w-fit">
              <span className="material-symbols-outlined text-sm">verified</span>
              Agréé par le CIAPOL
            </div>
          </div>

          {/* Col 2: Services */}
          <div>
            <h4 className="text-sm font-bold text-[#95f8a7] uppercase tracking-wider mb-4">
              Pôles d’expertise
            </h4>
            <ul className="space-y-2.5 text-sm text-[#becabc]">
              <li>
                <Link href="/services#collecte" className="hover:text-white transition-colors">
                  • Collecte maîtrisée & tri sélectif
                </Link>
              </li>
              <li>
                <Link href="/services#traitement" className="hover:text-white transition-colors">
                  • Incinération pyrolytique 900–1200°C
                </Link>
              </li>
              <li>
                <Link href="/services#dasri" className="hover:text-white transition-colors">
                  • Gestion hospitalière DASRI
                </Link>
              </li>
              <li>
                <Link href="/services#recyclage" className="hover:text-white transition-colors">
                  • Recyclage huiles, solvants & métaux
                </Link>
              </li>
              <li>
                <Link href="/services#depollution" className="hover:text-white transition-colors">
                  • Dépollution & démantèlement industriel
                </Link>
              </li>
              <li>
                <Link href="/services#formation" className="hover:text-white transition-colors">
                  • Formation & conseil HSE
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Livrables & Engagements */}
          <div>
            <h4 className="text-sm font-bold text-[#95f8a7] uppercase tracking-wider mb-4">
              Garanties & Livrables
            </h4>
            <ul className="space-y-2.5 text-sm text-[#becabc]">
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-base text-[#79db8d] shrink-0 mt-0.5">verified_user</span>
                <span>Attestation officielle de traitement</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-base text-[#79db8d] shrink-0 mt-0.5">verified_user</span>
                <span>Attestation de supervision CIAPOL</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-base text-[#79db8d] shrink-0 mt-0.5">verified_user</span>
                <span>Bordereau d’enlèvement et de suivi</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-base text-[#79db8d] shrink-0 mt-0.5">verified_user</span>
                <span>Bordereau de réception des travaux</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-base text-[#79db8d] shrink-0 mt-0.5">verified_user</span>
                <span>Certificat de destruction finale</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div>
            <h4 className="text-sm font-bold text-[#95f8a7] uppercase tracking-wider mb-4">
              Siège & Contact
            </h4>
            <div className="space-y-3 text-sm text-[#becabc]">
              <p className="flex items-start gap-2">
                <span className="material-symbols-outlined text-base text-[#79db8d] shrink-0 mt-0.5">location_on</span>
                <span>ABIDJAN Yopougon Gnandobité – Bel air du banco, Lot 30, Îlot 6</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="material-symbols-outlined text-base text-[#79db8d] shrink-0">markunread_mailbox</span>
                <span>11 BP 2497 Abidjan 11</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="material-symbols-outlined text-base text-[#79db8d] shrink-0">phone</span>
                <a href="tel:+2250757947440" className="hover:text-white transition-colors">
                  +225 07 57 94 74 40
                </a>
              </p>
              <p className="flex items-center gap-2">
                <span className="material-symbols-outlined text-base text-[#79db8d] shrink-0">phone_iphone</span>
                <a href="tel:+2250140585858" className="hover:text-white transition-colors">
                  +225 01 40 58 58 58
                </a>
              </p>
              <p className="flex items-center gap-2">
                <span className="material-symbols-outlined text-base text-[#79db8d] shrink-0">mail</span>
                <a href="mailto:contact@fontaineverte.ci" className="hover:text-white transition-colors">
                  contact@fontaineverte.ci
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Legal bar */}
        <div className="pt-8 border-t border-[#283044] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#becabc]">
          <div>
            © 2026 FONTAINE VERTE SARL — RCCM : CI-ABJ-2017-B-17438. Tous droits réservés.
          </div>
          <div className="flex items-center gap-6">
            <span>Devise : « Notre souci, un monde sain ! »</span>
            <span className="text-[#79db8d]">● Système certifié CIAPOL</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
