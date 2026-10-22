<?php
/**
 * Plugin Name: Fontaine Verte - Headless Core & Custom Dashboard
 * Plugin URI: https://fontaineverte.ci
 * Description: Extension officielle Fontaine Verte : White-label Dashboard, gestion des Déchets/Équipements (CIAPOL), Bridge REST API pour frontend Vercel (Next.js) et réception sécurisée des demandes de devis.
 * Version: 1.0.0
 * Author: Fontaine Verte SARL
 * Author URI: https://fontaineverte.ci
 * Text Domain: fontaine-verte
 * Domain Path: /languages
 * Requires at least: 6.0
 * Requires PHP: 7.4
 */

// Interdiction de l'accès direct
if (!defined('ABSPATH')) {
    exit;
}

// Définition des constantes du plugin
define('FV_PLUGIN_VERSION', '1.0.0');
define('FV_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('FV_PLUGIN_URL', plugin_dir_url(__FILE__));
define('FV_PLUGIN_BASENAME', plugin_basename(__FILE__));

// Chargement des modules du plugin
require_once FV_PLUGIN_DIR . 'includes/class-fv-cpt.php';
require_once FV_PLUGIN_DIR . 'includes/class-fv-admin-dashboard.php';
require_once FV_PLUGIN_DIR . 'includes/class-fv-login.php';
require_once FV_PLUGIN_DIR . 'includes/class-fv-cors.php';
require_once FV_PLUGIN_DIR . 'includes/class-fv-rest-api.php';
require_once FV_PLUGIN_DIR . 'includes/class-fv-seeder.php';

/**
 * Initialisation principale du plugin Fontaine Verte
 */
class Fontaine_Verte_Plugin {
    private static $instance = null;

    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    private function __construct() {
        // Enregistrement des hooks d'activation et de désactivation
        register_activation_hook(__FILE__, [$this, 'activate']);
        register_deactivation_hook(__FILE__, [$this, 'deactivate']);

        // Initialisation des modules
        add_action('plugins_loaded', [$this, 'init_modules']);
    }

    public function activate() {
        // Déclenche l'enregistrement des CPT
        FV_CPT::register_post_types();
        FV_CPT::register_taxonomies();
        flush_rewrite_rules();

        // Création des options par défaut si absentes
        if (!get_option('fv_frontend_url')) {
            update_option('fv_frontend_url', 'http://localhost:3000');
        }
        if (!get_option('fv_company_phone')) {
            update_option('fv_company_phone', '+225 07 57 94 74 40');
        }
        if (!get_option('fv_company_email')) {
            update_option('fv_company_email', 'contact@fontaineverte.ci');
        }
    }

    public function deactivate() {
        flush_rewrite_rules();
    }

    public function init_modules() {
        FV_CPT::init();
        FV_Admin_Dashboard::init();
        FV_Login::init();
        FV_CORS::init();
        FV_REST_API::init();
        FV_Seeder::init();
    }
}

// Lancement du plugin
Fontaine_Verte_Plugin::get_instance();
