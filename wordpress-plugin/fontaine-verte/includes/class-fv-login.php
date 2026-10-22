<?php
/**
 * Personnalisation de la page de connexion WordPress (White-Label Fontaine Verte)
 */

if (!defined('ABSPATH')) {
    exit;
}

class FV_Login {

    public static function init() {
        add_action('login_enqueue_scripts', [__CLASS__, 'customize_login_css']);
        add_filter('login_headerurl', [__CLASS__, 'customize_login_url']);
        add_filter('login_headertext', [__CLASS__, 'customize_login_title']);
    }

    public static function customize_login_css() {
        ?>
        <style type="text/css">
            body.login {
                background: linear-gradient(135deg, #faf8ff 0%, #eaedff 50%, #d2d9f4 100%) !important;
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
            }
            #login h1 a, .login h1 a {
                background-image: none !important;
                width: 100% !important;
                height: auto !important;
                text-indent: 0 !important;
                display: flex !important;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                gap: 8px;
                color: #00652c !important;
                font-size: 24px !important;
                font-weight: 800 !important;
                letter-spacing: -0.5px;
                text-decoration: none;
            }
            #login h1 a::before {
                content: "🌱";
                font-size: 48px;
                display: block;
            }
            #login h1 a::after {
                content: "Assainissement & Traitement des Déchets";
                font-size: 12px;
                font-weight: 600;
                color: #006399;
                text-transform: uppercase;
                letter-spacing: 1px;
                margin-top: 2px;
            }
            .login form {
                background: #ffffff !important;
                border-radius: 16px !important;
                box-shadow: 0 10px 30px rgba(0, 101, 44, 0.08) !important;
                border: 1px solid #dae2fd !important;
                padding: 28px 24px !important;
            }
            .login form .input, .login input[type="text"], .login input[type="password"] {
                border-radius: 8px !important;
                border: 1px solid #becabc !important;
                padding: 8px 12px !important;
                font-size: 15px !important;
            }
            .login form .input:focus {
                border-color: #00652c !important;
                box-shadow: 0 0 0 1px #00652c !important;
            }
            .wp-core-ui .button-primary {
                background: #00652c !important;
                border-color: #00652c !important;
                color: #ffffff !important;
                border-radius: 8px !important;
                font-weight: 700 !important;
                padding: 6px 16px !important;
                box-shadow: 0 4px 12px rgba(0, 101, 44, 0.25) !important;
                transition: all 0.2s ease !important;
            }
            .wp-core-ui .button-primary:hover {
                background: #008138 !important;
                border-color: #008138 !important;
            }
            .login #backtoblog a, .login #nav a {
                color: #00652c !important;
                font-weight: 600 !important;
            }
        </style>
        <?php
    }

    public static function customize_login_url() {
        return home_url('/');
    }

    public static function customize_login_title() {
        return 'Fontaine Verte SARL — Plateforme Sécurisée';
    }
}
