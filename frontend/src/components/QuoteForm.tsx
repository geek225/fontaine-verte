"use client";

import { useState } from "react";
import { submitQuoteLead } from "@/lib/wordpress";

interface QuoteFormProps {
  defaultService?: string;
}

export default function QuoteForm({ defaultService }: QuoteFormProps) {
  const [formData, setFormData] = useState({
    company_name: "",
    contact_name: "",
    phone: "",
    email: "",
    service: defaultService || "Collecte maîtrisée des déchets",
    waste_type: "Déchets industriels banals",
    volume: "",
    message: "",
    website_url_hp: "", // Honeypot anti-spam
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{
    type: "idle" | "success" | "error";
    message: string;
  }>({ type: "idle", message: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "idle", message: "" });

    try {
      const res = await submitQuoteLead(formData);
      if (res.success) {
        setStatus({
          type: "success",
          message:
            res.message ||
            "Votre demande de devis a été enregistrée avec succès. Notre équipe technique prendra contact avec vous sous 24h.",
        });
        setFormData({
          company_name: "",
          contact_name: "",
          phone: "",
          email: "",
          service: "Collecte maîtrisée des déchets",
          waste_type: "Déchets industriels banals",
          volume: "",
          message: "",
          website_url_hp: "",
        });
      } else {
        setStatus({
          type: "error",
          message: res.message || "Une erreur est survenue lors de l'envoi.",
        });
      }
    } catch {
      setStatus({
        type: "error",
        message: "Erreur de connexion. Veuillez réessayer ou nous joindre directement au +225 07 57 94 74 40.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 lg:p-8 shadow-lg border border-[#dae2fd] relative overflow-hidden">
      {/* Accent decor */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-linear-to-bl from-[#95f8a7]/20 to-transparent rounded-bl-full pointer-events-none" />

      <div className="mb-5 sm:mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d3ffd5] text-[#00652c] text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-2">
          <span className="material-symbols-outlined text-sm">assignment_turned_in</span>
          Offre & Diagnostic sous 24h
        </div>
        <h3 className="text-xl sm:text-2xl font-extrabold text-[#131b2e] tracking-tight">
          Demande de Devis / Diagnostic
        </h3>
        <p className="text-xs sm:text-sm text-[#3f493f] mt-1">
          Complétez ce formulaire pour obtenir une proposition technique et financière sur mesure conforme aux normes CIAPOL.
        </p>
      </div>

      {status.type === "success" ? (
        <div className="p-6 rounded-2xl bg-[#d3ffd5] border border-[#15803d] text-[#00652c] flex flex-col items-center text-center gap-3">
          <div className="w-14 h-14 rounded-full bg-[#15803d] text-white flex items-center justify-center">
            <span className="material-symbols-outlined text-3xl">check_circle</span>
          </div>
          <h4 className="text-xl font-bold">Demande enregistrée avec succès !</h4>
          <p className="text-sm max-w-md">{status.message}</p>
          <div className="mt-2 text-xs font-semibold text-[#00652c] bg-white/70 px-4 py-2 rounded-xl">
            Ligne directe urgente : +225 07 57 94 74 40 / +225 01 40 58 58 58
          </div>
          <button
            onClick={() => setStatus({ type: "idle", message: "" })}
            className="mt-4 px-6 py-2.5 rounded-full bg-[#00652c] text-white text-xs font-bold hover:bg-[#008138] transition-colors"
          >
            Faire une autre demande
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Honeypot anti-bot caché */}
          <input
            type="text"
            name="website_url_hp"
            value={formData.website_url_hp}
            onChange={handleChange}
            style={{ display: "none" }}
            tabIndex={-1}
            autoComplete="off"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#131b2e] mb-1 uppercase tracking-wider">
                Entreprise / Établissement
              </label>
              <input
                type="text"
                name="company_name"
                value={formData.company_name}
                onChange={handleChange}
                placeholder="Ex: Société Industrielle CI"
                className="w-full px-4 py-2.5 rounded-xl border border-[#becabc] focus:border-[#00652c] focus:ring-1 focus:ring-[#00652c] outline-none text-sm transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#131b2e] mb-1 uppercase tracking-wider">
                Nom du Contact *
              </label>
              <input
                type="text"
                required
                name="contact_name"
                value={formData.contact_name}
                onChange={handleChange}
                placeholder="Ex: M. Kouassi"
                className="w-full px-4 py-2.5 rounded-xl border border-[#becabc] focus:border-[#00652c] focus:ring-1 focus:ring-[#00652c] outline-none text-sm transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#131b2e] mb-1 uppercase tracking-wider">
                Téléphone / WhatsApp *
              </label>
              <input
                type="tel"
                required
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Ex: +225 07 00 00 00 00"
                className="w-full px-4 py-2.5 rounded-xl border border-[#becabc] focus:border-[#00652c] focus:ring-1 focus:ring-[#00652c] outline-none text-sm transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#131b2e] mb-1 uppercase tracking-wider">
                Email professionnel
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="contact@entreprise.ci"
                className="w-full px-4 py-2.5 rounded-xl border border-[#becabc] focus:border-[#00652c] focus:ring-1 focus:ring-[#00652c] outline-none text-sm transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#131b2e] mb-1 uppercase tracking-wider">
                Prestation souhaitée
              </label>
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-[#becabc] focus:border-[#00652c] focus:ring-1 focus:ring-[#00652c] outline-none text-sm transition-colors bg-white"
              >
                <option value="Collecte maîtrisée des déchets">Collecte maîtrisée des déchets</option>
                <option value="Traitement et destruction des déchets">Traitement thermique / Incinération</option>
                <option value="Valorisation matière des déchets">Valorisation matière & recyclage</option>
                <option value="Démantèlement et dépollution">Démantèlement & Dépollution de site</option>
                <option value="Management des DASRI">Management des DASRI (Médical)</option>
                <option value="Formation à la prise en charge">Formation & Conseil HSE</option>
                <option value="Autre demande">Autre intervention</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-[#131b2e] mb-1 uppercase tracking-wider">
                Nature des déchets
              </label>
              <select
                name="waste_type"
                value={formData.waste_type}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-[#becabc] focus:border-[#00652c] focus:ring-1 focus:ring-[#00652c] outline-none text-sm transition-colors bg-white"
              >
                <option value="Déchets banals">Déchets banals (cartons, emballages...)</option>
                <option value="Déchets dangereux">Déchets dangereux (solvants, produits périmés)</option>
                <option value="DASRI (Infectieux)">DASRI (Médicaux, seringues, pansements)</option>
                <option value="Huiles et graisses">Huiles usagées & hydrocarbures</option>
                <option value="Boues industrielles">Boues de curage & effluents</option>
                <option value="Ferrailles et métaux">Ferrailles & débris industriels</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#131b2e] mb-1 uppercase tracking-wider">
              Volume estimé ou fréquence
            </label>
            <input
              type="text"
              name="volume"
              value={formData.volume}
              onChange={handleChange}
              placeholder="Ex: 5 tonnes / mois ou ponctuel (2 bennes)"
              className="w-full px-4 py-2.5 rounded-xl border border-[#becabc] focus:border-[#00652c] focus:ring-1 focus:ring-[#00652c] outline-none text-sm transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#131b2e] mb-1 uppercase tracking-wider">
              Précisions sur votre besoin
            </label>
            <textarea
              name="message"
              rows={3}
              value={formData.message}
              onChange={handleChange}
              placeholder="Décrivez vos contraintes de site, localisation à Abidjan/intérieur, dates d'intervention..."
              className="w-full px-4 py-2.5 rounded-xl border border-[#becabc] focus:border-[#00652c] focus:ring-1 focus:ring-[#00652c] outline-none text-sm transition-colors"
            />
          </div>

          {status.type === "error" && (
            <div className="p-3 rounded-xl bg-[#ffdad6] text-[#93000a] text-xs font-bold">
              {status.message}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 sm:py-3 px-6 rounded-full bg-[#00652c] hover:bg-[#008138] text-white font-bold text-xs sm:text-sm shadow-md shadow-[#00652c]/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 active:scale-[0.99]"
          >
            {loading ? (
              <span>Transmission en cours...</span>
            ) : (
              <>
                <span>Transmettre ma demande de devis</span>
                <span className="material-symbols-outlined text-base">send</span>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
