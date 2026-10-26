<?php
/**
 * Endpoints REST API sur-mesure pour Fontaine Verte
 */

if (!defined('ABSPATH')) {
    exit;
}

class FV_REST_API {

    const NAMESPACE = 'fontaine-verte/v1';

    public static function init() {
        add_action('rest_api_init', [__CLASS__, 'register_routes']);
    }

    public static function register_routes() {
        // Ping / Healthcheck
        register_rest_route(self::NAMESPACE, '/ping', [
            'methods'             => 'GET',
            'callback'            => [__CLASS__, 'handle_ping'],
            'permission_callback' => '__return_true',
        ]);

        // Données complètes pour Next.js (SSG / ISR)
        register_rest_route(self::NAMESPACE, '/all-data', [
            'methods'             => 'GET',
            'callback'            => [__CLASS__, 'handle_get_all_data'],
            'permission_callback' => '__return_true',
        ]);

        // Soumission de demande de devis / diagnostic
        register_rest_route(self::NAMESPACE, '/submit-lead', [
            'methods'             => 'POST',
            'callback'            => [__CLASS__, 'handle_submit_lead'],
            'permission_callback' => '__return_true',
        ]);
    }

    public static function handle_ping() {
        return rest_ensure_response([
            'status'     => 'ok',
            'app'        => 'Fontaine Verte Headless API',
            'version'    => FV_PLUGIN_VERSION,
            'timestamp'  => current_time('mysql'),
            'ciapol_status' => 'Agrément vérifié',
        ]);
    }

    public static function handle_get_all_data() {
        // Informations officielles d'entreprise
        $company_info = [
            'name'          => 'FONTAINE VERTE SARL',
            'legal_status'  => 'Société A Responsabilité Limitée',
            'capital'       => '3 000 000 FCFA',
            'rccm'          => 'CI-ABJ-2017-B-17438',
            'address'       => 'ABIDJAN Yopougon Gnandobité – Bel air du banco, Lot 30, Îlot 6',
            'postal_box'    => '11 BP 2497 Abidjan 11',
            'phones'        => [
                '+225 07 57 94 74 40',
                '+225 07 49 92 88 16',
            ],
            'primary_phone' => get_option('fv_company_phone', '+225 07 57 94 74 40'),
            'email'         => get_option('fv_company_email', 'contact@fontaineverte.ci'),
            'tagline'       => 'Notre souci, un monde sain !',
            'accreditation' => 'Centre Ivoirien Anti-Pollution (CIAPOL)',
        ];

        // 1. Récupération des services
        $services_posts = get_posts([
            'post_type'      => 'fv_service',
            'posts_per_page' => -1,
            'post_status'    => 'publish',
            'orderby'        => 'menu_order',
            'order'          => 'ASC',
        ]);

        $services = [];
        foreach ($services_posts as $post) {
            $thumb_id = get_post_thumbnail_id($post->ID);
            $thumb_url = $thumb_id ? wp_get_attachment_image_url($thumb_id, 'large') : null;
            $services[] = [
                'id'           => $post->ID,
                'slug'         => $post->post_name,
                'title'        => $post->post_title,
                'excerpt'      => $post->post_excerpt ?: wp_trim_words($post->post_content, 25),
                'content'      => apply_filters('the_content', $post->post_content),
                'image'        => $thumb_url,
                'icon'         => get_post_meta($post->ID, 'fv_service_icon', true) ?: 'eco',
                'subtitle'     => get_post_meta($post->ID, 'fv_service_subtitle', true),
                'deliverables' => get_post_meta($post->ID, 'fv_service_deliverables', true),
            ];
        }

        // 2. Récupération des équipements
        $equip_posts = get_posts([
            'post_type'      => 'fv_equipment',
            'posts_per_page' => -1,
            'post_status'    => 'publish',
        ]);

        $equipments = [];
        foreach ($equip_posts as $post) {
            $thumb_id = get_post_thumbnail_id($post->ID);
            $thumb_url = $thumb_id ? wp_get_attachment_image_url($thumb_id, 'large') : null;
            $equipments[] = [
                'id'          => $post->ID,
                'slug'        => $post->post_name,
                'title'       => $post->post_title,
                'description' => apply_filters('the_content', $post->post_content),
                'image'       => $thumb_url,
                'specs'       => [
                    'capacity'    => get_post_meta($post->ID, 'fv_eq_capacity', true),
                    'temperature' => get_post_meta($post->ID, 'fv_eq_temperature', true),
                    'power'       => get_post_meta($post->ID, 'fv_eq_power', true),
                    'dimensions'  => get_post_meta($post->ID, 'fv_eq_dimensions', true),
                    'energy'      => get_post_meta($post->ID, 'fv_eq_energy', true),
                    'weight'      => get_post_meta($post->ID, 'fv_eq_weight', true),
                    'voltage'     => get_post_meta($post->ID, 'fv_eq_voltage', true),
                    'door_size'   => get_post_meta($post->ID, 'fv_eq_door_size', true),
                    'features'    => get_post_meta($post->ID, 'fv_eq_features', true),
                ]
            ];
        }

        // 3. Récupération des certifications
        $cert_posts = get_posts([
            'post_type'      => 'fv_certification',
            'posts_per_page' => -1,
            'post_status'    => 'publish',
        ]);

        $certifications = [];
        foreach ($cert_posts as $post) {
            $thumb_id = get_post_thumbnail_id($post->ID);
            $thumb_url = $thumb_id ? wp_get_attachment_image_url($thumb_id, 'full') : null;
            $certifications[] = [
                'id'          => $post->ID,
                'title'       => $post->post_title,
                'description' => apply_filters('the_content', $post->post_content),
                'image'       => $thumb_url,
            ];
        }

        return rest_ensure_response([
            'success'        => true,
            'company'        => $company_info,
            'services'       => $services,
            'equipments'     => $equipments,
            'certifications' => $certifications,
        ]);
    }

    public static function handle_submit_lead($request) {
        $params = $request->get_json_params();
        if (empty($params)) {
            $params = $request->get_body_params();
        }

        // 1. Protection Anti-Spam (Honeypot)
        if (!empty($params['website_url_hp'])) {
            // Un bot a rempli le champ honeypot
            return new WP_Error('spam_detected', __('Requête invalide.', 'fontaine-verte'), ['status' => 400]);
        }

        // 2. Validation & Nettoyage des données (Sécurité OWASP)
        $company_name = sanitize_text_field($params['company_name'] ?? '');
        $contact_name = sanitize_text_field($params['contact_name'] ?? '');
        $phone        = sanitize_text_field($params['phone'] ?? '');
        $email        = sanitize_email($params['email'] ?? '');
        $service      = sanitize_text_field($params['service'] ?? 'Diagnostic Général');
        $waste_type   = sanitize_text_field($params['waste_type'] ?? 'Non spécifié');
        $volume       = sanitize_text_field($params['volume'] ?? '');
        $message      = sanitize_textarea_field($params['message'] ?? '');

        if (empty($contact_name) && empty($company_name)) {
            return new WP_Error('missing_name', __('Le nom du contact ou de l’entreprise est obligatoire.', 'fontaine-verte'), ['status' => 400]);
        }

        if (empty($phone)) {
            return new WP_Error('missing_phone', __('Le numéro de téléphone est obligatoire.', 'fontaine-verte'), ['status' => 400]);
        }

        // 3. Création du post fv_lead dans WordPress
        $lead_title = sprintf('Devis: %s (%s)', $company_name ?: $contact_name, current_time('d/m/Y H:i'));

        $post_content = "### Détails de la demande reçue depuis le site web\n\n";
        $post_content .= "**Entreprise :** " . ($company_name ?: 'Non précisé') . "\n";
        $post_content .= "**Contact :** " . $contact_name . "\n";
        $post_content .= "**Téléphone :** " . $phone . "\n";
        $post_content .= "**Email :** " . ($email ?: 'Non précisé') . "\n";
        $post_content .= "**Service sollicité :** " . $service . "\n";
        $post_content .= "**Type de déchet :** " . $waste_type . "\n";
        $post_content .= "**Volume / Fréquence :** " . ($volume ?: 'Non précisé') . "\n\n";
        $post_content .= "**Description du besoin :**\n" . $message . "\n";

        $lead_id = wp_insert_post([
            'post_title'   => $lead_title,
            'post_content' => $post_content,
            'post_status'  => 'publish',
            'post_type'    => 'fv_lead',
        ]);

        if (is_wp_error($lead_id)) {
            return new WP_Error('db_error', __('Impossible d’enregistrer la demande.', 'fontaine-verte'), ['status' => 500]);
        }

        // Sauvegarde des métadonnées
        update_post_meta($lead_id, 'fv_lead_company', $company_name);
        update_post_meta($lead_id, 'fv_lead_contact', $contact_name);
        update_post_meta($lead_id, 'fv_lead_phone', $phone);
        update_post_meta($lead_id, 'fv_lead_email', $email);
        update_post_meta($lead_id, 'fv_lead_service', $service);
        update_post_meta($lead_id, 'fv_lead_waste_type', $waste_type);
        update_post_meta($lead_id, 'fv_lead_volume', $volume);
        update_post_meta($lead_id, 'fv_lead_status', 'new');
        update_post_meta($lead_id, 'fv_lead_ip', sanitize_text_field($_SERVER['REMOTE_ADDR'] ?? ''));

        // 4. Notification Email
        $admin_email = get_option('fv_company_email', get_option('admin_email'));
        if ($admin_email) {
            $subject = sprintf('[Fontaine Verte] Nouvelle demande de devis : %s', $company_name ?: $contact_name);
            $body = "Une nouvelle demande de diagnostic / devis vient d'être soumise sur le site web Fontaine Verte.\n\n" . $post_content;
            $body .= "\nConsulter la demande dans l'administration :\n" . admin_url('post.php?post=' . $lead_id . '&action=edit');
            wp_mail($admin_email, $subject, $body);
        }

        return rest_ensure_response([
            'success' => true,
            'lead_id' => $lead_id,
            'message' => __('Votre demande a été transmise avec succès à l’équipe technique de Fontaine Verte SARL. Nous vous recontacterons dans les plus brefs délais.', 'fontaine-verte'),
        ]);
    }
}
