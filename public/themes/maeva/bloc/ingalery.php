<section class="w-full md:p-10 mt-10">
    <!-- Thumbs des préstations -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-5 p-5 md:px-20 topSection relative">
        <div
            class="flex absolute -top-4 md:-top-5 left-0 w-full flex text-center justify-center items-center md:col-span-2">
            <h1 class="text-xl md:text-2xl font-bold bg-maeva-g800 pl-5 pr-5"><?= the_title() ?></h1>
        </div>
    </div>
    <?php $images = get_field( 'galerys' );
    if ( ! empty( $images ) ): ?>
        <ul
            class="gridMaeva mt-10">
            <?php
            foreach ( $images as $image ):
                $img = $image['galeryImage'];
                $desktopRange = $image['desktop'];
                $tabletRange = $image['tablet'];
                $phoneRange = $image['phone'];
                ?>
                <li class="<?php
                echo esc_attr( "col-maeva-span-" . $phoneRange['columnImage'] . " " );
                echo esc_attr( "row-maeva-span-" . $phoneRange['rowImage'] . " " );
                echo esc_attr( "md:col-maeva-span-" . $tabletRange['columnImage'] . " " );
                echo esc_attr( "md:row-maeva-span-" . $tabletRange['rowImage'] . " " );
                echo esc_attr( "xl:col-maeva-span-" . $desktopRange['columnImage'] . " " );
                echo esc_attr( "xl:row-maeva-span-" . $desktopRange['rowImage'] . " " );
                ?> transform-gpu scale-100 hover:scale-102 transition duration-300 ease-in-out rounded shadow-lg">
                    <figure class="h-full">
                        <img draggable="false"
                             class="w-full h-full object-cover object-center" src="<?= esc_url( $img['url'] ) ?>"
                             alt="<?= esc_attr( $img['alt'] ) ?>">
                    </figure>
                </li>
            <?php endforeach; ?>
        </ul>
    <?php endif; ?>
</section>
<div class="w-full flex justify-end text-left align-center md:p-10 mt-10"><div><?= get_field('description') ?></div></div>
