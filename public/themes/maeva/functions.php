<?php

use App\Blocs\BlocArticle;
use App\Blocs\BlocGalery;
use App\Blocs\BlocHero;
use App\Blocs\BlocInGalery;
use App\Blocs\BlocPresta;

// call api func
function callAPI( $token ) {
    $curl = curl_init();

    curl_setopt_array( $curl, array(
        CURLOPT_URL            => 'https://www.google.com/recaptcha/api/siteverify',
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING       => '',
        CURLOPT_MAXREDIRS      => 10,
        CURLOPT_TIMEOUT        => 0,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTP_VERSION   => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST  => 'POST',
        CURLOPT_POSTFIELDS     => array( 'secret' => env('CAPCHA'), 'response' => $token )
    ) );

    return curl_exec( $curl );
}

function traitement_formulaire_contact() {
    unset( $_GET['error'], $_GET['fine'] );
    if ( isset( $_POST['envoyer-message'] ) && isset( $_POST['message-verif'] ) ) {
        $string_exp    = "/^[A-Za-z0-9 .'-]+$/";
        $email_to      = "maevacinquin1@gmail.com";
        $email_subject = "Mail - cinquin-maeva.com";
        $email_exp     = '/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/';
        $phone_exp     = '/^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/';

        if ( wp_verify_nonce( $_POST['message-verif'], 'envoyer-message' ) ) {
            // On vérifie que le champ "Pot de miel" est vide
            if ( isset( $_POST['raison'] ) && empty( $_POST['raison'] ) ) {
                if ( $_POST['g-recaptcha-response'] != "" ) {
                    $make_call = callAPI( $_POST['g-recaptcha-response'] );
                    $response  = json_decode( $make_call );
                    if ( $response->success === false ) {
                        $url = add_query_arg( 'erreur', 'token-invalide', wp_get_referer() );
                        wp_safe_redirect( $url );
                        exit();
                    } else {
                        if ( $_POST['nom'] != "" ) {
                            $name = trim( $_POST['nom'] );
                            $name = strip_tags( $name );
                            $name = filter_var( $name, FILTER_SANITIZE_STRING );
                            $name = htmlspecialchars( $name );

                            if ( ! preg_match( $string_exp, $name ) ) {
                                $url = add_query_arg( 'erreur', 'nom-invalide', wp_get_referer() );
                                wp_safe_redirect( $url );
                                exit();
                            }
                        }
                        if ( $_POST['prenom'] != "" ) {
                            $prenom = trim( $_POST['prenom'] );
                            $prenom = strip_tags( $prenom );
                            $prenom = filter_var( $prenom, FILTER_SANITIZE_STRING );
                            $prenom = htmlspecialchars( $prenom );

                            if ( ! preg_match( $string_exp, $prenom ) ) {
                                $url = add_query_arg( 'erreur', 'prenom-invalide', wp_get_referer() );
                                wp_safe_redirect( $url );
                                exit();
                            }
                        }
                        if ( $_POST['mail'] != "" ) {
                            $mail = trim( $_POST['mail'] );
                            $mail = filter_var( $mail, FILTER_SANITIZE_STRING );
                            $mail = htmlspecialchars( $mail );

                            if ( ! preg_match( $email_exp, $mail ) ) {
                                $url = add_query_arg( 'erreur', 'mail-invalide', wp_get_referer() );
                                wp_safe_redirect( $url );
                                exit();
                            }
                        }
                        if ( $_POST['telephone'] != "" ) {
                            $tel = trim( $_POST['telephone'] );
                            $tel = filter_var( $tel, FILTER_SANITIZE_NUMBER_INT );
                            $tel = htmlspecialchars( $tel );

                            if ( ! preg_match( $phone_exp, $tel ) ) {
                                $url = add_query_arg( 'erreur', 'tel-invalide', wp_get_referer() );
                                wp_safe_redirect( $url );
                                exit();
                            }
                        }
                        if ( $_POST['sujet'] != "" ) {
                            $sujet = trim( $_POST['sujet'] );
                            $sujet = strip_tags( $sujet );
                            $sujet = htmlspecialchars( $sujet );
                            $sujet = filter_var( $sujet, FILTER_SANITIZE_STRING );

                            if ( ! preg_match( $string_exp, $prenom ) ) {
                                $url = add_query_arg( 'erreur', 'sujet-invalide', wp_get_referer() );
                                wp_safe_redirect( $url );
                                exit();
                            }
                        }
                        if ( $_POST['message'] != "" ) {
                            $message = trim( $_POST['message'] );
                            $message = strip_tags( $message );
                            $message = htmlspecialchars( $message );
                            $message = filter_var( $message, FILTER_SANITIZE_STRING );

                            if ( ! preg_match( $string_exp, $prenom ) ) {
                                $url = add_query_arg( 'erreur', 'message-invalide', wp_get_referer() );
                                wp_safe_redirect( $url );
                                exit();
                            }
                        }

                        $email_message = "
                            <html>
                            <body>
                            <div style = 'overflow: hidden;' >
                            <font size = '-1' >
                            <u ></u >
                            <div style = 'margin:0;padding:10px 0' bgcolor = '#ffffff' marginwidth = '0' marginheight = '0' >
                            <br >
                            <table border = '0' width = '100%' height = '100%' cellpadding = '0' cellspacing = '0' bgcolor = '#ffffff' >
                            <tbody ><tr > <td align = 'center' valign = 'top' bgcolor = '#ffffff' style = 'background-color:#ffffff' >
                            <table border = '0' width = '600' cellpadding = '0' cellspacing = '0' bgcolor = '#ffffff' > <tbody ><tr >
                            <td bgcolor = '#ffffff' style = 'background-color:#ffffff;padding-left:30px;padding-right:30px;font-size:14px;line-height:20px;font-family:Helvetica,sans-serif;color:#333' >
                            <div style = 'text-align:center;margin-bottom:10px;margin-top:20px' >
                            <img alt = ' ' height = '60' width = '250' style = 'height:60px;width:250px'
                            src = 'https://cinquin-maeva.com/themes/maeva/assets/images/icons/logo.png' >
                            </a >
                            </div >
                            Récapitulatif du mail en provenance de https://cinquin-maeva.com/ :
                            <br ><br >
                            Nom / Prénom : " . $name . "
                            <br>
                            mail : <a style = 'font-style:italic;color:#627BDF'
                            href = 'mailto:" . $mail . "'>
                            " . $mail . "
                            </a >
                            <br>
                            Tél : " . $tel . "
                            <br>
                            <br>
                            Message :
                            <br>
                            <div style = 'text-align:center' >
                            <font color = '#888888' >
                            " . $message . "
                            <br></font>
                            <br>
                            <br>
                            </td>
                            </tr>
                            </tbody>
                            </table>
                            </td>
                            </tr>
                            </tbody>
                            </table>
                            <br>
                            <br>
                            </div>
                            </font>
                            </div>
                            </body>
                            </html>";

                        $secret_mail_private = env("WP_MAILGUN_PRIVATE", "");
                        $secret_mail_public = env("WP_MAILGUN_PUBLIC", "");
                        $secret_mail_webhook = env("WP_MAILGUN_WEBHOOK", "");

                        $mg = Mailgun::create($secret_mail_private, 'https://api.mailgun.net');

                        // Now, compose and send your message.
                        // $mg->messages()->send($domain, $params);
                        $mg->messages()->send('sandbox4a143b58cf0a4ccdbfff1e1f410de28d.mailgun.org', [
                            'from' => 'postmaster@sandbox4a143b58cf0a4ccdbfff1e1f410de28d.mailgun.org',
                            'to' => 'maevacinquin1@gmail.com',
                            'subject' => 'Message de ' . $name . ' depuis le site cinquin-maeva.com',
                            'text' => $email_message
                        ]);

                        $url = add_query_arg( 'fine', 'message-valide', wp_get_referer() );
                        wp_safe_redirect( $url );
                        exit();
                    }
                }
            }
            // Si le champ anti bot n'était pas vide
            $url = add_query_arg( 'erreur', 'message-invalide', wp_get_referer() );
            wp_safe_redirect( $url );
            exit();
        }
    }
}

add_action( 'template_redirect', 'traitement_formulaire_contact' );

// adding css | js
function maeva_enqueue_styles_scripts() {
    $dependencies = [];
    wp_register_style( 'nav', get_template_directory_uri() . '/assets/css/nav.css' );
    $dependencies[] = 'nav';
    wp_register_style( 'footer', get_template_directory_uri() . '/assets/css/footer.css' );
    $dependencies[] = 'footer';
    wp_register_style( 'style', get_template_directory_uri() . '/assets/css/style.css' );
    $dependencies[] = 'style';

    if ( is_front_page() ) {
        wp_register_style( 'accueil', get_template_directory_uri() . '/assets/css/accueil.css' );
        $dependencies[] = 'accueil';
        wp_enqueue_script( 'maeva-script-home', get_template_directory_uri() . '/assets/js/home.js', '', '1', true );
    } else if ( is_page( 'prestations' ) ) {
        wp_register_style( 'prestations', get_template_directory_uri() . '/assets/css/prestations.css' );
        $dependencies[] = 'prestations';
    } else if ( is_page( 'realisations' ) ) {
        wp_register_style( 'galerie', get_template_directory_uri() . '/assets/css/galerie.css' );
        $dependencies[] = 'galerie';
    } else if ( is_home() ) {
        wp_register_style( 'articles', get_template_directory_uri() . '/assets/css/articles.css' );
        $dependencies[] = 'articles';
        wp_register_style( 'splide', get_template_directory_uri() . '/assets/css/splide.css' );
        $dependencies[] = 'splide';
        wp_register_style( 'slider', get_template_directory_uri() . '/assets/css/slider.css' );
        $dependencies[] = 'slider';

        wp_enqueue_script( 'maeva-script-splide', get_template_directory_uri() . '/assets/js/splide.min.js', '', '1', true );
        wp_enqueue_script( 'maeva-script-slider', get_template_directory_uri() . '/assets/js/slider.js', 'maeva-script-splide', '1', true );
    } else if ( is_page( 'contact' ) ) {
        wp_register_style( 'contact', get_template_directory_uri() . '/assets/css/contact.css' );
        $dependencies[] = 'contact';
        wp_enqueue_script( 'maeva-script-osm', get_template_directory_uri() . '/assets/js/osm.js', '', '1', true );
    } else {
        wp_enqueue_script( 'maeva-script', get_template_directory_uri() . '/assets/js/galery.js', '', '1', true );
        wp_register_style( 'galery', get_template_directory_uri() . '/assets/css/galery.css' );
        $dependencies[] = 'galery';
    }

    wp_enqueue_script( 'maeva-script', get_template_directory_uri() . '/assets/js/main.js', '', '1', true );
    wp_enqueue_style( 'maeva-style', get_stylesheet_uri(), $dependencies );

    if ( ! is_admin() ) {
        // optimisation
        wp_dequeue_style( 'wp-block-library' );
        remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
        remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
        remove_action( 'wp_print_styles', 'print_emoji_styles' );
        remove_action( 'admin_print_styles', 'print_emoji_styles' );

        remove_filter( 'the_content_feed', 'wp_staticize_emoji' );
        remove_filter( 'comment_text_rss', 'wp_staticize_emoji' );

        wp_deregister_script( 'wp-embed' );
        wp_deregister_script( 'wp-emoji' );
        wp_deregister_script( 'jquery' );  // Bonus: remove jquery too if it's not required
    }
}

add_action( 'wp_enqueue_scripts', 'maeva_enqueue_styles_scripts' );

add_action( 'after_setup_theme', function () {
    add_theme_support( 'post-thumbnails' );
    add_theme_support( 'title-tag' );
    register_nav_menu( 'maeva_menu', 'menu personnalisée de maeva' );
    add_theme_support( 'editor-styles' );
} );


add_filter( 'block_categories', function ( array $categories ) {
    return array_merge(
        $categories,
        [
            [
                'slug'  => 'maeva',
                'title' => 'Maeva',
            ],
        ]
    );
}, 10, 1 );

BlocHero::register();
BlocPresta::register();
BlocGalery::register();
BlocInGalery::register();
BlocArticle::register();
