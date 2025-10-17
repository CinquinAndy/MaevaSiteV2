<!-- Accueil -->
<section class="flex relative transform-gpu translate-y-nav">
    <div class="h-screen">
        <div class="h-full w-full flex justify-center items-center absolute z-40 font-title background">
            <h1 class="text-center">
                <span class="text-center titleHome text-4xl md:text-8xl">
                    <?= get_field( 'title' ) ?>
                </span>
                <br>
                <span class="text-center titleHome text-base md:text-2xl pt-4 md:pt-0 float-right">
                    <?= get_field( 'subtitle' ) ?>
                </span>
            </h1>
        </div>
    </div>
</section>
<div id="blocksite" class="bg-maeva-g800 transition duration-2000 ease-in-out">
    <!-- présentation -->
    <section class="w-full">
        <div class="pl-5 pr-5 w-full flex flex-col-reverse xl:p-0 xl:flex-row">
            <article class="w-full xl:w-1/2 pl-2 pr-2 xl:pl-20 xl:pr-20  flex flex-col justify-evenly">
                <div class="container w-full text-start mt-10 mb-5 xl:m-0">
                    <p>
                        <?= get_field( 'content' ) ?>
                    </p>
                </div>
                <div class="flex justify-evenly text-xs">
                    <?php $linkFirstBtn = get_field( 'linkFirstBtn' );
                    if ( $linkFirstBtn['title'] ?? null ):
                        ?>
                        <a href="<?= esc_url( $linkFirstBtn['url'] ) ?>" class="transform-gpu text-maeva-purple bg-maeva-pink pt-2
                            pb-2 pl-3.5 pr-3.5 rounded font-bold text-center
                            m-2 transition duration-200 ease-in-out scale-90 lg:scale-100
                            hover:scale-105 xl:m-0" rel="noopener">
                            <?= $linkFirstBtn['title'] ?>
                        </a>
                    <?php endif; ?>
                    <!-- --------------------------------------------------------------------------------------- -->
                    <?php $linkSecondBtn = get_field( 'linkSecondBtn' );
                    if ( $linkSecondBtn['title'] ?? null ):
                        ?>
                        <a href="<?= esc_url( $linkSecondBtn['url'] ) ?>" class="transform-gpu bg-maeva-purple pt-2 pb-2
                            pl-3.5 pr-3.5 rounded font-bold text-center
                            m-2 transition duration-200 ease-in-out scale-90 lg:scale-100
                            hover:scale-105 xl:m-0" rel="noopener">
                            <?= $linkSecondBtn['title'] ?>
                        </a>
                    <?php endif; ?>
                    <!-- --------------------------------------------------------------------------------------- -->
                    <?php $linkThirdBtn = get_field( 'linkThirdBtn' );
                    if ( $linkThirdBtn['title'] ?? null ):
                        ?>
                        <a href="<?= esc_url( $linkThirdBtn['url'] ) ?>" class="transform-gpu bg-maeva-pink text-maeva-purple pt-2 pb-2
                            pl-3.5 pr-3.5 rounded font-bold text-center
                            m-2 transition duration-200 ease-in-out scale-90 lg:scale-100
                            hover:scale-105 xl:m-0" rel="noopener">
                            <?= $linkThirdBtn['title'] ?>
                        </a>
                    <?php endif; ?>
                </div>
            </article>
            <aside class="w-full xl:w-1/2">
                <img src="<?= esc_url( get_template_directory_uri() ) ?>/assets/images/principal/Photo_Maquilleuse_Professionnelle_Maeva_Cinquin.jpg"
                     alt="Maeva Cinquin - maquilleuse professionnelle - nail art" class="rounded md:rounded-l-2xl">
            </aside>
        </div>
    </section>
</div>
