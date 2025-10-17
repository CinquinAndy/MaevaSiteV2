<?php get_header(); ?>
<!-- description catégorie section -->
<section class="w-full md:p-10 mt-10">
    <!--    Description -->
    <div class="grid grid-cols-1 xl:grid-cols-2 gap-5 p-5 xl:p-20 topSection relative">
        <div
            class="flex absolute -top-4 md:-top-5 left-0 w-full flex text-center justify-center items-center md:col-span-2">
            <h2 class="text-xl md:text-2xl font-bold bg-maeva-g800 pl-5 pr-5">Contact</h2>
        </div>
        <form action="#" method="post" class="grid grid-cols-1 md:grid-cols-2 gap-5 relative w-full">
            <?php wp_nonce_field('envoyer-message', 'message-verif') ?>
            <!--            Nom & Prénom -->
            <div class="flex text-center justify-center items-center md:col-span-1 md:justify-end">
                <input class="px-5 py-1 bg-white rounded focus:outline-none text-maeva-g800"
                       type="text" id="prenom" name="prenom" placeholder="Votre prénom" required>
            </div>
            <div class="flex text-center justify-center items-center md:col-span-1 md:justify-start">
                <input class="px-5 py-1 bg-white rounded focus:outline-none text-maeva-g800"
                       type="text" id="nom" name="nom" placeholder="Votre nom" required>
            </div>
            <!--            Mail -->
            <div class="flex text-center justify-center items-center md:col-span-1 md:justify-end">
                <input class="px-5 py-1 bg-white rounded focus:outline-none text-maeva-g800"
                       type="email" id="mail" name="mail" placeholder="email@email.com" required>
            </div>
            <!--            Numéro de téléphone -->
            <div class="flex text-center justify-center items-center md:col-span-1 md:justify-start">
                <input class="px-5 py-1 bg-white rounded focus:outline-none text-maeva-g800"
                       type="text" id="telephone" name="telephone" placeholder="06 .. .. .. .." required>
            </div>

            <!--            Sujet -->
            <div class="flex text-center justify-center items-center md:col-span-1 md:justify-end">
                <input class="px-5 py-1 bg-white rounded focus:outline-none text-maeva-g800"
                       type="text" id="sujet" name="sujet" placeholder="Votre sujet" required>
            </div>


            <!--            Message -->
            <div class="flex text-center justify-center items-center md:col-span-2">
                <textarea rows="5" class="md:w-7/12 px-5 py-1 bg-white rounded focus:outline-none text-maeva-g800"
                          id="message" name="message" placeholder="Laissez un message si vous le souhaitez"
                          required></textarea>
            </div>


            <!--  Raison -->
            <input type="hidden" name="raison">
            <div class="flex text-center justify-center items-center md:col-span-2 flex-wrap">
                <span class="text-xs w-1/2 text-right">Aucune donnée personnelle n’est conservée par notre site via ce formulaire,
                les données de contact seront utilisées uniquement pour vous re-contacter.
                <span class="opacity-75">(Une copie du mail générée vous sera également envoyer directement à la boite mail indiquée.)</span>
                    <br><br>
                    <span class="opacity-75">En raison d'une récente recrudescence de désistements, des frais de réservations
                        vous seront demandés afin de valider la prise en charge de la prestation.</span>
                </span>
                <!--            capcha -->
                <div class="flex w-full text-center justify-center items-center m-10">
                    <div class="g-recaptcha" data-sitekey="6LcXhyYcAAAAADX2LJJgnIwFs2tmQe9u5-bOoWs1"></div>
                </div>
                <div class="w-full mb-2">
                    <input type="submit"
                           class="button-contact transform-gpu bg-maeva-purple pt-2 pb-2 pl-3.5 pr-3.5 rounded font-bold text-center m-4 transition duration-200 ease-in-out scale-90 lg:scale-100 hover:text-white hover:scale-105 md:m-0"
                           name="envoyer-message" value="Envoyer le message">
                </div>
                <?php
                if (isset($_GET['error'])):
                    ?>
                    <span
                        class="text-xs w-1/2 text-right mt-2"><?php echo(htmlspecialchars($_GET['error'], ENT_QUOTES)) ?></span>
                <?php
                else :
                    if (isset($_GET['fine'])):
                        ?>
                        <span
                            class="text-xs w-1/2 text-right mt-2"><?php echo(htmlspecialchars($_GET['error'], ENT_QUOTES)) ?></span>
                    <?php endif;
                endif; ?>
            </div>
        </form>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-10 relative w-full">
            <div class="flex justify-center items-center w-full md:col-span-2 flex-wrap">
                <div id="osm-map" class="w-full"></div>
            </div>
            <div class="flex justify-end items-center w-full md:col-span-2">
                <ul>
                    <li class="flex justify-start md:justify-end"><a class="text-start md:text-right"
                                                                     href="tel:0616625137"
                                                                     rel="noopener noreferrer nofollow">06 16 62 51
                            37</a></li>
                    <li class="flex justify-start md:justify-end">15 Avenue de la fontaine couverte Résidence les
                        ondines bâtiment B,
                        74200 Thonon
                    </li>
                </ul>
            </div>
            <div class="hidden xl:flex text-center justify-center items-center md:col-span-2">
                <ul id="media" class="w-full flex justify-evenly">
                    <li class="bg-maeva-g1000 bg-opacity-70 backdrop-blur relative p-2 sm:p-3 md:p-4 rounded md:rounded-2xl shadow overflow-hidden ">
                        <a href="mailto:maevacinquin1@gmail.com"
                           class="relative flex justify-center items-center"
                           target="_blank" rel="noopener noreferrer nofollow">
                            <img
                                src="<?= esc_url(get_template_directory_uri()) ?>/assets/images/icons/socialmedia/white/050-mail.svg"
                                alt="email vers maevacinquin1@gmail.com"
                                class="h-20px w-20px sm:h-30px sm:w-30px md:h-40px md:w-40px"></a></li>
                    <li class="bg-maeva-g1000 bg-opacity-70 backdrop-blur relative p-2 sm:p-3 md:p-4 rounded md:rounded-2xl shadow overflow-hidden ">
                        <a href="tel:0616625137"
                           class="relative flex justify-center items-center"
                           target="_blank" rel="noopener noreferrer nofollow">
                            <img
                                src="<?= esc_url(get_template_directory_uri()) ?>/assets/images/icons/socialmedia/white/005-whatsapp.svg"
                                alt="tel vers 06 16 62 51 37"
                                class="h-20px w-20px sm:h-30px sm:w-30px md:h-40px md:w-40px"></a></li>
                    <li class="bg-maeva-g1000 bg-opacity-70 backdrop-blur relative p-2 sm:p-3 md:p-4 rounded md:rounded-2xl shadow overflow-hidden ">
                        <a href="https://g.page/cinquin-maeva?share"
                           class="relative flex justify-center items-center"
                           target="_blank" rel="noopener noreferrer nofollow">
                            <img
                                src="<?= esc_url(get_template_directory_uri()) ?>/assets/images/icons/socialmedia/white/051-map.svg"
                                alt="lien vers 15 avenue de la fontaine couverte , 74200 thonon"
                                class="h-20px w-20px sm:h-30px sm:w-30px md:h-40px md:w-40px"></a></li>
                    <li class="bg-maeva-g1000 bg-opacity-70 backdrop-blur relative p-2 sm:p-3 md:p-4 rounded md:rounded-2xl shadow overflow-hidden ">
                        <a href="https://www.instagram.com/makeup.artist.dream/"
                           class="relative flex justify-center items-center"
                           target="_blank" rel="noopener noreferrer nofollow">
                            <img
                                src="<?= esc_url(get_template_directory_uri()) ?>/assets/images/icons/socialmedia/white/029-instagram.svg"
                                alt="instagram de Maeva Cinquin, maquillage professionnel, nail-art"
                                class="h-20px w-20px sm:h-30px sm:w-30px md:h-40px md:w-40px"></a></li>
                    <li class="bg-maeva-g1000 bg-opacity-70 backdrop-blur relative p-2 sm:p-3 md:p-4 rounded md:rounded-2xl shadow overflow-hidden ">
                        <a href="https://www.facebook.com/Cinquin-maeva-2360623587315010"
                           class="relative flex justify-center items-center"
                           target=" _blank" rel="noopener noreferrer nofollow">
                            <img
                                src="<?= esc_url(get_template_directory_uri()) ?>/assets/images/icons/socialmedia/white/036-facebook.svg"
                                alt="facebook de Maeva Cinquin, maquillage professionnel, nail-art"
                                class="h-20px w-20px sm:h-30px sm:w-30px md:h-40px md:w-40px"></a></li>
                </ul>
            </div>
        </div>
    </div>
</section>
<?php get_footer(); ?>
