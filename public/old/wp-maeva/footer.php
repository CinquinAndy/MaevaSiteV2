<footer class="w-full flex mt-20 sm:mt-30 md:mt-40 bg-maeva-g800 relative items-center justify-center">
    <ul id="social" class="absolute left-0 -top-4.5 sm:-top-7 md:-top-9 w-full flex justify-evenly">
        <li class="bg-maeva-g1000 bg-opacity-70 backdrop-blur relative p-2 sm:p-3 md:p-4 rounded md:rounded-2xl shadow overflow-hidden ">
            <a href="mailto:maevacinquin1@gmail.com"
               class="relative flex justify-center items-center"
               target="_blank" rel="noopener norefer nofollow">
                <img
                    src="<?= esc_url( get_template_directory_uri() ) ?>/assets/images/icons/socialmedia/white/050-mail.svg"
                    alt="email vers maevacinquin1@gmail.com, maquilleuse professionnelle & prothésisthe ongulaire / Nail art artist"
                    class="h-20px w-20px sm:h-30px sm:w-30px md:h-40px md:w-40px"></a></li>
        <li class="bg-maeva-g1000 bg-opacity-70 backdrop-blur relative p-2 sm:p-3 md:p-4 rounded md:rounded-2xl shadow overflow-hidden ">
            <a href="tel:0616625137"
               class="relative flex justify-center items-center"
               target="_blank" rel="noopener norefer nofollow">
                <img
                    src="<?= esc_url( get_template_directory_uri() ) ?>/assets/images/icons/socialmedia/white/005-whatsapp.svg"
                    alt="tel vers 06 16 62 51 37, maquilleuse professionnelle & prothésisthe ongulaire / Nail art artist"
                    class="h-20px w-20px sm:h-30px sm:w-30px md:h-40px md:w-40px"></a></li>
        <li class="bg-maeva-g1000 bg-opacity-70 backdrop-blur relative p-2 sm:p-3 md:p-4 rounded md:rounded-2xl shadow overflow-hidden ">
            <a href="https://g.page/cinquin-maeva?share"
               class="relative flex justify-center items-center"
               target="_blank" rel="noopener norefer nofollow">
                <img
                    src="<?= esc_url( get_template_directory_uri() ) ?>/assets/images/icons/socialmedia/white/051-map.svg"
                    alt="lien vers 15 avenue de la fontaine couverte , 74200 thonon"
                    class="h-20px w-20px sm:h-30px sm:w-30px md:h-40px md:w-40px"></a></li>
        <li class="bg-maeva-g1000 bg-opacity-70 backdrop-blur relative p-2 sm:p-3 md:p-4 rounded md:rounded-2xl shadow overflow-hidden ">
            <a href="https://www.instagram.com/makeup.artist.dream/"
               class="relative flex justify-center items-center"
               target="_blank" rel="noopener norefer nofollow">
                <img
                    src="<?= esc_url( get_template_directory_uri() ) ?>/assets/images/icons/socialmedia/white/029-instagram.svg"
                    alt="instagram de Maeva Cinquin, maquillage professionnel, nail-art"
                    class="h-20px w-20px sm:h-30px sm:w-30px md:h-40px md:w-40px"></a></li>
        <li class="bg-maeva-g1000 bg-opacity-70 backdrop-blur relative p-2 sm:p-3 md:p-4 rounded md:rounded-2xl shadow overflow-hidden ">
            <a href="https://www.facebook.com/Cinquin-maeva-2360623587315010"
               class="relative flex justify-center items-center"
               target=" _blank" rel="noopener norefer nofollow">
                <img
                    src="<?= esc_url( get_template_directory_uri() ) ?>/assets/images/icons/socialmedia/white/036-facebook.svg"
                    alt="facebook de Maeva Cinquin, maquillage professionnel, nail-art"
                    class="h-20px w-20px sm:h-30px sm:w-30px md:h-40px md:w-40px"></a></li>
    </ul>
    <div class="flex w-full justify-end md:border-t-2 bg-maeva-g800">
                    <span class="p-4 pt-16 sm:pt-24 md:pt-32 font-xs">
                        <?php $menu = wp_get_nav_menu_items( 'maeva_menu' ); ?>
                        <a href="<?= esc_url( $menu[4]->url ) ?>"
                           class="underline transition duration-200 ease-in-out text-gray-100 hover:text-gray-500 " rel="noopener">
                            <?= $menu[4]->title ?>
                        </a>
                        - Developed & designed by
                        <a href="https://andy-cinquin.fr"
                           class="underline transition duration-200 ease-in-out text-gray-100 hover:text-gray-500" rel="noopener">
                            Cinquin Andy
                        </a>
                        | Freelance developer -
                        <?php $linkPrivacy = esc_url( get_permalink( ( get_option( 'wp_page_for_privacy_policy' ) ) ) ) ?>
                        <a href="<?= $linkPrivacy ?>"
                           class="underline transition duration-200 ease-in-out text-gray-100 hover:text-gray-500" rel="noopener">Legal Notice</a>
                        ( <a href="<?= $linkPrivacy ?>"
                             class="underline transition duration-200 ease-in-out text-gray-100 hover:text-gray-500" rel="noopener">Mentions légales</a> )
                    </span>
    </div>
</footer>
<script src="<?= esc_url( get_theme_file_uri( 'assets/app.js' ) ) ?>" async></script>
<?php wp_footer(); ?>
</body>
</html>
