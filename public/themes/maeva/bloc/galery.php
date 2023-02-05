<section class="w-full md:p-10 mt-10">
    <!-- Thumbs des préstations -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-5 p-5 md:px-20 topSection relative">
        <div
            class="flex absolute -top-4 md:-top-5 left-0 w-full flex text-center justify-center items-center md:col-span-2">
            <h1 class="text-xl md:text-2xl font-bold bg-maeva-g800 pl-5 pr-5">Mes galeries ! Mes travaux !</h1>
        </div>
    </div>
    <section id="galeries" class="bg-maeva-g800 grid grid-cols-1 xl:grid-cols-3 gap-5 p-5 md:p-20 mb-24">
        <?php
        $galeries                = get_field( 'galerys' );
        if ( $galeries ) :
            foreach ( $galeries as $presta ) :
                foreach ( $presta as $elem ) :
                    $galeryImage = $elem['galeryImage'];
                    $linkGalery = $elem['linkGalery'];
                    $positionGalery = $elem['positionGalery'];
                    $fitGalery     = $elem['fitGalery'];
                    ?>
                    <div class='w-full grid grid-cols-2 xl:grid-cols-4 gap-10 mb-10'>
                        <div class="col-span-2 xl:col-span-4 flex justify-center flex-col items-center">
                            <a href="<?= esc_url( $linkGalery['url'] ) ?>"
                               class="relative w-full h-full flex justify-center items-center flex-col" rel="noopener">
                                <img draggable="false"
                                    class="<?= esc_attr( $fitGalery) ?> <?= esc_attr( $positionGalery ) ?> mask w-full"
                                    src="<?= esc_url( $galeryImage['url'] ) ?>"
                                    alt="<?= esc_attr( $galeryImage['alt'] ) ?>">
                                <h2 class="font-bold text-lg md:text-xl text-center"><?= $linkGalery['title'] ?></h2>
                            </a>
                        </div>
                    </div>
                <?php
                endforeach;
            endforeach;
        endif; ?>
    </section>
</section>
