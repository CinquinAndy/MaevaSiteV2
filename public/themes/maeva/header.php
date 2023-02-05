<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport"
          content="width=device-width, user-scalable=yes, initial-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="<?= get_theme_file_uri('assets/app.css') ?>">
    <?php wp_head(); ?>
    <meta content="index,follow" name="robots">
    <script src="https://use.typekit.net/ayg0khv.js"></script>
    <script>try{Typekit.load({ async: true });}catch(e){}</script>

    <?php if (is_page('contact')) : ?>
        <script src="https://www.google.com/recaptcha/api.js" async defer></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/leaflet.min.js"></script>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/leaflet.min.css">
    <?php endif; ?>
</head>
<body <?php body_class([
    "bg-maeva-g800",
    "text-maeva-g50",
    "tracking-normal",
    "leading-relaxed"
]); ?>>
<?php $menu = wp_get_nav_menu_items('maeva_menu') ?>
<header
    class="sticky mt-0 p-2 top-0 left-0 w-full navbar z-50 bg-maeva-pinkHot bg-opacity-5 font-semibold text-xs backdrop-blur text-white">
    <nav role="navigation" class="container inline items-center justify-center">
        <div class="float-left h-1"><a href="<?= esc_url($menu[0]->url) ?>" rel="noopener">
                <button class="button_logo" aria-label="Logo Maeva Cinquin">
                    <img src="
            <?= get_template_directory_uri() ?>/assets/images/icons/logo.png" alt="Logo Maeva Cinquin"
                         class="w-auto h-7 m-2">
                </button>
            </a>
        </div>
        <ul id="desktopNav" class="hidden md:flex justify-around items-center h-full">
            <li>
                <a href="<?= esc_url($menu[1]->url) ?>"
                   class="h-auto w-auto transition duration-200 ease-in-out hover:text-maeva-g400" rel="noopener">
                    <?= $menu[1]->title ?>
                </a>
            </li>
            <li>
                <a href="<?= esc_url($menu[2]->url) ?>"
                   class="h-auto w-auto transition duration-200 ease-in-out hover:text-maeva-g400" rel="noopener">
                    <?= $menu[2]->title ?>
                </a>
            </li>
            <li>
                <a href="<?= esc_url($menu[3]->url) ?>"
                   class="h-auto w-auto transition duration-200 ease-in-out hover:text-maeva-g400" rel="noopener">
                    <?= $menu[3]->title ?>
                </a>
            </li>
            <li>
                <a href="<?= esc_url($menu[4]->url) ?>"
                   class="h-auto w-auto transition duration-200 ease-in-out hover:text-maeva-g400" rel="noopener">
                    <?= $menu[4]->title ?>
                </a>
            </li>
        </ul>
        <div>
            <button id="menuIcon"
                    class="focus:outline-none block md:hidden h-10 w-10 transition duration-200 ease-in-out hover:text-maeva-g400 absolute right-0 top-0 m-2 z-50">
                <svg class="menuIcon menuIconRotate block fill-current stroke-current text-white"
                     viewBox="0 0 100 100"
                     width="40" onclick="this.classList.toggle('active')">
                    <path
                        class="line top"
                        d="m 30,33 h 40 c 0,0 9.044436,-0.654587 9.044436,-8.508902 0,-7.854315 -8.024349,-11.958003 -14.89975,-10.85914 -6.875401,1.098863 -13.637059,4.171617 -13.637059,16.368042 v 40"/>
                    <path
                        class="line middle"
                        d="m 30,50 h 40"/>
                    <path
                        class="line bottom"
                        d="m 30,67 h 40 c 12.796276,0 15.357889,-11.717785 15.357889,-26.851538 0,-15.133752 -4.786586,-27.274118 -16.667516,-27.274118 -11.88093,0 -18.499247,6.994427 -18.435284,17.125656 l 0.252538,40"/>
                </svg>
            </button>
        </div>
        <ul id="mobileNav"
            class="hidden absolute top-0 left-0 h-screen w-full bg-maeva-g800 flex-col justify-around items-center h-full">
            <li>
                <a href="<?= esc_url($menu[1]->url) ?>"
                   class="h-auto w-auto transition duration-200 ease-in-out hover:text-maeva-g400" rel="noopener">
                    <?= $menu[1]->title ?>
                </a>
            </li>
            <li>
                <a href="<?= esc_url($menu[2]->url) ?>"
                   class="h-auto w-auto transition duration-200 ease-in-out hover:text-maeva-g400" rel="noopener">
                    <?= $menu[2]->title ?>
                </a>
            </li>
            <li>
                <a href="<?= esc_url($menu[3]->url) ?>"
                   class="h-auto w-auto transition duration-200 ease-in-out hover:text-maeva-g400" rel="noopener">
                    <?= $menu[3]->title ?>
                </a>
            </li>
            <li>
                <a href="<?= esc_url($menu[4]->url) ?>"
                   class="h-auto w-auto transition duration-200 ease-in-out hover:text-maeva-g400" rel="noopener">
                    <?= $menu[4]->title ?>
                </a>
            </li>
        </ul>
    </nav>
</header>
