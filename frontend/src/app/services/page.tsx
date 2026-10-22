import Image from "next/image";
import Link from "next/link";
import { getFontaineVerteData } from "@/lib/wordpress";

export const metadata = {
  title: "Nos Services - Fontaine Verte SARL | Collecte, Incinération & Recyclage",
  description:
    "Découvrez l'ensemble de nos services d'assainissement : collecte maîtrisée, traitement thermique pyrolytique à 1200°C, recyclage d'huiles et solvants, management DASRI.",
};

export default async function ServicesPage() {
  const data = await getFontaineVerteData();
  const { services } = data;

  return (
    <div className="flex flex-col w-full">
      {/* Header Banner */}
      <section className="bg-linear-to-r from-[#00652c] via-[#15803d] to-[#006399] text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs uppercase font-extrabold tracking-widest text-[#95f8a7] block mb-2">
              Expertise & Filières Spécialisées
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
              Nos Solutions pour la Gestion Responsable des Déchets
            </h1>
            <p className="text-base sm:text-lg text-[#d3ffd5] leading-relaxed">
              Un accompagnement complet et rigoureux pour chaque catégorie de déchet générée par vos activités, du tri à l'élimination finale supervisée par le CIAPOL.
            </p>
          </div>
        </div>
      </section>

      {/* Services List Detailed */}
      <section className="py-16 lg:py-24 bg-[#faf8ff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {services.map((service, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={service.id}
                id={service.slug}
                className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-[#dae2fd] shadow-sm hover:shadow-md transition-shadow"
              >
                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-10 items-center ${isEven ? "" : "lg:flex-row-reverse"}`}>
                  {/* Text Column */}
                  <div className={`lg:col-span-7 flex flex-col gap-4 ${isEven ? "" : "lg:order-2"}`}>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-[#d3ffd5] text-[#00652c] flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-2xl">{service.icon}</span>
                      </div>
                      <div>
                        <span className="text-xs font-bold text-[#006399] uppercase tracking-wider block">
                          Pôle Métier 0{index + 1}
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#131b2e]">
                          {service.title}
                        </h2>
                      </div>
                    </div>

                    <p className="text-sm font-semibold text-[#15803d]">
                      {service.subtitle}
                    </p>

                    <div className="text-sm text-[#3f493f] leading-relaxed whitespace-pre-line">
                      {service.content}
                    </div>

                    {/* Deliverables Card */}
                    <div className="p-4 rounded-xl bg-[#faf8ff] border border-[#eaedff] mt-2">
                      <span className="text-[11px] uppercase font-bold text-[#6f7a6e] block tracking-wider mb-1">
                        Documents & Livrables Garantis :
                      </span>
                      <p className="text-xs font-semibold text-[#131b2e]">
                        {service.deliverables}
                      </p>
                    </div>

                    <div className="pt-2">
                      <Link
                        href={`/contact?service=${encodeURIComponent(service.title)}#devis`}
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#00652c] hover:bg-[#008138] text-white text-xs font-bold shadow-md transition-all w-fit"
                      >
                        <span>Demander un devis pour ce pôle</span>
                        <span className="material-symbols-outlined text-base">arrow_forward</span>
                      </Link>
                    </div>
                  </div>

                  {/* Image Column */}
                  <div className={`lg:col-span-5 ${isEven ? "" : "lg:order-1"}`}>
                    <div className="relative rounded-2xl overflow-hidden shadow-md aspect-4/3 w-full border border-[#dae2fd]">
                      <Image
                        src={service.image || "/assets/trois-bennes.png"}
                        alt={service.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Box */}
      <section className="py-16 bg-white border-t border-[#dae2fd]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="p-8 sm:p-12 rounded-3xl bg-linear-to-br from-[#f2f3ff] to-[#eaedff] border border-[#dae2fd]">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#131b2e] mb-4">
              Besoin d'un accompagnement personnalisé ou d'un contrat cadre ?
            </h3>
            <p className="text-sm sm:text-base text-[#3f493f] max-w-2xl mx-auto mb-8">
              Nous mettons à disposition de nos partenaires des bacs, des bennes, des fûts hermétiques ainsi que du personnel qualifié directement intégré à vos unités de production.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact#devis"
                className="px-8 py-3.5 rounded-full bg-[#00652c] hover:bg-[#008138] text-white font-bold text-sm shadow-md transition-all"
              >
                Demander une étude personnalisée
              </Link>
              <a
                href="tel:+2250757947440"
                className="px-6 py-3.5 rounded-full bg-white text-[#006399] border border-[#becabc] font-bold text-sm hover:bg-[#faf8ff] transition-colors"
              >
                Appeler le +225 07 57 94 74 40
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
