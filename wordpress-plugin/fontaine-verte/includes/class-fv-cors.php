<?php
/**
 * Gestion robuste des en-têtes CORS pour frontend Headless (Next.js / Vercel)
 */

if (!defined('ABSPATH')) {
    exit;
}

class FV_CORS {

    public static function init() {
        add_action('init', [__CLASS__, 'handle_cors_preflight']);
        add_filter('rest_pre_serve_request', [__CLASS__, 'add_cors_headers'], 10, 4);
    }

    private static function is_origin_allowed($origin) {
        if (empty($origin)) {
            return false;
        }

        // Localhost dev Next.js
        if (preg_match('#^https?://localhost(:[0-9]+)?$#', $origin) ||
            preg_match('#^https?://127\.0\.0\.1(:[0-9]+)?$#', $origin)) {
            return true;
        }

        // Vercel preview & production deployments
        if (preg_match('#^https://[a-zA-Z0-9-]+\.vercel\.app$#', $origin)) {
            return true;
        }

        // URL custom configurée dans les réglages
        $configured_url = get_option('fv_frontend_url');
        if (!empty($configured_url)) {
            $parsed_configured = wp_parse_url($configured_url);
            $parsed_origin = wp_parse_url($origin);
            if (isset($parsed_configured['host'], $parsed_origin['host']) && $parsed_configured['host'] === $parsed_origin['host']) {
                return true;
            }
        }

        return false;
    }

    public static function handle_cors_preflight() {
        if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
            if (self::is_origin_allowed($origin)) {
                header("Access-Control-Allow-Origin: {$origin}");
                header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
                header("Access-Control-Allow-Headers: Authorization, Content-Type, X-Requested-With, X-WP-Nonce");
                header("Access-Control-Allow-Credentials: true");
                header("Access-Control-Max-Age: 86400");
                status_header(200);
                exit;
            }
        }
    }

    public static function add_cors_headers($value, $result, $request, $server) {
        $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
        if (self::is_origin_allowed($origin)) {
            header("Access-Control-Allow-Origin: {$origin}");
            header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
            header("Access-Control-Allow-Headers: Authorization, Content-Type, X-Requested-With, X-WP-Nonce");
            header("Access-Control-Allow-Credentials: true");
        }
        return $value;
    }
}
