<section class="w-full lg:p-10 mt-10">
    <!-- Thumbs des préstations -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5 p-5 lg:px-20 topSection relative">
        <div
            class="flex absolute -top-4 lg:-top-5 left-0 w-full flex text-center justify-center items-center lg:col-span-2">
            <h1 class="text-xl lg:text-2xl font-bold bg-maeva-g800 pl-5 pr-5">Mes services de maquillages & nail art
                !</h1>
        </div>
    </div>
    <section id="prestations" class="bg-maeva-g800 grid grid-cols-1 xl:grid-cols-3 gap-5 p-5 lg:p-20 mb-24">
        <?php
        $prestations = get_field('prestations');
        if ($prestations) :
            foreach ($prestations as $presta) :
                foreach ($presta as $elem) :
                    $thumbMasked = $elem['thumbMasked'];
                    $linkPrestation = $elem['linkPrestation'];
                    $positionMasked = $elem['positionMasked'];
                    $fitMasked = $elem['fitMasked'];
                    ?>
                    <div class='w-full grid grid-cols-2 xl:grid-cols-4 gap-10 mb-10'>
                        <div class="col-span-2 xl:col-span-4 flex justify-center flex-col items-center">
                            <a href="<?= esc_url($linkPrestation['url']) ?>"
                               class="relative w-full h-full flex justify-center items-center flex-col" rel="noopener">
                                <img
                                    class="<?= esc_attr($fitMasked) ?> <?= esc_attr($positionMasked) ?> mask w-full"
                                    src="<?= esc_url($thumbMasked['url']) ?>"
                                    alt="<?= esc_attr($thumbMasked['alt']) ?>">
                                <h2 class="font-bold text-lg lg:text-xl text-center"><?= $linkPrestation['title'] ?></h2>
                            </a>
                        </div>
                    </div>
                <?php
                endforeach;
            endforeach;
        endif; ?>
    </section>

    <!-- Présentations des prestations -->
    <section class="w-full">
        <?php
        if ($prestations) :
            $compteur = 0;
            foreach ($prestations as $presta) :
                foreach ($presta as $elem) :
                    $thumbDescription = $elem['thumbDescription'];
                    $linkPrestation = $elem['linkPrestation'];
                    $description = $elem['description'];
                    $positionThumbDescription = $elem['positionThumbDescription'];
                    $fitThumbDescription = $elem['fitThumbDescription'];
                    ?>
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-20 p-10 lg:p-20 topSection relative">
                        <div class="flex absolute -top-4 lg:-top-5 left-0 w-full flex text-center
                    justify-center items-center lg:col-span-2">
                            <h2 class="text-xl lg:text-2xl font-bold bg-maeva-g800 pl-5 pr-5"><?= $linkPrestation['title'] ?></h2>
                        </div>
                        <?php if (($compteur % 2) !== 0) : ?>
                            <div
                                class="flex justify-center items-center lg:items-start text-center lg:text-left flex-col overflow-hidden">
                                <?= $description ?>
                                <a href="<?= esc_url($linkPrestation['url']) ?>"
                                   class="transform-gpu bg-maeva-purple pt-2 pb-2 pl-3.5 pr-3.5 rounded font-bold text-center m-10
                           transition duration-200 ease-in-out scale-90 lg:scale-100 hover:text-white hover:scale-105"
                                   rel="noopener">
                                    <?= $linkPrestation['title'] ?>
                                </a>
                            </div>
                            <div class="flex justify-center items-center">
                                <img
                                    class="<?= esc_attr($positionThumbDescription) ?> <?= esc_attr($fitThumbDescription) ?> descriptionImg rounded lg:rounded-l-2xl"
                                    src="<?= esc_url($thumbDescription['url']) ?>"
                                    alt="<?= esc_attr($thumbDescription['alt']) ?>">
                            </div>
                        <?php else : ?>
                            <div class="flex justify-center items-center">
                                <img
                                    class="<?= esc_attr($positionThumbDescription) ?> <?= esc_attr($fitThumbDescription) ?> rounded lg:rounded-r-2xl"
                                    src="<?= esc_url($thumbDescription['url']) ?>"
                                    alt="<?= esc_attr($thumbDescription['alt']) ?>">
                            </div>

                            <div
                                class="flex justify-center items-center lg:items-start text-center lg:text-left flex-col overflow-hidden">
                                <?= $description ?>
                                <div class="w-full flex justify-center lg:justify-end">
                                    <a href="<?= esc_url($linkPrestation['url']) ?>"
                                       class="transform-gpu bg-maeva-purple pt-2 pb-2 pl-3.5 pr-3.5 rounded font-bold text-center m-10
                           transition duration-200 ease-in-out scale-90 lg:scale-100 hover:text-white hover:scale-105"
                                       rel="noopener">
                                        <?= $linkPrestation['title'] ?>
                                    </a>
                                </div>
                            </div>
                        <?php endif; ?>
                    </div>
                    <?php $compteur++;
                endforeach;
            endforeach;
        endif; ?>
    </section>
</section>
