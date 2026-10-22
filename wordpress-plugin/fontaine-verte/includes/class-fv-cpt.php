<?php
/**
 * Gestion des Custom Post Types et Taxonomies pour Fontaine Verte
 */

if (!defined('ABSPATH')) {
    exit;
}

class FV_CPT {

    public static function init() {
        add_action('init', [__CLASS__, 'register_post_types']);
        add_action('init', [__CLASS__, 'register_taxonomies']);
        add_action('init', [__CLASS__, 'register_meta_fields']);
        
        // Ajout des colonnes personnalisées dans l'admin
        add_filter('manage_fv_lead_posts_columns', [__CLASS__, 'set_lead_columns']);
        add_action('manage_fv_lead_posts_custom_column', [__CLASS__, 'render_lead_columns'], 10, 2);
        
        // Badge de notification des nouveaux leads dans le menu
        add_action('admin_menu', [__CLASS__, 'add_leads_badge_to_menu'], 999);
    }

    public static function register_post_types() {
        // 1. Services
        register_post_type('fv_service', [
            'labels' => [
                'name'               => __('Services', 'fontaine-verte'),
                'singular_name'      => __('Service', 'fontaine-verte'),
                'add_new'            => __('Ajouter un service', 'fontaine-verte'),
                'add_new_item'       => __('Ajouter un nouveau service', 'fontaine-verte'),
                'edit_item'          => __('Modifier le service', 'fontaine-verte'),
                'all_items'          => __('Tous les services', 'fontaine-verte'),
                'menu_name'          => __('Pôles Services', 'fontaine-verte'),
            ],
            'public'              => true,
            'show_ui'             => true,
            'show_in_menu'        => 'fontaine-verte-menu',
            'show_in_rest'        => true,
            'rest_base'           => 'services',
            'supports'            => ['title', 'editor', 'thumbnail', 'excerpt'],
            'has_archive'         => false,
            'rewrite'             => ['slug' => 'service'],
            'menu_icon'           => 'dashicons-rest-api',
        ]);

        // 2. Équipements & Incinérateur
        register_post_type('fv_equipment', [
            'labels' => [
                'name'               => __('Équipements', 'fontaine-verte'),
                'singular_name'      => __('Équipement', 'fontaine-verte'),
                'add_new'            => __('Ajouter un équipement', 'fontaine-verte'),
                'add_new_item'       => __('Ajouter un équipement industriel', 'fontaine-verte'),
                'edit_item'          => __('Modifier l’équipement', 'fontaine-verte'),
                'all_items'          => __('Parc Équipements', 'fontaine-verte'),
                'menu_name'          => __('Équipements', 'fontaine-verte'),
            ],
            'public'              => true,
            'show_ui'             => true,
            'show_in_menu'        => 'fontaine-verte-menu',
            'show_in_rest'        => true,
            'rest_base'           => 'equipments',
            'supports'            => ['title', 'editor', 'thumbnail', 'excerpt'],
            'has_archive'         => false,
            'rewrite'             => ['slug' => 'equipement'],
            'menu_icon'           => 'dashicons-hammer',
        ]);

        // 3. Demandes de Devis & Diagnostics (Leads)
        register_post_type('fv_lead', [
            'labels' => [
                'name'               => __('Demandes de Devis', 'fontaine-verte'),
                'singular_name'      => __('Demande de Devis', 'fontaine-verte'),
                'add_new'            => __('Créer une demande', 'fontaine-verte'),
                'add_new_item'       => __('Nouvelle demande de devis', 'fontaine-verte'),
                'edit_item'          => __('Consulter le devis', 'fontaine-verte'),
                'all_items'          => __('Demandes entrantes', 'fontaine-verte'),
                'menu_name'          => __('Devis & Diagnostics', 'fontaine-verte'),
            ],
            'public'              => false,
            'show_ui'             => true,
            'show_in_menu'        => 'fontaine-verte-menu',
            'show_in_rest'        => false, // Restreint à l'admin
            'supports'            => ['title', 'editor'],
            'has_archive'         => false,
            'capabilities'        => [
                'create_posts' => 'do_not_allow', // Créé via API / Formulaire
            ],
            'map_meta_cap'        => true,
        ]);

        // 4. Agréments & Certifications CIAPOL
        register_post_type('fv_certification', [
            'labels' => [
                'name'               => __('Agréments CIAPOL', 'fontaine-verte'),
                'singular_name'      => __('Agrément', 'fontaine-verte'),
                'add_new'            => __('Ajouter un agrément', 'fontaine-verte'),
                'add_new_item'       => __('Ajouter un document officiel', 'fontaine-verte'),
                'edit_item'          => __('Modifier le document', 'fontaine-verte'),
                'all_items'          => __('Agréments & Certificats', 'fontaine-verte'),
                'menu_name'          => __('Agréments & Légal', 'fontaine-verte'),
            ],
            'public'              => true,
            'show_ui'             => true,
            'show_in_menu'        => 'fontaine-verte-menu',
            'show_in_rest'        => true,
            'rest_base'           => 'certifications',
            'supports'            => ['title', 'editor', 'thumbnail'],
            'has_archive'         => false,
        ]);
    }

    public static function register_taxonomies() {
        // Types de déchets
        register_taxonomy('fv_waste_type', ['fv_service', 'fv_lead'], [
            'labels' => [
                'name'          => __('Types de Déchets', 'fontaine-verte'),
                'singular_name' => __('Type de Déchet', 'fontaine-verte'),
            ],
            'hierarchical'      => true,
            'show_ui'           => true,
            'show_in_rest'      => true,
            'show_admin_column' => true,
        ]);

        // Catégories d'équipements
        register_taxonomy('fv_equipment_category', ['fv_equipment'], [
            'labels' => [
                'name'          => __('Catégories d’Équipements', 'fontaine-verte'),
                'singular_name' => __('Catégorie', 'fontaine-verte'),
            ],
            'hierarchical'      => true,
            'show_ui'           => true,
            'show_in_rest'      => true,
            'show_admin_column' => true,
        ]);
    }

    public static function register_meta_fields() {
        // Métadonnées pour les services
        $service_fields = [
            'fv_service_icon'         => 'string',
            'fv_service_subtitle'     => 'string',
            'fv_service_deliverables' => 'string',
            'fv_service_order'        => 'integer',
        ];
        foreach ($service_fields as $key => $type) {
            register_post_meta('fv_service', $key, [
                'show_in_rest' => true,
                'single'       => true,
                'type'         => $type,
                'auth_callback'=> function() { return current_user_can('edit_posts'); }
            ]);
        }

        // Métadonnées pour les équipements
        $equipment_fields = [
            'fv_eq_capacity'        => 'string', // Ex: 70-90 KG/H
            'fv_eq_temperature'     => 'string', // Ex: 900 à 1200°C
            'fv_eq_power'           => 'string', // Ex: 1.1kw / 0.55kw
            'fv_eq_dimensions'      => 'string', // Ex: 4060mm*1780mm*3820mm
            'fv_eq_energy'          => 'string', // Ex: Diesel
            'fv_eq_weight'          => 'string', // Ex: 4000 kg
            'fv_eq_voltage'         => 'string', // Ex: 220v or 380 50Hz
            'fv_eq_door_size'       => 'string', // Ex: 800mm*800mm
            'fv_eq_features'        => 'string', // Ex: Deux chambres pyrolytiques, Laveuse de fumée, Filtres
        ];
        foreach ($equipment_fields as $key => $type) {
            register_post_meta('fv_equipment', $key, [
                'show_in_rest' => true,
                'single'       => true,
                'type'         => $type,
                'auth_callback'=> function() { return current_user_can('edit_posts'); }
            ]);
        }

        // Métadonnées pour les demandes de devis (leads)
        $lead_fields = [
            'fv_lead_company'     => 'string',
            'fv_lead_contact'     => 'string',
            'fv_lead_phone'       => 'string',
            'fv_lead_email'       => 'string',
            'fv_lead_waste_type'  => 'string',
            'fv_lead_service'     => 'string',
            'fv_lead_volume'      => 'string',
            'fv_lead_status'      => 'string', // new, in_progress, quoted, completed
            'fv_lead_ip'          => 'string',
        ];
        foreach ($lead_fields as $key => $type) {
            register_post_meta('fv_lead', $key, [
                'show_in_rest' => false,
                'single'       => true,
                'type'         => $type,
            ]);
        }
    }

    public static function set_lead_columns($columns) {
        $new_columns = [];
        $new_columns['cb']               = $columns['cb'];
        $new_columns['title']            = __('Réf. Demande', 'fontaine-verte');
        $new_columns['lead_company']     = __('Entreprise', 'fontaine-verte');
        $new_columns['lead_contact']     = __('Contact & Téléphone', 'fontaine-verte');
        $new_columns['lead_service']     = __('Service & Déchets', 'fontaine-verte');
        $new_columns['lead_status']      = __('Statut du Devis', 'fontaine-verte');
        $new_columns['date']             = __('Date de réception', 'fontaine-verte');
        return $new_columns;
    }

    public static function render_lead_columns($column, $post_id) {
        switch ($column) {
            case 'lead_company':
                $company = get_post_meta($post_id, 'fv_lead_company', true);
                echo '<strong>' . esc_html($company ?: 'Particulier / Non spécifié') . '</strong>';
                break;
            case 'lead_contact':
                $contact = get_post_meta($post_id, 'fv_lead_contact', true);
                $phone = get_post_meta($post_id, 'fv_lead_phone', true);
                $email = get_post_meta($post_id, 'fv_lead_email', true);
                echo esc_html($contact) . '<br><a href="tel:' . esc_attr($phone) . '">' . esc_html($phone) . '</a>';
                if ($email) {
                    echo '<br><small style="color:#666;">' . esc_html($email) . '</small>';
                }
                break;
            case 'lead_service':
                $service = get_post_meta($post_id, 'fv_lead_service', true);
                $waste = get_post_meta($post_id, 'fv_lead_waste_type', true);
                $vol = get_post_meta($post_id, 'fv_lead_volume', true);
                echo '<strong>' . esc_html($service) . '</strong>';
                if ($waste) echo '<br><span style="font-size:12px;color:#00652c;">' . esc_html($waste) . '</span>';
                if ($vol) echo '<br><small>' . esc_html($vol) . '</small>';
                break;
            case 'lead_status':
                $status = get_post_meta($post_id, 'fv_lead_status', true) ?: 'new';
                $badge_colors = [
                    'new'         => ['bg' => '#ffdad6', 'color' => '#93000a', 'label' => '🔔 Nouveau'],
                    'in_progress' => ['bg' => '#cde5ff', 'color' => '#004b74', 'label' => '⏳ En cours'],
                    'quoted'      => ['bg' => '#eaedff', 'color' => '#006399', 'label' => '📄 Devis transmis'],
                    'completed'   => ['bg' => '#d3ffd5', 'color' => '#00652c', 'label' => '✅ Validé CIAPOL'],
                ];
                $conf = $badge_colors[$status] ?? ['bg' => '#eee', 'color' => '#333', 'label' => $status];
                echo '<span style="display:inline-block;padding:4px 8px;border-radius:12px;font-size:11px;font-weight:700;background:' . esc_attr($conf['bg']) . ';color:' . esc_attr($conf['color']) . ';">' . esc_html($conf['label']) . '</span>';
                break;
        }
    }

    public static function add_leads_badge_to_menu() {
        global $menu;
        // Compter les leads avec statut "new"
        $new_leads_query = new WP_Query([
            'post_type'      => 'fv_lead',
            'post_status'    => 'publish',
            'posts_per_page' => -1,
            'meta_query'     => [
                [
                    'key'     => 'fv_lead_status',
                    'value'   => 'new',
                    'compare' => '=',
                ]
            ],
            'fields' => 'ids',
        ]);
        $count = $new_leads_query->found_posts;
        if ($count > 0) {
            foreach ($menu as $key => $item) {
                if ($item[2] === 'fontaine-verte-menu') {
                    $menu[$key][0] .= " <span class='update-plugins count-{$count}' style='background-color:#00652c;border-radius:9px;padding:0 6px;color:#fff;font-size:10px;font-weight:bold;'><span class='plugin-count'>{$count}</span></span>";
                    break;
                }
            }
        }
    }
}
