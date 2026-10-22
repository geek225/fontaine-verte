import Image from "next/image";
import Link from "next/link";
import { getFontaineVerteData } from "@/lib/wordpress";

export const metadata = {
  title: "Équipements - Fontaine Verte SARL | Incinérateur Pyrolytique 900-1200°C",
  description:
    "Spécifications techniques de notre incinérateur pyrolytique avec laveuse de fumées (capacité 70-90 kg/h, 1200°C) et de notre flotte logistique de collecte de déchets.",
};

export default async function EquipementsPage() {
  const data = await getFontaineVerteData();
  const incinerator = data.equipments[0] || {};
  const specs = incinerator.specs || {};

  return (
    <div className="flex flex-col w-full">
      {/* Header Banner */}
      <section className="bg-linear-to-r from-[#00652c] via-[#15803d] to-[#006399] text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs uppercase font-extrabold tracking-widest text-[#95f8a7] block mb-2">
              Technologie & Traitement Thermique
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
              Notre Parc d'Équipements de Pointe
            </h1>
            <p className="text-base sm:text-lg text-[#d3ffd5] leading-relaxed">
              Un investissement continu dans des équipements industriels de dernière génération pour assurer une destruction thermique sans compromis sur la qualité de l'air.
            </p>
          </div>
        </div>
      </section>

      {/* Focus Incinérateur */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
            <div className="lg:col-span-6 flex flex-col gap-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#d3ffd5] text-[#00652c] text-xs font-bold uppercase tracking-wider w-fit">
                <span className="material-symbols-outlined text-sm">local_fire_department</span>
                Équipement Principal de Traitement
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#131b2e] leading-tight">
                Incinérateur Pyrolytique avec Laveuse de Fumées
              </h2>
              <p className="text-[#3f493f] leading-relaxed">
                Conçu pour traiter les déchets les plus contraignants (produits chimiques périmés, emballages souillés, DASRI hospitaliers et boues industrielles), notre équipement thermique fonctionne selon le principe de pyrolyse à double chambre avec post-combustion jusqu'à 1200°C.
              </p>
              <div className="p-5 rounded-2xl bg-[#faf8ff] border border-[#dae2fd]">
                <h4 className="font-bold text-sm text-[#00652c] mb-2 uppercase tracking-wide">
                  Protection Environnementale Maximale :
                </h4>
                <ul className="space-y-1.5 text-xs text-[#3f493f]">
                  <li>• Laveuse de fumées intégrant un neutraliseur de gaz acides</li>
                  <li>• Système de filtres à particules conforme aux normes internationales</li>
                  <li>• Banalisation totale et solidification des cendres inertes</li>
                  <li>• Mesures de la qualité de l'air supervisées par le CIAPOL</li>
                </ul>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-[#eaedff] aspect-4/3 w-full">
                <Image
                  src="/assets/installation-industrielle.png"
                  alt="Incinérateur pyrolytique Fontaine Verte"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Fiche Technique Détaillée */}
          <div className="bg-[#faf8ff] rounded-3xl p-6 sm:p-10 border border-[#dae2fd]">
            <h3 className="text-2xl font-extrabold text-[#131b2e] mb-6 flex items-center gap-3">
              <span className="material-symbols-outlined text-[#00652c] text-2xl">settings</span>
              Fiche Technique Officielle de l'Incinérateur
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-4 rounded-2xl bg-white border border-[#dae2fd]">
                <span className="text-xs uppercase font-bold text-[#6f7a6e] block mb-1">
                  Capacité horaire
                </span>
                <span className="text-2xl font-black text-[#00652c] block">
                  {specs.capacity || "70 - 90 KG/H"}
                </span>
                <span className="text-xs text-[#3f493f]">Destruction continue</span>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#dae2fd]">
                <span className="text-xs uppercase font-bold text-[#6f7a6e] block mb-1">
                  Température de chauffe
                </span>
                <span className="text-2xl font-black text-[#006399] block">
                  900 à 1200°C
                </span>
                <span className="text-xs text-[#3f493f]">Deux chambres pyrolytiques</span>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#dae2fd]">
                <span className="text-xs uppercase font-bold text-[#6f7a6e] block mb-1">
                  Poids total
                </span>
                <span className="text-2xl font-black text-[#15803d] block">
                  {specs.weight || "4 000 KG"}
                </span>
                <span className="text-xs text-[#3f493f]">Structure acier renforcé</span>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#dae2fd]">
                <span className="text-xs uppercase font-bold text-[#6f7a6e] block mb-1">
                  Dimensions hors-tout
                </span>
                <span className="text-base font-black text-[#131b2e] block mt-1">
                  {specs.dimensions || "4060 × 1780 × 3820 mm"}
                </span>
                <span className="text-xs text-[#3f493f]">Encombrement optimisé</span>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#dae2fd]">
                <span className="text-xs uppercase font-bold text-[#6f7a6e] block mb-1">
                  Source d'énergie
                </span>
                <span className="text-xl font-bold text-[#131b2e] block">
                  {specs.energy || "Diesel"}
                </span>
                <span className="text-xs text-[#3f493f]">Brûleurs haute pression</span>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#dae2fd]">
                <span className="text-xs uppercase font-bold text-[#6f7a6e] block mb-1">
                  Alimentation électrique
                </span>
                <span className="text-sm font-bold text-[#131b2e] block mt-1">
                  {specs.voltage || "220V ou 380V (Triphasé)"}
                </span>
                <span className="text-xs text-[#3f493f]">50 Hz / 60 Hz</span>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#dae2fd]">
                <span className="text-xs uppercase font-bold text-[#6f7a6e] block mb-1">
                  Taille de la porte
                </span>
                <span className="text-xl font-bold text-[#131b2e] block">
                  {specs.door_size || "800 × 800 mm"}
                </span>
                <span className="text-xs text-[#3f493f]">Chargement sécurisé</span>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#dae2fd]">
                <span className="text-xs uppercase font-bold text-[#6f7a6e] block mb-1">
                  Puissance requise
                </span>
                <span className="text-xl font-bold text-[#131b2e] block">
                  {specs.power || "1.1 kW / 0.55 kW"}
                </span>
                <span className="text-xs text-[#3f493f]">Consommation maîtrisée</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Flotte Logistique & Bennes */}
      <section className="py-16 bg-[#faf8ff] border-t border-[#dae2fd]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-lg aspect-4/3 w-full border border-[#dae2fd]">
                <Image
                  src="/assets/pickup-terrain.png"
                  alt="Flotte logistique Fontaine Verte"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-7 flex flex-col gap-4">
              <span className="text-xs uppercase font-extrabold tracking-widest text-[#00652c]">
                Logistique Intégrée
              </span>
              <h2 className="text-3xl font-extrabold text-[#131b2e]">
                Flotte de Transport & Équipements de Conditionnement
              </h2>
              <p className="text-sm text-[#3f493f] leading-relaxed">
                Pour assurer la sécurité du transfert de vos déchets depuis votre site jusqu'à notre centre de traitement d'Abidjan Yopougon, nous mobilisons des équipements adaptés et homologués :
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-white border border-[#dae2fd]">
                  <strong className="text-sm text-[#131b2e] block mb-1">Bennes étanches & Bacs</strong>
                  <span className="text-xs text-[#3f493f]">Adaptés au tri à la source et au stockage temporaire sécurisé sur votre site.</span>
                </div>
                <div className="p-4 rounded-xl bg-white border border-[#dae2fd]">
                  <strong className="text-sm text-[#131b2e] block mb-1">Fûts hermétiques DASRI & Huiles</strong>
                  <span className="text-xs text-[#3f493f]">Fûts jaunes réglementaires pour risques biologiques et conteneurs pour hydrocarbures.</span>
                </div>
              </div>
              <div className="pt-4">
                <Link
                  href="/contact#devis"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#00652c] hover:bg-[#008138] text-white font-bold text-sm shadow-md transition-all w-fit"
                >
                  <span>Demander une mise à disposition de bennes</span>
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
