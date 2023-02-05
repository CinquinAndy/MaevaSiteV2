<?php get_header(); ?>
<?php $posts = wp_get_recent_posts( array(
    'numberposts' => 12, // Number of recent posts thumbnails to display
    'post_status' => 'publish' // Show only the published posts
) );
if ( isset( $posts ) ):
    if ( ! empty( $posts ) ):
        $recent_posts = array_slice( $posts, 0, 6 );
        ?>
        <section class="w-full md:p-10 mt-10">
            <div class="grid grid-cols-1 xl:grid-cols-2 gap-5 p-5 md:px-20 topSection relative">
                <div
                    class="flex absolute -top-4 md:-top-5 left-0 w-full flex text-center justify-center items-center md:col-span-2">
                    <h1 class="text-xl md:text-2xl font-bold bg-maeva-g800 pl-5 pr-5">Mes conseils maquillage & nail art
                        à la une !</h1>
                </div>
            </div>
            <div id="slider" class="splide">
                <div class="splide__track">
                    <ul class="splide__list">
                        <?php if ( isset( $recent_posts ) ):
                            if ( ! empty( $recent_posts ) ):
                                foreach ( $recent_posts as $post_item ) :
                                    if ( has_post_thumbnail( $post_item['ID'] ) ):?>
                                        <li class="splide__slide">
                                            <div class="w-full flex items-center justify-center">
                                                <a class="articleElement w-98 md:w-5/6 relative"
                                                   href="<?= esc_url( get_permalink( $post_item['ID'] ) ) ?>" rel="noopener">
                                                    <?= get_the_post_thumbnail( $post_item['ID'], 'full',
                                                        array( 'class' => 'rounded-t w-full h-70vh object-center object-cover' ) ) ?>
                                                    <div
                                                        class="absolute inset-x-0 bottom-0 h-24 backdrop-blur3x
                            bg-maeva-g1000 flex justify-center items-center text-center
                            opacity-85 font-bold text-xl flex-wrap">
                                                        <div class="flex w-full justify-center items-center flex-wrap">
                                                            <h2 class="w-full"><?= $post_item['post_title'] ?></h2>
                                                            <div
                                                                class="text hidden-animate font-medium text-xs w-1/2 justify-center items-center mt-10">
                                                                <p class="w-full">
                                                                    <?= $post_item['post_excerpt'] ?>
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                        </li>
                                    <?php endif;
                                endforeach;
                            endif;
                        endif; ?>
                    </ul>
                </div>
            </div>
        </section>
        <div class="w-full pt-10 md:p-10">
            <div class="grid grid-cols-1 xl:grid-cols-2 gap-5 p-5 topSection relative">
                <div
                    class="flex absolute -top-4 md:-top-5 left-0 w-full flex text-center justify-center items-center md:col-span-2">
                    <h2 class="text-xl md:text-2xl font-bold bg-maeva-g800 pl-5 pr-5">Mes autres articles !</h2>
                </div>
            </div>
            <section class="gridArticle w-full p-5 md:p-10">
                <?php foreach ( $posts as $post_article ): ?>
                    <a href="<?= esc_url( get_permalink( $post_article['ID'] ) ) ?>"
                       class="bg-maeva-g900 shadow relative" rel="noopener">
                        <?= get_the_post_thumbnail( $post_article['ID'], 'full',
                            array( 'class' => 'rounded object-cover object-center h-300px' ) ) ?>
                        <h2 class="text-sm pt-5 px-5"><?= $post_article['post_title'] ?></h2>
                        <p class="text-xs p-5">
                            <?= $post_article['post_excerpt'] ?>
                        </p>
                        <img src="<?= esc_url( get_template_directory_uri() ) ?>/assets/images/icons/up-arrow.svg"
                             alt="arrow" class="arrow absolute bottom-0 right-0 h-16 w-16 mr-5">
                    </a>
                <?php endforeach; ?>
            </section>
        </div>
    <?php
    endif;
endif;
get_footer(); ?>
