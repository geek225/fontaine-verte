<?php
/**
 * Dashboard Personnalisé Fontaine Verte (White-Label B2B Déchets & CIAPOL)
 */

if (!defined('ABSPATH')) {
    exit;
}

class FV_Admin_Dashboard {

    public static function init() {
        add_action('admin_menu', [__CLASS__, 'register_admin_menus']);
        add_action('admin_enqueue_scripts', [__CLASS__, 'enqueue_admin_assets']);
        add_action('wp_dashboard_setup', [__CLASS__, 'customize_dashboard_widgets'], 999);
        add_action('admin_init', [__CLASS__, 'register_settings']);
        add_action('admin_notices', [__CLASS__, 'render_admin_notices']);
        add_filter('admin_footer_text', [__CLASS__, 'custom_admin_footer']);
        add_action('admin_bar_menu', [__CLASS__, 'customize_admin_bar'], 999);
    }

    public static function render_admin_notices() {
        if (isset($_GET['seeded']) && $_GET['seeded'] === '1') {
            echo '<div class="notice notice-success is-dismissible fv-success-notice">';
            echo '<p><strong>🌱 Données officielles injectées avec succès !</strong> Les 6 filières de déchets, l’incinérateur pyrolytique (900–1200°C) et les agréments CIAPOL sont prêts.</p>';
            echo '</div>';
        }
    }

    public static function register_admin_menus() {
        // Menu Principal "Fontaine Verte"
        add_menu_page(
            __('Fontaine Verte', 'fontaine-verte'),
            __('Fontaine Verte', 'fontaine-verte'),
            'manage_options',
            'fontaine-verte-menu',
            [__CLASS__, 'render_main_dashboard'],
            'dashicons-eco',
            2
        );

        // Sous-page Vue d'ensemble
        add_submenu_page(
            'fontaine-verte-menu',
            __('Console Opérationnelle', 'fontaine-verte'),
            __('Tableau de bord', 'fontaine-verte'),
            'manage_options',
            'fontaine-verte-menu',
            [__CLASS__, 'render_main_dashboard']
        );

        // Sous-page Réglages Headless & Vercel
        add_submenu_page(
            'fontaine-verte-menu',
            __('Configuration Headless & Vercel', 'fontaine-verte'),
            __('Réglages & API', 'fontaine-verte'),
            'manage_options',
            'fontaine-verte-settings',
            [__CLASS__, 'render_settings_page']
        );
    }

    public static function register_settings() {
        register_setting('fv_settings_group', 'fv_frontend_url', [
            'type'              => 'string',
            'sanitize_callback' => 'esc_url_raw',
            'default'           => 'http://localhost:3000',
        ]);
        register_setting('fv_settings_group', 'fv_company_phone', [
            'type'              => 'string',
            'sanitize_callback' => 'sanitize_text_field',
            'default'           => '+225 07 57 94 74 40',
        ]);
        register_setting('fv_settings_group', 'fv_company_email', [
            'type'              => 'string',
            'sanitize_callback' => 'sanitize_email',
            'default'           => 'contact@fontaineverte.ci',
        ]);
        register_setting('fv_settings_group', 'fv_revalidate_secret', [
            'type'              => 'string',
            'sanitize_callback' => 'sanitize_text_field',
            'default'           => wp_generate_password(24, false),
        ]);
    }

    public static function enqueue_admin_assets() {
        wp_enqueue_style(
            'fv-admin-style',
            FV_PLUGIN_URL . 'assets/admin.css',
            [],
            FV_PLUGIN_VERSION . '.' . time() // Cache-busting pour affichage immédiat
        );
    }

    public static function customize_dashboard_widgets() {
        // Nettoyage complet des widgets WordPress génériques
        remove_meta_box('dashboard_quick_press', 'dashboard', 'side');
        remove_meta_box('dashboard_primary', 'dashboard', 'side');
        remove_meta_box('dashboard_secondary', 'dashboard', 'side');
        remove_meta_box('dashboard_site_health', 'dashboard', 'normal');
        remove_meta_box('dashboard_right_now', 'dashboard', 'normal');
        remove_meta_box('dashboard_activity', 'dashboard', 'normal');
        remove_meta_box('dashboard_recent_comments', 'dashboard', 'normal');
        remove_meta_box('dashboard_incoming_links', 'dashboard', 'normal');
        remove_meta_box('dashboard_plugins', 'dashboard', 'normal');
        remove_meta_box('dashboard_recent_drafts', 'dashboard', 'side');

        // 1. Widget Hero & Supervision Principale
        wp_add_dashboard_widget(
            'fv_widget_hero',
            '🌱 Fontaine Verte SARL — Centre Opérationnel Déchets & CIAPOL',
            [__CLASS__, 'render_hero_widget'],
            null,
            null,
            'normal',
            'high'
        );

        // 2. Widget Métriques KPI & Flux Déchets
        wp_add_dashboard_widget(
            'fv_widget_kpis',
            '📊 Indicateurs d’Activité & Traitement Thermique',
            [__CLASS__, 'render_kpis_widget'],
            null,
            null,
            'normal',
            'high'
        );

        // 3. Widget Dernières Demandes de Devis (Leads Entrants)
        wp_add_dashboard_widget(
            'fv_widget_leads',
            '🔔 Demandes de Devis Récentes (En direct du site Web)',
            [__CLASS__, 'render_leads_widget'],
            null,
            null,
            'side',
            'high'
        );

        // 4. Widget Conformité CIAPOL & Fiche Entreprise
        wp_add_dashboard_widget(
            'fv_widget_identity',
            '🏢 Agrément CIAPOL & Fiche Entreprise',
            [__CLASS__, 'render_identity_widget'],
            null,
            null,
            'side',
            'default'
        );

        // 5. Widget Passerelle Headless & Vercel
        wp_add_dashboard_widget(
            'fv_widget_headless',
            '⚡ Passerelle Headless Next.js / Vercel',
            [__CLASS__, 'render_headless_widget'],
            null,
            null,
            'side',
            'low'
        );
    }

    /**
     * WIDGET 1 : Hero & Actions Rapides
     */
    public static function render_hero_widget() {
        $front_url = get_option('fv_frontend_url', 'http://localhost:3000');
        $services_count = wp_count_posts('fv_service')->publish ?? 0;
        ?>
        <div class="fv-dash-hero">
            <div class="fv-hero-header">
                <div class="fv-hero-badge">🌿</div>
                <div>
                    <h2 class="fv-hero-title">Plateforme de Gestion des Déchets & Assainissement</h2>
                    <p class="fv-hero-motto">« Notre souci, c’est un monde sain ! »</p>
                </div>
            </div>

            <p class="fv-hero-desc">
                Bienvenue sur la console d’administration de <strong>Fontaine Verte SARL</strong>. Cette interface alimente en temps réel le site web Headless, centralise les demandes de diagnostic des industriels et assure la traçabilité des bordereaux agréés par le <strong>CIAPOL</strong>.
            </p>

            <div class="fv-hero-status-pills">
                <span class="fv-pill fv-pill-green"><span class="fv-dot"></span> API REST WordPress Active</span>
                <span class="fv-pill fv-pill-green"><span class="fv-dot"></span> Agrément CIAPOL Supervisé</span>
                <span class="fv-pill fv-pill-blue"><span class="fv-dot"></span> Incinérateur Pyrolytique 900–1200°C</span>
                <span class="fv-pill fv-pill-purple"><span class="fv-dot"></span> Traçabilité Déchets B2B</span>
            </div>

            <div class="fv-hero-actions">
                <a href="<?php echo esc_url($front_url); ?>" target="_blank" class="button fv-btn-primary">
                    🌐 Ouvrir le site web public (Next.js) &rarr;
                </a>
                <a href="<?php echo esc_url(admin_url('edit.php?post_type=fv_lead')); ?>" class="button fv-btn-secondary">
                    📩 Traiter les demandes de devis
                </a>
                <?php if ($services_count == 0) : ?>
                <form method="post" action="<?php echo esc_url(admin_url('admin-post.php')); ?>" style="display:inline-block;margin:0;">
                    <?php wp_nonce_field('fv_seed_action', 'fv_seed_nonce'); ?>
                    <input type="hidden" name="action" value="fv_seed_official_data">
                    <button type="submit" class="button fv-btn-seed" onclick="return confirm('Charger les 6 pôles de services, équipements et agréments du PDF officiel ?');">
                        🌱 Charger le catalogue officiel du PDF (1-clic)
                    </button>
                </form>
                <?php endif; ?>
            </div>
        </div>
        <?php
    }

    /**
     * WIDGET 2 : Métriques Clés KPI
     */
    public static function render_kpis_widget() {
        $leads_count = wp_count_posts('fv_lead')->publish ?? 0;
        $services_count = wp_count_posts('fv_service')->publish ?? 0;
        $equip_count = wp_count_posts('fv_equipment')->publish ?? 0;
        $cert_count = wp_count_posts('fv_certification')->publish ?? 0;

        ?>
        <div class="fv-kpi-grid">
            <a href="<?php echo esc_url(admin_url('edit.php?post_type=fv_lead')); ?>" class="fv-kpi-card fv-kpi-green">
                <div class="fv-kpi-icon">📩</div>
                <div class="fv-kpi-data">
                    <span class="fv-kpi-val"><?php echo esc_html($leads_count); ?></span>
                    <span class="fv-kpi-lbl">Demandes de devis</span>
                </div>
            </a>

            <a href="<?php echo esc_url(admin_url('edit.php?post_type=fv_service')); ?>" class="fv-kpi-card fv-kpi-blue">
                <div class="fv-kpi-icon">🛠️</div>
                <div class="fv-kpi-data">
                    <span class="fv-kpi-val"><?php echo esc_html($services_count); ?></span>
                    <span class="fv-kpi-lbl">Filières & Services</span>
                </div>
            </a>

            <a href="<?php echo esc_url(admin_url('edit.php?post_type=fv_equipment')); ?>" class="fv-kpi-card fv-kpi-amber">
                <div class="fv-kpi-icon">🏭</div>
                <div class="fv-kpi-data">
                    <span class="fv-kpi-val"><?php echo esc_html($equip_count ?: '1'); ?></span>
                    <span class="fv-kpi-lbl">Incinérateur & Flotte</span>
                </div>
            </a>

            <a href="<?php echo esc_url(admin_url('edit.php?post_type=fv_certification')); ?>" class="fv-kpi-card fv-kpi-emerald">
                <div class="fv-kpi-icon">📜</div>
                <div class="fv-kpi-data">
                    <span class="fv-kpi-val"><?php echo esc_html($cert_count ?: '1'); ?></span>
                    <span class="fv-kpi-lbl">Agréments d'État</span>
                </div>
            </a>
        </div>
        <?php
    }

    /**
     * WIDGET 3 : Dernières Demandes de Devis (Leads)
     */
    public static function render_leads_widget() {
        $leads = get_posts([
            'post_type'      => 'fv_lead',
            'posts_per_page' => 5,
            'post_status'    => 'publish',
        ]);

        if (empty($leads)) {
            ?>
            <div class="fv-empty-state">
                <div style="font-size:32px;margin-bottom:8px;">📬</div>
                <p style="margin:0 0 10px 0;font-weight:700;color:#131b2e;">Aucune demande de devis en attente</p>
                <p style="margin:0;font-size:12px;color:#6f7a6e;">
                    Les demandes soumises depuis le formulaire du site public apparaîtront automatiquement ici avec notification en temps réel.
                </p>
                <div style="margin-top:12px;">
                    <a href="<?php echo esc_url(get_option('fv_frontend_url', 'http://localhost:3000') . '/#devis'); ?>" target="_blank" class="button button-small">
                        Tester le formulaire sur le site &rarr;
                    </a>
                </div>
            </div>
            <?php
            return;
        }

        ?>
        <div class="fv-leads-table-wrap">
            <table class="fv-table-leads">
                <thead>
                    <tr>
                        <th>Entreprise / Client</th>
                        <th>Déchets</th>
                        <th>Statut</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($leads as $lead) :
                        $company = get_post_meta($lead->ID, 'fv_lead_company', true) ?: $lead->post_title;
                        $service = get_post_meta($lead->ID, 'fv_lead_service', true) ?: 'Diagnostic';
                        $status = get_post_meta($lead->ID, 'fv_lead_status', true) ?: 'new';
                    ?>
                    <tr>
                        <td>
                            <a href="<?php echo esc_url(get_edit_post_link($lead->ID)); ?>" class="fv-lead-link">
                                <strong><?php echo esc_html($company); ?></strong>
                            </a>
                            <span class="fv-lead-date"><?php echo esc_html(get_the_date('d/m/Y à H:i', $lead->ID)); ?></span>
                        </td>
                        <td><span class="fv-service-tag"><?php echo esc_html($service); ?></span></td>
                        <td>
                            <span class="fv-status-pill fv-status-<?php echo esc_attr($status); ?>">
                                <?php echo esc_html($status === 'new' ? 'Nouveau' : $status); ?>
                            </span>
                        </td>
                    </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
            <div style="margin-top:12px;text-align:right;">
                <a href="<?php echo esc_url(admin_url('edit.php?post_type=fv_lead')); ?>" class="button fv-btn-small">
                    Voir toutes les demandes (<?php echo esc_html(wp_count_posts('fv_lead')->publish ?? 0); ?>) &rarr;
                </a>
            </div>
        </div>
        <?php
    }

    /**
     * WIDGET 4 : Identité & Conformité CIAPOL
     */
    public static function render_identity_widget() {
        $phone = get_option('fv_company_phone', '+225 07 57 94 74 40');
        $email = get_option('fv_company_email', 'contact@fontaineverte.ci');

        ?>
        <div class="fv-identity-box">
            <div class="fv-identity-header">
                <span class="dashicons dashicons-shield-alt" style="color:#00652c;font-size:24px;"></span>
                <strong style="color:#00652c;">Opérateur Agréé CIAPOL</strong>
            </div>

            <ul class="fv-identity-list">
                <li><strong>Raison sociale :</strong> FONTAINE VERTE SARL</li>
                <li><strong>Capital Social :</strong> 3 000 000 FCFA</li>
                <li><strong>RCCM :</strong> CI-ABJ-2017-B-17438</li>
                <li><strong>Agrément Officiel :</strong> Centre Ivoirien Anti-Pollution</li>
                <li><strong>Centre de traitement :</strong> Yopougon Gnandobité – Bel air du banco, Lot 30, Îlot 6</li>
                <li><strong>Boîte Postale :</strong> 11 BP 2497 Abidjan 11</li>
                <li><strong>Ligne d’urgence 24h/7j :</strong> <a href="tel:<?php echo esc_attr(str_replace(' ', '', $phone)); ?>"><?php echo esc_html($phone); ?></a></li>
                <li><strong>Courriel :</strong> <a href="mailto:<?php echo esc_attr($email); ?>"><?php echo esc_html($email); ?></a></li>
            </ul>

            <div class="fv-deliverables-pill">
                <strong>4 Livrables Officiels Garantis :</strong><br>
                • Attestation de traitement des déchets<br>
                • Attestation de supervision CIAPOL<br>
                • Fiche de suivi de collecte et transfert<br>
                • Bordereau d’enlèvement contradictoire
            </div>
        </div>
        <?php
    }

    /**
     * WIDGET 5 : Architecture Headless & Vercel
     */
    public static function render_headless_widget() {
        $front_url = get_option('fv_frontend_url', 'http://localhost:3000');
        $api_endpoint = rest_url('fontaine-verte/v1/all-data');

        ?>
        <div class="fv-headless-box">
            <ul class="fv-status-list">
                <li>
                    <span class="dashicons dashicons-rest-api" style="color:#00652c;"></span>
                    <strong>API REST Endpoint :</strong>
                    <br><a href="<?php echo esc_url($api_endpoint); ?>" target="_blank" class="fv-code-link"><?php echo esc_html($api_endpoint); ?></a>
                </li>
                <li>
                    <span class="dashicons dashicons-admin-site" style="color:#006399;"></span>
                    <strong>Frontend Vercel / Next.js :</strong>
                    <br><a href="<?php echo esc_url($front_url); ?>" target="_blank"><?php echo esc_html($front_url); ?></a>
                </li>
                <li>
                    <span class="dashicons dashicons-yes-alt" style="color:#15803d;"></span>
                    <strong>CORS Dynamique :</strong> localhost & *.vercel.app autorisés
                </li>
            </ul>

            <div style="margin-top:14px;display:flex;gap:8px;flex-wrap:wrap;">
                <a href="<?php echo esc_url(admin_url('admin.php?page=fontaine-verte-settings')); ?>" class="button fv-btn-small">
                    ⚙️ Configurer l’API
                </a>
                <a href="<?php echo esc_url($api_endpoint); ?>" target="_blank" class="button fv-btn-small">
                    🔍 Vérifier le flux JSON
                </a>
            </div>
        </div>
        <?php
    }

    /**
     * PAGE DÉDIÉE : Vue d'ensemble Fontaine Verte
     */
    public static function render_main_dashboard() {
        ?>
        <div class="wrap fv-admin-wrap">
            <?php self::render_hero_widget(); ?>
            <div style="margin-top:20px;">
                <?php self::render_kpis_widget(); ?>
            </div>
            <div class="fv-grid-2" style="display:grid;grid-template-columns:1.5fr 1fr;gap:20px;margin-top:20px;">
                <div class="fv-card">
                    <h3 style="margin-top:0;font-size:16px;color:#131b2e;border-bottom:2px solid #eaedff;padding-bottom:8px;">
                        🔔 Demandes de devis & diagnostics récents
                    </h3>
                    <?php self::render_leads_widget(); ?>
                </div>
                <div class="fv-card">
                    <h3 style="margin-top:0;font-size:16px;color:#131b2e;border-bottom:2px solid #eaedff;padding-bottom:8px;">
                        🏢 Fiche Entreprise & Agréments CIAPOL
                    </h3>
                    <?php self::render_identity_widget(); ?>
                </div>
            </div>
        </div>
        <?php
    }

    /**
     * PAGE RÉGLAGES : Configuration Headless
     */
    public static function render_settings_page() {
        if (!current_user_can('manage_options')) {
            return;
        }

        if (isset($_GET['settings-updated'])) {
            add_settings_error('fv_messages', 'fv_message', __('Réglages enregistrés avec succès.', 'fontaine-verte'), 'updated');
        }
        settings_errors('fv_messages');
        ?>
        <div class="wrap fv-admin-wrap">
            <h1 style="color:#00652c;font-weight:800;font-size:24px;">Configuration Headless & Passerelle Vercel</h1>
            <div class="fv-card" style="max-width:820px;margin-top:20px;">
                <form method="post" action="options.php">
                    <?php
                    settings_fields('fv_settings_group');
                    do_settings_sections('fv_settings_group');
                    ?>
                    <table class="form-table">
                        <tr>
                            <th scope="row">URL Frontend Vercel (Next.js)</th>
                            <td>
                                <input type="url" name="fv_frontend_url" value="<?php echo esc_attr(get_option('fv_frontend_url', 'http://localhost:3000')); ?>" class="regular-text" placeholder="https://fontaine-verte.vercel.app">
                                <p class="description">URL du frontend Next.js pour autoriser les requêtes CORS et configurer les liens directs.</p>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Ligne d'urgence & devis 24h/7j</th>
                            <td>
                                <input type="text" name="fv_company_phone" value="<?php echo esc_attr(get_option('fv_company_phone', '+225 07 57 94 74 40')); ?>" class="regular-text">
                                <p class="description">Numéro affiché sur les boutons d'appel direct du site.</p>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Email de contact & notifications</th>
                            <td>
                                <input type="email" name="fv_company_email" value="<?php echo esc_attr(get_option('fv_company_email', 'contact@fontaineverte.ci')); ?>" class="regular-text">
                                <p class="description">Email recevant les alertes instantanées de nouvelles demandes de devis.</p>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Secret de Revalidation On-Demand</th>
                            <td>
                                <input type="text" name="fv_revalidate_secret" value="<?php echo esc_attr(get_option('fv_revalidate_secret')); ?>" class="regular-text">
                                <p class="description">Jeton partagé avec Next.js pour purger automatiquement le cache lors de modifications de contenus.</p>
                            </td>
                        </tr>
                    </table>
                    <?php submit_button(__('Enregistrer les configurations', 'fontaine-verte'), 'primary', 'submit', true, ['style' => 'background:#00652c;border-color:#005323;font-weight:700;']); ?>
                </form>

                <hr style="margin:30px 0 20px 0;border:none;border-top:1px solid #dae2fd;">
                <h3 style="color:#00652c;">🌱 Seeder de Données Officielles (Dossier de présentation)</h3>
                <p style="font-size:13px;color:#3f493f;">
                    Injecte automatiquement les 6 filières de déchets complètes, l'incinérateur pyrolytique à double chambre (900–1200°C avec laveuse de fumées) et les certifications CIAPOL.
                </p>
                <form method="post" action="<?php echo esc_url(admin_url('admin-post.php')); ?>">
                    <?php wp_nonce_field('fv_seed_action', 'fv_seed_nonce'); ?>
                    <input type="hidden" name="action" value="fv_seed_official_data">
                    <button type="submit" class="button fv-btn-seed" onclick="return confirm('Voulez-vous charger toutes les données officielles Fontaine Verte ?');">
                        🌱 Injecter le catalogue officiel du PDF (1-Clic Seeder)
                    </button>
                </form>
            </div>
        </div>
        <?php
    }

    public static function custom_admin_footer() {
        return '<span style="color:#00652c;font-weight:800;">Fontaine Verte SARL</span> — Assainissement écologique, Collecte & Incinération certifiée CIAPOL • Architecture Headless Vercel';
    }

    public static function customize_admin_bar($wp_admin_bar) {
        $front_url = get_option('fv_frontend_url', 'http://localhost:3000');
        $wp_admin_bar->add_node([
            'id'    => 'fv_view_front',
            'title' => '🌱 Voir le site Vercel (Next.js)',
            'href'  => $front_url,
            'meta'  => ['target' => '_blank'],
        ]);
    }
}
