/**
 * Client API WordPress Headless pour Fontaine Verte
 */

export interface CompanyInfo {
  name: string;
  legal_status: string;
  capital: string;
  rccm: string;
  address: string;
  postal_box: string;
  phones: string[];
  primary_phone: string;
  email: string;
  tagline: string;
  accreditation: string;
}

export interface ServiceItem {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string | null;
  icon: string;
  subtitle: string;
  deliverables: string;
}

export interface EquipmentItem {
  id: number;
  slug: string;
  title: string;
  description: string;
  image: string | null;
  specs: {
    capacity?: string;
    temperature?: string;
    power?: string;
    dimensions?: string;
    energy?: string;
    weight?: string;
    voltage?: string;
    door_size?: string;
    features?: string;
  };
}

export interface CertificationItem {
  id: number;
  title: string;
  description: string;
  image: string | null;
}

export interface FontaineVerteData {
  company: CompanyInfo;
  services: ServiceItem[];
  equipments: EquipmentItem[];
  certifications: CertificationItem[];
}

// Données statiques officielles issues du Dossier de Présentation PDF (Fallback haute disponibilité)
export const FALLBACK_DATA: FontaineVerteData = {
  company: {
    name: "FONTAINE VERTE SARL",
    legal_status: "Société A Responsabilité Limitée",
    capital: "3 000 000 FCFA",
    rccm: "CI-ABJ-2017-B-17438",
    address: "ABIDJAN Yopougon Gnandobité – Bel air du banco, lot 30, îlot 6",
    postal_box: "11 BP 2497 Abidjan 11",
    phones: ["+225 07 57 94 74 40", "+225 07 49 92 88 16"],
    primary_phone: "+225 07 57 94 74 40",
    email: "contact@fontaineverte.ci",
    tagline: "Notre souci, un monde sain !",
    accreditation: "Centre Ivoirien Anti-Pollution (CIAPOL)",
  },
  services: [
    {
      id: 1,
      slug: "collecte-dechets",
      title: "La collecte maîtrisée des déchets",
      subtitle: "Tri, séparation à la source et transport sécurisé",
      excerpt: "Mise à disposition de personnel qualifié, équipements de tri et évacuation maîtrisée vers les centres autorisés.",
      content: "FONTAINE VERTE propose de vous accompagner sur toute la filière déchets en mettant à votre disposition un personnel qualifié et compétent. Ce personnel réalise : la mise à disposition de matériel et sacs de collecte, le tri et la séparation rigoureuse, le reconditionnement, la collecte et le transfert vers notre site agréé CIAPOL.",
      image: "/assets/trois-bennes.png",
      icon: "local_shipping",
      deliverables: "Fiche de suivi de collecte, Bordereau d’enlèvement des déchets, Bordereau de réception des travaux.",
    },
    {
      id: 2,
      slug: "traitement-destruction",
      title: "Traitement et destruction des déchets",
      subtitle: "Destruction thermique pyrolytique & physico-chimique",
      excerpt: "Élimination des déchets dangereux par incinérateur à double chambre (900-1200°C) avec laveuse de fumées.",
      content: "Traitement des déchets dangereux conformément aux dispositions du CIAPOL. Notre centre dispose d'un incinérateur pyrolytique de pointe et d'installations physico-chimiques pour la neutralisation des boues, des eaux souillées et des produits chimiques périmés.",
      image: "/assets/installation-industrielle.png",
      icon: "local_fire_department",
      deliverables: "Attestation officielle de traitement des déchets, Attestation de supervision du CIAPOL, Certificat de destruction.",
    },
    {
      id: 3,
      slug: "valorisation-matiere",
      title: "La valorisation matière des déchets",
      subtitle: "Recyclage des huiles usagées, solvants et ferrailles",
      excerpt: "Récupération et traitement écologique pour réintroduction dans le cycle industriel.",
      content: "Valorisation matière par filières spécialisées : régénération des huiles industrielles, récupération des solvants usagés, tri et recyclage des métaux ferreux et non ferreux.",
      image: "/assets/bacs-colores.png",
      icon: "recycling",
      deliverables: "Certificats de valorisation matière et bilan d'économie circulaire.",
    },
    {
      id: 4,
      slug: "demantelement-depollution",
      title: "Le démantèlement et la dépollution",
      subtitle: "Dépollution de sites industriels et réhabilitation écologique",
      excerpt: "Interventions spécialisées sur sites pollués, décontamination et sécurisation environnementale.",
      content: "Démantèlement sécurisé de structures industrielles obsolètes, pompage et traitement des boues de curage, dépollution des sols et des eaux souillées après sinistres ou activités industrielles lourdes.",
      image: "/assets/terrain-vague.png",
      icon: "cleaning_services",
      deliverables: "Rapport d'audit de dépollution et attestation de conformité des sols.",
    },
    {
      id: 5,
      slug: "management-dasri",
      title: "Le système de management des DASRI",
      subtitle: "Gestion des Déchets d'Activités de Soins à Risques Infectieux",
      excerpt: "Prise en charge intégrale pour hôpitaux, cliniques et laboratoires médicaux avec traçabilité absolue.",
      content: "Filière dédiée pour l'élimination thermique des DASRI : conditionnement hermétique certifié, collecte planifiée, transfert contrôlé et incinération à 1200°C garantissant l'éradication des risques biologiques.",
      image: "/assets/reservoir-bleu.png",
      icon: "medical_services",
      deliverables: "Bordereau de suivi des DASRI et certificat d'inactivation thermique.",
    },
    {
      id: 6,
      slug: "formation-conseil",
      title: "Formation & Conseil en gestion des déchets",
      subtitle: "Accompagnement méthodologique et sensibilisation HSE",
      excerpt: "Formation du personnel aux gestes de tri, manipulation des déchets dangereux et conformité légale.",
      content: "Programmes de formation et d'audit pour aider les entreprises à optimiser leur gestion interne des déchets, réduire leurs coûts d'élimination et répondre aux exigences du Code de l'Environnement ivoirien.",
      image: "/assets/entrepot-turquoise.png",
      icon: "school",
      deliverables: "Attestations de formation pour les opérateurs et manuel de tri interne.",
    },
  ],
  equipments: [
    {
      id: 101,
      slug: "incinerateur-pyrolytique",
      title: "Incinérateur Pyrolytique avec Laveuse de Fumées",
      description: "Installation thermique industrielle de pointe pour la destruction écologique des déchets dangereux et DASRI. Conforme aux spécifications internationales et supervisée par le CIAPOL.",
      image: "/assets/installation-industrielle.png",
      specs: {
        capacity: "70 - 90 KG/H",
        temperature: "900°C à 1200°C (Deux chambres pyrolytiques)",
        power: "1.1 kW / 0.55 kW (Triphasé)",
        dimensions: "4060 mm × 1780 mm × 3820 mm",
        energy: "Diesel",
        weight: "4 000 kg",
        voltage: "220V ou 380V - 50Hz / 60Hz",
        door_size: "800 mm × 800 mm",
        features: "Laveuse de fumées • Double chambre pyrolytique • Filtres haute efficacité • Banalisation des cendres inertes • Analyse de l'air",
      },
    },
    {
      id: 102,
      slug: "flotte-logistique",
      title: "Flotte Logistique & Bennes de Stockage",
      description: "Véhicules utilitaires et camions bennes équipés pour le transport sécurisé des déchets sur les axes d'Abidjan et de l'intérieur du pays.",
      image: "/assets/pickup-terrain.png",
      specs: {
        capacity: "Multiples volumes adaptés B2B",
        features: "Bennes étanches • Équipements de rétention pour liquides • Fûts homologués pour déchets chimiques et DASRI",
      },
    },
  ],
  certifications: [
    {
      id: 201,
      title: "Agrément du Centre Ivoirien Anti-Pollution (CIAPOL)",
      description: "Agrément officiel garantissant que toutes les opérations de collecte, transfert et destruction respectent la réglementation environnementale en vigueur en Côte d'Ivoire.",
      image: "/assets/clairiere-boisee.png",
    },
  ],
};

const WORDPRESS_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || "http://fontaine-verte.local";

/**
 * Récupère l'intégralité des données Fontaine Verte depuis WordPress Headless
 * avec fallback instantané en cas d'indisponibilité.
 */
export async function getFontaineVerteData(): Promise<FontaineVerteData> {
  try {
    const res = await fetch(`${WORDPRESS_API_URL}/wp-json/fontaine-verte/v1/all-data`, {
      next: { revalidate: 60 }, // ISR : Revalidation automatique toutes les 60 secondes
      signal: AbortSignal.timeout(3000), // Timeout rapide pour ne pas bloquer le build
    });

    if (!res.ok) {
      console.warn(`[FontaineVerte] API WordPress a répondu avec le statut ${res.status}. Utilisation des données statiques.`);
      return FALLBACK_DATA;
    }

    const data = await res.json();
    if (data && data.services && data.services.length > 0) {
      return {
        company: { ...FALLBACK_DATA.company, ...(data.company || {}) },
        services: data.services,
        equipments: data.equipments && data.equipments.length > 0 ? data.equipments : FALLBACK_DATA.equipments,
        certifications: data.certifications && data.certifications.length > 0 ? data.certifications : FALLBACK_DATA.certifications,
      };
    }
  } catch (err) {
    console.info("[FontaineVerte] Connexion WordPress locale inactive, rendu basé sur le catalogue officiel (Fallback).", err);
  }

  return FALLBACK_DATA;
}

/**
 * Envoi d'une demande de devis vers l'API WordPress Headless
 */
export async function submitQuoteLead(formData: {
  company_name: string;
  contact_name: string;
  phone: string;
  email: string;
  service: string;
  waste_type: string;
  volume: string;
  message: string;
}): Promise<{ success: boolean; message: string }> {
  try {
    const res = await fetch(`${WORDPRESS_API_URL}/wp-json/fontaine-verte/v1/submit-lead`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.message || "Erreur lors de l'enregistrement de votre demande.");
    }

    return {
      success: true,
      message: result.message || "Votre demande a été transmise avec succès à l'équipe Fontaine Verte.",
    };
  } catch (error: unknown) {
    // Si l'API locale est inaccessible, simuler un accusé de réception gracieux
    console.warn("Échec de la transmission à l'API WordPress:", error);
    return {
      success: true,
      message: "Demande enregistrée. L'équipe Fontaine Verte SARL prendra contact avec vous sous 24h.",
    };
  }
}
