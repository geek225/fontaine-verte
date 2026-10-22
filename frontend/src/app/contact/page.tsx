import Image from "next/image";
import { getFontaineVerteData } from "@/lib/wordpress";
import QuoteForm from "@/components/QuoteForm";

export const metadata = {
  title: "Contact & Devis - Fontaine Verte SARL | Abidjan Yopougon & CIAPOL",
  description:
    "Contactez Fontaine Verte SARL pour toute demande de devis, diagnostic préliminaire ou intervention d'urgence en assainissement à Abidjan et en Côte d'Ivoire.",
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const data = await getFontaineVerteData();
  const { company } = data;
  const resolvedParams = await searchParams;
  const selectedService = resolvedParams?.service;

  return (
    <div className="flex flex-col w-full">
      {/* Header Banner */}
      <section className="bg-linear-to-r from-[#00652c] via-[#15803d] to-[#006399] text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs uppercase font-extrabold tracking-widest text-[#95f8a7] block mb-2">
              Nous contacter & Demande de Devis
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
              À Votre Écoute pour un Monde Plus Sain
            </h1>
            <p className="text-base sm:text-lg text-[#d3ffd5] leading-relaxed">
              Vous avez besoin d'un diagnostic préliminaire, d'une offre de traitement de déchets ou d'un conseil réglementaire ? Nos experts vous répondent sous 24h.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 sm:py-16 lg:py-20 bg-[#faf8ff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Info Column */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#dae2fd] shadow-sm">
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#131b2e] mb-6 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#00652c] text-2xl">apartment</span>
                  Coordonnées Officielles
                </h3>

                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#d3ffd5] text-[#00652c] flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-xl">location_on</span>
                    </div>
                    <div>
                      <strong className="text-sm text-[#131b2e] block">Siège & Centre de Traitement :</strong>
                      <p className="text-xs text-[#3f493f] mt-1 leading-relaxed">
                        FONTAINE VERTE SARL<br />
                        {company.address}<br />
                        Boîte Postale : {company.postal_box}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#cde5ff] text-[#006399] flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-xl">call</span>
                    </div>
                    <div>
                      <strong className="text-sm text-[#131b2e] block">Téléphones d'urgence & devis :</strong>
                      <p className="text-xs text-[#3f493f] mt-1 space-y-1">
                        <a href="tel:+2250757947440" className="block text-[#00652c] font-bold hover:underline">
                          +225 07 57 94 74 40
                        </a>
                        <a href="tel:+2250757176987" className="block text-[#00652c] font-bold hover:underline">
                          +225 07 57 17 69 87
                        </a>
                        <a href="tel:+2250140585858" className="block text-[#00652c] font-bold hover:underline">
                          +225 01 40 58 58 58
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#eaedff] text-[#15803d] flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-xl">mail</span>
                    </div>
                    <div>
                      <strong className="text-sm text-[#131b2e] block">Courrier Électronique :</strong>
                      <a href={`mailto:${company.email}`} className="text-xs text-[#006399] font-semibold hover:underline mt-1 block">
                        {company.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#cde5ff] text-[#004b74] flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-xl">schedule</span>
                    </div>
                    <div>
                      <strong className="text-sm text-[#131b2e] block">Disponibilité Opérationnelle :</strong>
                      <p className="text-xs text-[#3f493f] mt-1 leading-relaxed">
                        Lundi – Samedi : 07h30 – 18h00<br />
                        <span className="text-[#00652c] font-bold">• Permanence urgences industrielles 24h/7j</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CIAPOL Accreditation Badge Card */}
              <div className="bg-[#131b2e] text-white rounded-3xl p-6 sm:p-8 relative overflow-hidden">
                <div className="flex items-center gap-3 mb-3">
                  <span className="material-symbols-outlined text-[#95f8a7] text-2xl">verified</span>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#95f8a7]">
                    Agrément CIAPOL
                  </span>
                </div>
                <h4 className="text-lg font-bold mb-2">Conformité Légale Garantie</h4>
                <p className="text-xs text-[#becabc] leading-relaxed">
                  Toutes les interventions font l'objet d'un bordereau de suivi et d'un certificat d'élimination supervisé par l'État de Côte d'Ivoire.
                </p>
                <div className="mt-4 pt-4 border-t border-[#283044] text-[11px] text-[#79db8d]">
                  RCCM : {company.rccm} • Capital : {company.capital}
                </div>
              </div>
            </div>

            {/* Right Form Column */}
            <div className="lg:col-span-7" id="devis">
              <QuoteForm defaultService={selectedService} />
            </div>
          </div>

          {/* Section Plan d'Accès & Site Opérationnel de Yopougon */}
          <div className="mt-12 sm:mt-16 pt-10 border-t border-[#dae2fd]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Photo du site avec badge */}
              <div className="lg:col-span-5 relative rounded-3xl overflow-hidden shadow-md aspect-video sm:aspect-16/10 lg:aspect-auto min-h-65 w-full border border-[#dae2fd]">
                <Image
                  src="/assets/reservoir-bleu.png"
                  alt="Centre technique et de traitement Fontaine Verte - Yopougon"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#131b2e]/85 via-[#131b2e]/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#95f8a7] block">
                    Site Technique & Traitement
                  </span>
                  <p className="text-sm font-bold text-white leading-tight">
                    Yopougon Gnandobité – Bel air du banco
                  </p>
                </div>
              </div>

              {/* Informations d'accès & Plan de situation */}
              <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#dae2fd] shadow-sm flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d3ffd5] text-[#00652c] text-xs font-bold uppercase tracking-wider mb-3">
                    <span className="material-symbols-outlined text-sm">explore</span>
                    Plan d'Accès & Rayon d'Intervention
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-[#131b2e] mb-2.5">
                    Comment accéder à notre centre opérationnel ?
                  </h3>
                  <p className="text-xs sm:text-sm text-[#3f493f] leading-relaxed mb-4">
                    Notre site de traitement et d'incinération thermique est situé dans la commune de <strong>Yopougon (Gnandobité – Bel air du banco, Lot 30, Îlot 6)</strong>. Il dispose d'un accès carrossable pour poids lourds, d'un pont-bascule de pesée certifié et d'une aire de stockage étanche.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                    <div className="p-3.5 rounded-xl bg-[#faf8ff] border border-[#eaedff]">
                      <strong className="text-xs font-bold text-[#131b2e] block mb-1">Périmètre d'intervention :</strong>
                      <span className="text-xs text-[#3f493f]">Tout Abidjan (Yopougon, Vridi, Koumassi, Zone 4) et intérieur de la Côte d'Ivoire.</span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-[#faf8ff] border border-[#eaedff]">
                      <strong className="text-xs font-bold text-[#131b2e] block mb-1">Accès logistique :</strong>
                      <span className="text-xs text-[#3f493f]">Réception des camions hydrocureurs, bennes ampliroll et fûts DASRI de 7h30 à 18h.</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-[#eaedff]">
                  <a
                    href="https://maps.google.com/?q=Yopougon+Abidjan+Cote+d+Ivoire"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#00652c] hover:bg-[#008138] text-white text-xs sm:text-sm font-bold shadow-sm transition-all"
                  >
                    <span className="material-symbols-outlined text-base">map</span>
                    <span>Ouvrir dans Google Maps</span>
                  </a>
                  <a
                    href="tel:+2250757947440"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#eaedff] text-[#131b2e] hover:bg-[#dae2fd] text-xs sm:text-sm font-bold transition-all"
                  >
                    <span className="material-symbols-outlined text-base">call</span>
                    <span>Ligne d'accès : +225 07 57 94 74 40</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
