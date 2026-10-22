<?php
/**
 * Seeder des données officielles Fontaine Verte (depuis le Dossier de présentation officiel)
 */

if (!defined('ABSPATH')) {
    exit;
}

class FV_Seeder {

    public static function init() {
        add_action('admin_post_fv_seed_official_data', [__CLASS__, 'seed_official_data']);
    }

    public static function seed_official_data() {
        if (!current_user_can('manage_options')) {
            wp_die('Accès refusé.');
        }

        check_admin_referer('fv_seed_action', 'fv_seed_nonce');

        // 1. Insertion des 6 Métiers officiels
        $services = [
            [
                'title'        => 'Collecte maîtrisée des déchets',
                'subtitle'     => 'Tri, reconditionnement, collecte et transfert sécurisé',
                'icon'         => 'local_shipping',
                'order'        => 1,
                'deliverables' => 'Fiche de suivi de collecte, Bordereau d’enlèvement des déchets, Bordereau de réception des travaux.',
                'content'      => "FONTAINE VERTE met à votre disposition un personnel qualifié et compétent pour assurer toute la chaîne de collecte :\n- Mise à disposition de sacs poubelles, matériel et équipements adaptés ;\n- Tri et séparation rigoureuse des déchets à la source ;\n- Reconditionnement sécurisé ;\n- Transfert maîtrisé des déchets banals vers la décharge communale et des déchets dangereux vers notre site de traitement agréé CIAPOL.",
            ],
            [
                'title'        => 'Traitement et destruction des déchets',
                'subtitle'     => 'Incinération thermique à haute température & traitement physico-chimique',
                'icon'         => 'local_fire_department',
                'order'        => 2,
                'deliverables' => 'Attestation officielle de traitement, Attestation de supervision CIAPOL, Certificat de destruction.',
                'content'      => "Destruction thermique haute performance grâce à notre incinérateur pyrolytique à double chambre (900°C à 1200°C) équipé d'une laveuse de fumées et de filtres stricts. Traitement physico-chimique des eaux souillées et des produits chimiques périmés conformément aux exigences environnementales.",
            ],
            [
                'title'        => 'Valorisation matière et recyclage',
                'subtitle'     => 'Économie circulaire pour huiles usagées, solvants et ferrailles',
                'icon'         => 'recycling',
                'order'        => 3,
                'deliverables' => 'Bordereau de valorisation matière, Traçabilité de recyclage.',
                'content'      => "Récupération et réinjection dans le cycle productif des matières valorisables : recyclage des huiles industrielles, régénération des solvants et tri des métaux/ferrailles pour réduire l'empreinte carbone globale de vos installations.",
            ],
            [
                'title'        => 'Démantèlement et dépollution industrielle',
                'subtitle'     => 'Remise en état de sites industriels et dépollution des sols',
                'icon'         => 'cleaning_services',
                'order'        => 4,
                'deliverables' => 'Rapport d’audit de fin de dépollution, Attestation de conformité des sols.',
                'content'      => "Intervention technique sur sites industriels pour le démantèlement d'installations obsolètes, le traitement des boues industrielles et la neutralisation des pollutions d'hydrocarbures ou de produits chimiques.",
            ],
            [
                'title'        => 'Management des DASRI',
                'subtitle'     => 'Gestion intégrale des Déchets d’Activités de Soins à Risques Infectieux',
                'icon'         => 'medical_services',
                'order'        => 5,
                'deliverables' => 'Bordereau de suivi DASRI, Certificat d’incinération et d’inactivation des agents infectieux.',
                'content'      => "Prise en charge spécialisée pour les cliniques, hôpitaux et laboratoires : conditionnement en fûts jaunes hermétiques, transport sous température maîtrisée et élimination thermique à 1200°C garantissant l'éradication totale des risques biologiques.",
            ],
            [
                'title'        => 'Formation & Conseil hygiène/sécurité',
                'subtitle'     => 'Sensibilisation des opérateurs et assistance méthodologique',
                'icon'         => 'school',
                'order'        => 6,
                'deliverables' => 'Attestations de formation du personnel, Manuel de bonnes pratiques de tri.',
                'content'      => "Formation sur mesure de vos équipes à la manipulation, au tri et au conditionnement des déchets industriels et dangereux pour garantir la conformité réglementaire de votre entreprise face aux contrôles officiels.",
            ],
        ];

        foreach ($services as $srv) {
            $existing = get_page_by_title($srv['title'], OBJECT, 'fv_service');
            $post_id = $existing ? $existing->ID : wp_insert_post([
                'post_title'   => $srv['title'],
                'post_content' => $srv['content'],
                'post_status'  => 'publish',
                'post_type'    => 'fv_service',
                'menu_order'   => $srv['order'],
            ]);

            if ($post_id && !is_wp_error($post_id)) {
                update_post_meta($post_id, 'fv_service_subtitle', $srv['subtitle']);
                update_post_meta($post_id, 'fv_service_icon', $srv['icon']);
                update_post_meta($post_id, 'fv_service_deliverables', $srv['deliverables']);
                update_post_meta($post_id, 'fv_service_order', $srv['order']);
            }
        }

        // 2. Insertion de l'équipement phare (Incinérateur Pyrolytique)
        $eq_title = 'Incinérateur Pyrolytique avec Laveuse de Fumées';
        $existing_eq = get_page_by_title($eq_title, OBJECT, 'fv_equipment');
        $eq_id = $existing_eq ? $existing_eq->ID : wp_insert_post([
            'post_title'   => $eq_title,
            'post_content' => "Équipement de traitement thermique de pointe respectant scrupuleusement les normes environnementales ivoiriennes et internationales. Muni de deux chambres pyrolytiques assurant une combustion complète entre 900 et 1200°C, couplé à une laveuse de fumées et un système de filtration multi-étages.",
            'post_status'  => 'publish',
            'post_type'    => 'fv_equipment',
        ]);

        if ($eq_id && !is_wp_error($eq_id)) {
            update_post_meta($eq_id, 'fv_eq_capacity', '70 - 90 KG/H');
            update_post_meta($eq_id, 'fv_eq_temperature', '900°C à 1200°C (Deux chambres pyrolytiques)');
            update_post_meta($eq_id, 'fv_eq_power', '1.1 kW / 0.55 kW');
            update_post_meta($eq_id, 'fv_eq_dimensions', '4060 mm × 1780 mm × 3820 mm');
            update_post_meta($eq_id, 'fv_eq_energy', 'Diesel');
            update_post_meta($eq_id, 'fv_eq_weight', '4 000 kg');
            update_post_meta($eq_id, 'fv_eq_voltage', '220V ou 380V - 50Hz / 60Hz (Triphasé)');
            update_post_meta($eq_id, 'fv_eq_door_size', '800 mm × 800 mm');
            update_post_meta($eq_id, 'fv_eq_features', "• Deux chambres pyrolytiques (900-1200°C)\n• Laveuse de fumées avec neutralisation chimique\n• Filtres à particules haute efficacité\n• Mesure continue de la qualité de l'air\n• Banalisation totale des cendres inertes");
        }

        // 3. Insertion de la certification CIAPOL
        $cert_title = 'Agrément du Centre Ivoirien Anti-Pollution (CIAPOL)';
        $existing_cert = get_page_by_title($cert_title, OBJECT, 'fv_certification');
        if (!$existing_cert) {
            wp_insert_post([
                'post_title'   => $cert_title,
                'post_content' => "Agrément d'État conféré par le CIAPOL autorisant FONTAINE VERTE SARL à collecter, transporter et procéder au traitement des déchets dangereux et banals sur l'ensemble du territoire ivoirien.",
                'post_status'  => 'publish',
                'post_type'    => 'fv_certification',
            ]);
        }

        $redirect = wp_get_referer() ? add_query_arg('seeded', '1', wp_get_referer()) : admin_url('index.php?seeded=1');
        wp_redirect($redirect);
        exit;
    }
}
