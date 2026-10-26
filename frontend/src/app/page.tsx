import Link from "next/link";
import Image from "next/image";
import { getFontaineVerteData } from "@/lib/wordpress";
import QuoteForm from "@/components/QuoteForm";

export default async function HomePage() {
  const data = await getFontaineVerteData();

  return (
    <div className="flex flex-col w-full">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-linear-to-b from-[#f2f3ff] via-[#faf8ff] to-white py-10 sm:py-14 lg:py-18 border-b border-[#dae2fd]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 flex flex-col gap-5 z-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#95f8a7]/30 border border-[#15803d]/20 text-[#00652c] w-fit">
                <span className="material-symbols-outlined text-sm sm:text-base">verified</span>
                <span className="text-[11px] sm:text-xs tracking-wider uppercase font-extrabold">
                  Opérateur Agréé CIAPOL en Côte d'Ivoire
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[44px] xl:text-5xl text-[#131b2e] tracking-tight font-extrabold leading-[1.14]">
                Ensemble pour un environnement{" "}
                <span className="text-[#00652c] tracking-tight">plus sain et durable</span>
              </h1>

              <p className="text-sm sm:text-base text-[#3f493f] max-w-2xl leading-relaxed">
                Fontaine Verte SARL vous accompagne dans la gestion intégrale et responsable des déchets. Des solutions écologiques de pointe adaptées aux secteurs industriel et médical pour protéger aujourd'hui et préserver demain.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-[#15803d] text-white font-bold text-xs sm:text-sm transition-all duration-200 hover:bg-[#00652c] shadow-md shadow-[#15803d]/20 hover:scale-[1.01] whitespace-nowrap"
                >
                  <span>Découvrir nos services</span>
                  <span className="material-symbols-outlined text-base sm:text-lg">arrow_forward</span>
                </Link>
                <Link
                  href="/contact#devis"
                  className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-white text-[#00652c] border border-[#becabc] font-bold text-xs sm:text-sm shadow-xs hover:bg-[#eaedff] transition-colors whitespace-nowrap"
                >
                  <span className="material-symbols-outlined text-base sm:text-lg">assignment</span>
                  <span>Demander un diagnostic</span>
                </Link>
              </div>

              {/* Proof Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 pt-2 max-w-xl">
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white shadow-xs border border-[#dae2fd] min-w-0">
                  <div className="w-9 h-9 rounded-lg bg-[#eaedff] text-[#00652c] flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-lg">local_shipping</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs sm:text-sm font-bold text-[#131b2e] truncate">Collecte</span>
                    <span className="text-[11px] text-[#3f493f] truncate">maîtrisée & tracée</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white shadow-xs border border-[#dae2fd] min-w-0">
                  <div className="w-9 h-9 rounded-lg bg-[#eaedff] text-[#00652c] flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-lg">shield</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs sm:text-sm font-bold text-[#131b2e] truncate">Traitement</span>
                    <span className="text-[11px] text-[#3f493f] truncate">certifié CIAPOL</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white shadow-xs border border-[#dae2fd] min-w-0">
                  <div className="w-9 h-9 rounded-lg bg-[#eaedff] text-[#00652c] flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-lg">recycling</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs sm:text-sm font-bold text-[#131b2e] truncate">Valorisation</span>
                    <span className="text-[11px] text-[#3f493f] truncate">matière & recyclage</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Visual Image */}
            <div className="lg:col-span-5 relative mt-4 lg:mt-0">
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border-2 sm:border-4 border-white aspect-4/3 sm:aspect-16/10 lg:aspect-4/5 max-h-120 w-full">
                <Image
                  src="/assets/clairiere-boisee.png"
                  alt="Fontaine Verte environnement assainissement"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#131b2e]/90 via-[#131b2e]/20 to-transparent" />

                {/* Quote Box */}
                <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/95 backdrop-blur-md shadow-md flex items-center justify-between gap-3">
                  <div className="flex flex-col min-w-0">
                    <span className="text-[9px] sm:text-[10px] text-[#00652c] uppercase font-bold tracking-wider">
                      Devise d’entreprise
                    </span>
                    <span className="text-xs sm:text-sm font-extrabold text-[#131b2e] italic truncate">
                      « Notre souci, un monde sain ! »
                    </span>
                  </div>
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#15803d] text-white flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-lg">public</span>
                  </div>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="hidden sm:flex absolute -top-3 -left-4 bg-white p-2.5 sm:p-3 rounded-xl sm:rounded-2xl shadow-lg items-center gap-2.5 border border-[#dae2fd]">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#95f8a7] text-[#00210a] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-lg">factory</span>
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-extrabold text-[#131b2e] leading-tight">100% Agréé</p>
                  <p className="text-[11px] text-[#3f493f]">Supervisé par le CIAPOL</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. QUI SOMMES-NOUS ? */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-5 flex flex-col gap-3.5">
              <span className="text-[11px] sm:text-xs text-[#00652c] tracking-widest font-extrabold uppercase">
                Qui sommes-nous ?
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-[#131b2e] leading-tight">
                Fontaine Verte, un acteur engagé pour la protection de l'environnement
              </h2>
              <p className="text-[#3f493f] leading-relaxed text-xs sm:text-sm">
                FONTAINE VERTE est engagée pour la protection de l'environnement en Côte d'Ivoire. Nous tenons à nous affirmer comme un acteur majeur du développement durable. Notre force réside avant tout dans une organisation souple et des équipes soudées : des hommes qualifiés et expérimentés, partageant les mêmes valeurs.
              </p>
              <p className="text-[#3f493f] leading-relaxed text-xs sm:text-sm">
                Les mutations des villes, l'explosion démographique et les transformations industrielles ont bouleversé notre environnement. L'accumulation croissante des déchets et la raréfaction des matières premières imposent à la fois de dépolluer et d'anticiper les pollutions futures.
              </p>
              <div className="pt-1">
                <Link
                  href="/a-propos"
                  className="inline-flex items-center gap-1.5 font-bold text-[#00652c] hover:text-[#008138] text-xs sm:text-sm group"
                >
                  <span>En savoir plus sur notre histoire et nos engagements</span>
                  <span className="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
              <div className="p-4 sm:p-5 rounded-2xl bg-[#faf8ff] border border-[#dae2fd]">
                <div className="w-10 h-10 rounded-xl bg-[#cde5ff] text-[#006399] flex items-center justify-center mb-3">
                  <span className="material-symbols-outlined text-xl sm:text-2xl">policy</span>
                </div>
                <h3 className="text-base font-bold text-[#131b2e] mb-1.5">Agrément CIAPOL</h3>
                <p className="text-xs text-[#3f493f] leading-relaxed">
                  Toutes nos prestations sont exécutées sous l'agrément officiel et la supervision du Centre Ivoirien Anti-Pollution.
                </p>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-[#faf8ff] border border-[#dae2fd]">
                <div className="w-10 h-10 rounded-xl bg-[#d3ffd5] text-[#00652c] flex items-center justify-center mb-3">
                  <span className="material-symbols-outlined text-xl sm:text-2xl">local_fire_department</span>
                </div>
                <h3 className="text-base font-bold text-[#131b2e] mb-1.5">Incinération 1200°C</h3>
                <p className="text-xs text-[#3f493f] leading-relaxed">
                  Double chambre pyrolytique à haute température avec laveuse de fumées pour la destruction absolue des déchets dangereux et DASRI.
                </p>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-[#faf8ff] border border-[#dae2fd]">
                <div className="w-10 h-10 rounded-xl bg-[#eaedff] text-[#15803d] flex items-center justify-center mb-3">
                  <span className="material-symbols-outlined text-xl sm:text-2xl">fact_check</span>
                </div>
                <h3 className="text-base font-bold text-[#131b2e] mb-1.5">Traçabilité & Livrables</h3>
                <p className="text-xs text-[#3f493f] leading-relaxed">
                  Bordereaux d'enlèvement, attestations de traitement et certificats de destruction officiels fournis à la fin de chaque opération.
                </p>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-[#faf8ff] border border-[#dae2fd]">
                <div className="w-10 h-10 rounded-xl bg-[#cde5ff] text-[#004b74] flex items-center justify-center mb-3">
                  <span className="material-symbols-outlined text-xl sm:text-2xl">groups</span>
                </div>
                <h3 className="text-base font-bold text-[#131b2e] mb-1.5">Personnel Qualifié</h3>
                <p className="text-xs text-[#3f493f] leading-relaxed">
                  Des équipes formées aux règles d'hygiène, sécurité et environnement (HSE), évaluées périodiquement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. NOS PÔLES DE SERVICES */}
      <section className="py-12 sm:py-16 lg:py-20 bg-[#faf8ff] border-t border-[#dae2fd]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
            <span className="text-[11px] sm:text-xs text-[#00652c] tracking-widest font-extrabold uppercase">
              Nos Domaines d'Intervention
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-[#131b2e] mt-1.5 mb-3">
              Des solutions complètes pour l'assainissement et la filière déchets
            </h2>
            <p className="text-[#3f493f] text-xs sm:text-sm">
              De la collecte initiale jusqu'à la neutralisation thermique finale, nous couvrons l'ensemble des besoins industriels, médicaux et municipaux.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {data.services.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-2xl p-5 sm:p-6 border border-[#dae2fd] shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#d3ffd5] text-[#00652c] flex items-center justify-center mb-3.5 group-hover:scale-105 transition-transform">
                    <span className="material-symbols-outlined text-xl sm:text-2xl">{service.icon}</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#131b2e] mb-1.5 group-hover:text-[#00652c] transition-colors leading-snug">
                    {service.title}
                  </h3>
                  <p className="text-xs font-semibold text-[#006399] mb-2.5">
                    {service.subtitle}
                  </p>
                  <p className="text-xs text-[#3f493f] leading-relaxed mb-4">
                    {service.excerpt}
                  </p>
                </div>

                <div className="pt-3.5 border-t border-[#eaedff]">
                  <span className="text-[10px] sm:text-[11px] font-bold text-[#6f7a6e] block uppercase tracking-wider mb-1">
                    Livrables garantis :
                  </span>
                  <p className="text-xs text-[#131b2e] font-medium leading-snug">
                    {service.deliverables}
                  </p>
                  <div className="mt-3.5">
                    <Link
                      href={`/contact?service=${encodeURIComponent(service.title)}#devis`}
                      className="text-xs font-bold text-[#00652c] hover:underline inline-flex items-center gap-1"
                    >
                      <span>Demander un devis pour ce service</span>
                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-6 sm:px-7 py-2.5 sm:py-3 rounded-full bg-[#15803d] hover:bg-[#00652c] text-white font-bold text-xs sm:text-sm shadow-sm hover:shadow transition-all whitespace-nowrap"
            >
              <span>Consulter le détail de tous nos services</span>
              <span className="material-symbols-outlined text-base sm:text-lg">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 4. PROCESSUS EN 5 ÉTAPES */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white border-t border-[#dae2fd]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
            <span className="text-[11px] sm:text-xs text-[#00652c] tracking-widest font-extrabold uppercase">
              Méthodologie Éprouvée
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-[#131b2e] mt-1.5 mb-3">
              Processus de collecte et traitement de A à Z
            </h2>
            <p className="text-[#3f493f] text-xs sm:text-sm">
              Une démarche rigoureuse pour garantir la sécurité de votre personnel, le respect des réglementations et la traçabilité complète.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4">
            <div className="p-4 sm:p-5 rounded-2xl bg-[#faf8ff] border border-[#dae2fd] flex flex-col justify-between">
              <div>
                <span className="text-2xl sm:text-3xl font-extrabold text-[#00652c] block mb-1.5">01</span>
                <h4 className="font-bold text-sm sm:text-base text-[#131b2e] mb-1.5">Diagnostic</h4>
                <p className="text-xs text-[#3f493f] leading-relaxed">
                  Évaluation sur site des volumes et de la nature des déchets. Rédaction du rapport et du plan d'intervention.
                </p>
              </div>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-[#faf8ff] border border-[#dae2fd] flex flex-col justify-between">
              <div>
                <span className="text-2xl sm:text-3xl font-extrabold text-[#006399] block mb-1.5">02</span>
                <h4 className="font-bold text-sm sm:text-base text-[#131b2e] mb-1.5">Accord Client</h4>
                <p className="text-xs text-[#3f493f] leading-relaxed">
                  Offre technique et financière transparente, bon de commande et calendrier prévisionnel des passages.
                </p>
              </div>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-[#faf8ff] border border-[#dae2fd] flex flex-col justify-between">
              <div>
                <span className="text-2xl sm:text-3xl font-extrabold text-[#15803d] block mb-1.5">03</span>
                <h4 className="font-bold text-sm sm:text-base text-[#131b2e] mb-1.5">Collecte & Transfert</h4>
                <p className="text-xs text-[#3f493f] leading-relaxed">
                  Conditionnement aux normes, pesée, chargement sécurisé et transfert sous surveillance vers notre site agréé.
                </p>
              </div>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-[#faf8ff] border border-[#dae2fd] flex flex-col justify-between">
              <div>
                <span className="text-2xl sm:text-3xl font-extrabold text-[#00652b] block mb-1.5">04</span>
                <h4 className="font-bold text-sm sm:text-base text-[#131b2e] mb-1.5">Traitement Écologique</h4>
                <p className="text-xs text-[#3f493f] leading-relaxed">
                  Incinération pyrolytique à 1200°C, traitement physico-chimique, valorisation matière et banalisation des cendres.
                </p>
              </div>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-[#faf8ff] border border-[#dae2fd] flex flex-col justify-between">
              <div>
                <span className="text-2xl sm:text-3xl font-extrabold text-[#00652c] block mb-1.5">05</span>
                <h4 className="font-bold text-sm sm:text-base text-[#131b2e] mb-1.5">Livrables & Clôture</h4>
                <p className="text-xs text-[#3f493f] leading-relaxed">
                  Émission des certificats de destruction, attestations CIAPOL, rapport d'activité et enquête de satisfaction.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. ÉQUIPEMENT D'INCINÉRATION EN VEDETTE */}
      <section className="py-12 sm:py-16 lg:py-20 bg-[#131b2e] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-6">
              <span className="text-[11px] sm:text-xs text-[#79db8d] tracking-widest font-extrabold uppercase">
                Traitement Thermique Industriel
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-white mt-1.5 mb-4">
                Incinérateur Pyrolytique & Laveuse de Fumées
              </h2>
              <p className="text-[#becabc] text-xs sm:text-sm leading-relaxed mb-6">
                Notre équipement de pointe assure une élimination radicale des agents pathogènes et toxiques, tout en mesurant en continu la qualité de l'air pour respecter scrupuleusement les exigences du CIAPOL.
              </p>

              <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6">
                <div className="p-3.5 sm:p-4 rounded-xl bg-[#283044] border border-[#3f493f]">
                  <span className="text-xl sm:text-2xl font-black text-[#95f8a7] block">900 - 1200°C</span>
                  <span className="text-xs text-[#becabc]">Deux chambres pyrolytiques</span>
                </div>
                <div className="p-3.5 sm:p-4 rounded-xl bg-[#283044] border border-[#3f493f]">
                  <span className="text-xl sm:text-2xl font-black text-[#7bc2ff] block">70 - 90 KG/H</span>
                  <span className="text-xs text-[#becabc]">Capacité de destruction continue</span>
                </div>
                <div className="p-3.5 sm:p-4 rounded-xl bg-[#283044] border border-[#3f493f]">
                  <span className="text-xl sm:text-2xl font-black text-[#95f8a7] block">4 000 KG</span>
                  <span className="text-xs text-[#becabc]">Poids & robustesse industrielle</span>
                </div>
                <div className="p-3.5 sm:p-4 rounded-xl bg-[#283044] border border-[#3f493f]">
                  <span className="text-xl sm:text-2xl font-black text-[#7bc2ff] block">100% Filtré</span>
                  <span className="text-xs text-[#becabc]">Laveuse de fumées intégrée</span>
                </div>
              </div>

              <Link
                href="/equipements"
                className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-full bg-[#00652c] hover:bg-[#008138] text-white font-bold text-xs sm:text-sm transition-all whitespace-nowrap"
              >
                <span>Voir les spécifications complètes</span>
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </Link>
            </div>

            <div className="lg:col-span-6 relative mt-4 lg:mt-0">
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border-2 sm:border-4 border-[#283044] aspect-4/3 w-full">
                <Image
                  src="/assets/installation-industrielle.png"
                  alt="Incinérateur thermique Fontaine Verte"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FORMULAIRE DE DIAGNOSTIC / DEVIS (SECTION CONVERSION) */}
      <section id="devis" className="py-12 sm:py-16 lg:py-20 bg-[#faf8ff] border-t border-[#dae2fd]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-5 flex flex-col gap-5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#cde5ff] text-[#004b74] text-[11px] sm:text-xs font-bold uppercase tracking-wider w-fit">
                <span className="material-symbols-outlined text-sm">support_agent</span>
                Audit & Proposition rapide
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-[#131b2e] leading-tight">
                Prêt à sécuriser la gestion de vos déchets industriels ?
              </h2>
              <p className="text-[#3f493f] leading-relaxed text-xs sm:text-sm">
                Vous avez besoin de nous rencontrer ? Vous souhaitez un diagnostic préliminaire préalable à une offre d'assainissement ou du conseil ? Contactez nos experts dès aujourd'hui.
              </p>

              <div className="space-y-3 pt-1">
                <div className="flex items-start gap-3 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white border border-[#dae2fd]">
                  <span className="material-symbols-outlined text-xl sm:text-2xl text-[#00652c] shrink-0 mt-0.5">location_on</span>
                  <div>
                    <strong className="text-xs sm:text-sm text-[#131b2e] block">Site d'Abidjan :</strong>
                    <span className="text-[11px] sm:text-xs text-[#3f493f]">Yopougon Gnandobité – Bel air du banco, Lot 30, Îlot 6 (11 BP 2497 Abidjan 11)</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white border border-[#dae2fd]">
                  <span className="material-symbols-outlined text-xl sm:text-2xl text-[#006399] shrink-0 mt-0.5">call</span>
                  <div>
                    <strong className="text-xs sm:text-sm text-[#131b2e] block">Téléphones directs :</strong>
                    <span className="text-[11px] sm:text-xs text-[#3f493f] block">+225 07 57 94 74 40 / +225 07 49 92 88 16</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white border border-[#dae2fd]">
                  <span className="material-symbols-outlined text-xl sm:text-2xl text-[#15803d] shrink-0 mt-0.5">verified</span>
                  <div>
                    <strong className="text-xs sm:text-sm text-[#131b2e] block">Supervision officielle :</strong>
                    <span className="text-[11px] sm:text-xs text-[#3f493f]">Centre Ivoirien Anti-Pollution (CIAPOL)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <QuoteForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
