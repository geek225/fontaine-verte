import Image from "next/image";
import Link from "next/link";
import { getFontaineVerteData } from "@/lib/wordpress";

export const metadata = {
  title: "À Propos - Fontaine Verte SARL | Engagement Écologique & Agrément CIAPOL",
  description:
    "Découvrez l'histoire, la vision et l'engagement de Fontaine Verte SARL pour la protection environnementale et le traitement des déchets en Côte d'Ivoire.",
};

export default async function AProposPage() {
  const data = await getFontaineVerteData();
  const { company } = data;

  return (
    <div className="flex flex-col w-full">
      {/* Header Banner */}
      <section className="bg-linear-to-r from-[#00652c] via-[#15803d] to-[#006399] text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs uppercase font-extrabold tracking-widest text-[#95f8a7] block mb-2">
              Qui sommes-nous ?
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
              Fontaine Verte, un acteur engagé pour la protection de l’environnement
            </h1>
            <p className="text-base sm:text-lg text-[#d3ffd5] leading-relaxed">
              Nous accompagnons la croissance des activités humaines et industrielles en respectant la nature et les générations futures.
            </p>
          </div>
        </div>
      </section>

      {/* Main Presentation */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 flex flex-col gap-6">
              <span className="text-xs text-[#00652c] uppercase font-bold tracking-wider">
                Notre Philosophie
              </span>
              <h2 className="text-3xl font-extrabold text-[#131b2e] leading-tight">
                « Notre souci, c’est un monde sain ! »
              </h2>
              <p className="text-[#3f493f] leading-relaxed">
                Les mutations des villes, l’explosion démographique et les transformations industrielles ont bouleversé depuis des décennies notre environnement en Afrique de l’Ouest. L’accumulation croissante des déchets et la raréfaction des matières premières imposent à la fois de dépolluer et d’anticiper les pollutions futures.
              </p>
              <div className="p-6 rounded-2xl bg-[#faf8ff] border border-[#dae2fd] border-l-4 border-l-[#00652c]">
                <h4 className="font-bold text-base text-[#131b2e] mb-2">Notre vision à court terme :</h4>
                <p className="text-sm text-[#3f493f] leading-relaxed">
                  Proposer des solutions concrètes pour répondre aux besoins du secteur industriel et médical par l’innovation technologique, en intégrant la responsabilité sociétale (RSE) dans notre stratégie pour créer de la valeur durable avec nos partenaires.
                </p>
              </div>
              <p className="text-[#3f493f] leading-relaxed">
                Notre force réside avant tout dans une organisation souple et des équipes soudées : des hommes qualifiés et expérimentés, partageant les mêmes valeurs d’éthique et de sécurité.
              </p>
            </div>

            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-square">
                <Image
                  src="/assets/clairiere-rustique.png"
                  alt="Nature et engagement écologique"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-square mt-8">
                <Image
                  src="/assets/paysage-verdoyant.png"
                  alt="Environnement préservé Côte d'Ivoire"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cadre Légal & Agrément CIAPOL */}
      <section className="py-16 bg-[#faf8ff] border-t border-[#dae2fd]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs uppercase font-extrabold tracking-widest text-[#00652c]">
              Sécurité Juridique & Conformité
            </span>
            <h2 className="text-3xl font-extrabold text-[#131b2e] mt-2 mb-4">
              Agrément d’État & Documents Administratifs
            </h2>
            <p className="text-sm text-[#3f493f]">
              FONTAINE VERTE opère dans le strict respect de la réglementation ivoirienne et internationale en matière d’assainissement et de gestion des résidus industriels.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-[#dae2fd] shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-[#d3ffd5] text-[#00652c] flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-2xl">verified</span>
              </div>
              <h3 className="text-lg font-bold text-[#131b2e] mb-2">Agrément CIAPOL</h3>
              <p className="text-xs text-[#3f493f] leading-relaxed mb-4">
                Agrément du Centre Ivoirien Anti-Pollution habilitant FONTAINE VERTE pour l’ensemble des opérations de collecte, transport et traitement des déchets sur le territoire.
              </p>
              <span className="text-xs font-bold text-[#00652c] inline-block">Supervision officielle continue</span>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#dae2fd] shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-[#cde5ff] text-[#006399] flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-2xl">badge</span>
              </div>
              <h3 className="text-lg font-bold text-[#131b2e] mb-2">Registre de Commerce (RCCM)</h3>
              <p className="text-xs text-[#3f493f] leading-relaxed mb-4">
                Immatriculation légale au Greffe du Tribunal de Commerce d’Abidjan :
                <br /><strong>RCCM : {company.rccm}</strong>
                <br />Capital social : {company.capital}
              </p>
              <span className="text-xs font-bold text-[#006399] inline-block">SARL déclarée et conforme</span>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#dae2fd] shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-[#eaedff] text-[#15803d] flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-2xl">receipt_long</span>
              </div>
              <h3 className="text-lg font-bold text-[#131b2e] mb-2">Déclaration Fiscale d’Existence</h3>
              <p className="text-xs text-[#3f493f] leading-relaxed mb-4">
                Entreprise à jour de ses obligations fiscales auprès de la Direction Générale des Impôts de Côte d’Ivoire.
              </p>
              <span className="text-xs font-bold text-[#15803d] inline-block">Transparence financière</span>
            </div>
          </div>
        </div>
      </section>

      {/* Livrables de Prestation */}
      <section className="py-16 bg-white border-t border-[#dae2fd]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-4/3 w-full">
                <Image
                  src="/assets/entrepot-turquoise.png"
                  alt="Dépôt et logistique Fontaine Verte"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-7 flex flex-col gap-4">
              <span className="text-xs uppercase font-extrabold tracking-widest text-[#00652c]">
                Traçabilité Totale
              </span>
              <h2 className="text-3xl font-extrabold text-[#131b2e]">
                5 Livrables Officiels Garantissant la Fin de Chaque Prestation
              </h2>
              <p className="text-sm text-[#3f493f]">
                Toute intervention réalisée par Fontaine Verte est validée par la remise des pièces justificatives indispensables pour vos audits internes et les contrôles environnementaux :
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#faf8ff] border border-[#dae2fd]">
                  <span className="material-symbols-outlined text-[#00652c] text-xl shrink-0 mt-0.5">check_circle</span>
                  <div>
                    <strong className="text-sm text-[#131b2e] block">Attestation de traitement des déchets</strong>
                    <span className="text-xs text-[#3f493f]">Certifie la destruction ou valorisation finale sur notre site de traitement agréé.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#faf8ff] border border-[#dae2fd]">
                  <span className="material-symbols-outlined text-[#00652c] text-xl shrink-0 mt-0.5">check_circle</span>
                  <div>
                    <strong className="text-sm text-[#131b2e] block">Attestation de supervision du CIAPOL</strong>
                    <span className="text-xs text-[#3f493f]">Atteste du bon fonctionnement et du contrôle effectif par l’organisme d’État anti-pollution.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#faf8ff] border border-[#dae2fd]">
                  <span className="material-symbols-outlined text-[#00652c] text-xl shrink-0 mt-0.5">check_circle</span>
                  <div>
                    <strong className="text-sm text-[#131b2e] block">Fiche de suivi de collecte et transfert</strong>
                    <span className="text-xs text-[#3f493f]">Détail des volumes, heures de chargement et trajet vers le centre d’élimination.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#faf8ff] border border-[#dae2fd]">
                  <span className="material-symbols-outlined text-[#00652c] text-xl shrink-0 mt-0.5">check_circle</span>
                  <div>
                    <strong className="text-sm text-[#131b2e] block">Bordereau de réception des travaux & d’enlèvement</strong>
                    <span className="text-xs text-[#3f493f]">Signature contradictoire entre votre représentant et nos équipes.</span>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  href="/contact#devis"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#00652c] hover:bg-[#008138] text-white font-bold text-sm shadow-md transition-all"
                >
                  <span>Demander une rencontre ou un audit de site</span>
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
