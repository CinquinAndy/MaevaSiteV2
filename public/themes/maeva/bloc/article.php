<section class="w-full lg:p-10 mt-10">
    <?php
    $titleArticle = get_field('titleArticle');
    $startArticle = get_field('startArticle');
    $articles = get_field('article');
    ?>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5 p-5 lg:p-20 relative topSection">
        <div
            class="flex absolute -top-4 lg:-top-5 left-0 w-full flex text-center justify-center items-center lg:col-span-2">
            <h1 class="text-xl lg:text-2xl font-bold bg-maeva-g800 pl-5 pr-5"><?= $titleArticle ?></h1>
        </div>
        <div class="lg:col-span-2 text-center my-5 md:mb-5 md:mt-0">
            <?php
            $file = get_field('file');
            if ($file): ?>
                <a href="<?= esc_url($file['url']) ?>" target="_blank"
                   class="bg-maeva-purple pt-2 pb-2 pl-3.5 pr-3.5 rounded font-bold text-center m-2
                       mt-5 lg:m-0 lg:mt-20px" rel="noopener">
                    <?= $file['filename'] ?>
                </a>
            <?php endif; ?>
        </div>
        <div class="lg:col-span-2 text-center">
            <?= $startArticle ?>
        </div>
        <?php
        $compteur = 0;
        foreach ($articles as $article):
            if ($article):
                ?>
                <div class="lg:col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-5 lg:p-10 relative">
                    <?php
                    if ($article["trueFalseArticle"] === true):
                        $linkFlag = !empty($article['contentArticle']['linkArticle']);
                        if (!$compteur % 2):
                            ?>
                            <div
                                class="flex flex-col flex-reverse justify-center items-center lg:items-start text-left gap-[0.5rem]">
                                <?= $article['contentArticle']['description'] ?>
                                <?php if ($linkFlag):
                                    $linkArticle = $article['contentArticle']['linkArticle'];
                                    ?>
                                    <a href="<?= esc_url($linkArticle['url']) ?>"
                                       class="bg-maeva-purple pt-2 pb-2 pl-3.5 pr-3.5 rounded font-bold text-center m-2
                       mt-5 lg:m-0 lg:mt-20px" rel="noopener">
                                        <?= $linkArticle['title'] ?>
                                    </a>
                                <?php endif; ?>
                            </div>
                            <div class="flex justify-center items-center">
                                <img
                                    class="max-h-70vh rounded <?php echo esc_attr($article['contentArticle']['positionImage']);
                                    echo esc_attr($article['contentArticle']['fitImage']); ?>"
                                    src="<?= esc_url($article['contentArticle']['articleImage']['url']) ?>"
                                    alt="<?= esc_attr($article['contentArticle']['articleImage']['alt']) ?>">
                            </div>
                        <?php // ---------------------------------- Un sur deux -------------------------------
                        else : ?>
                            <div class="flex justify-center items-center">
                                <img
                                    class="max-h-70vh rounded <?php echo esc_attr($article['contentArticle']['positionImage']);
                                    echo esc_attr($article['contentArticle']['fitImage']); ?>"
                                    src="<?= esc_url($article['contentArticle']['articleImage']['url']) ?>"
                                    alt="<?= esc_attr($article['contentArticle']['articleImage']['alt']) ?>">
                            </div>
                            <div class="flex justify-center items-end flex-col flex-reverse text-left">
                                <?= $article['contentArticle']['description'] ?>
                                <?php if ($linkFlag):
                                    $linkArticle = $article['contentArticle']['linkArticle'];
                                    ?>
                                    <a href="<?= esc_url($linkArticle['url']) ?>"
                                       class="bg-maeva-purple pt-2 pb-2 pl-3.5 pr-3.5 rounded font-bold text-center m-2
                       mt-5 lg:m-0 lg:mt-20px" rel="noopener">
                                        <?= $linkArticle['title'] ?>
                                    </a>
                                <?php endif; ?>
                            </div>
                        <?php endif;
                    else : ?>
                        <div class="lg:col-span-2 w-full flex justify-center">
                            <div class="flex justify-center flex-wrap text-center w-full lg:w-2/3">
                                <?= $article['contentArticleWithoutImage']['descriptionWithoutImage'] ?>
                                <?php
                                $linkFlag = empty($article['contentArticleWithoutImage']['linkArticleWithoutImage']);
                                if (!$linkFlag):
                                    $linkArticle = $article['contentArticleWithoutImage']['linkArticleWithoutImage'];
                                    ?>
                                    <div class="mt-20px flex justify-end w-full">
                                        <a href="<?= esc_url($linkArticle['url']) ?>"
                                           class="bg-maeva-purple pt-2 pb-2 pl-3.5 pr-3.5 rounded font-bold text-center m-2
                                        mt-5 lg:m-0 " rel="noopener">
                                            <?= $linkArticle['title'] ?>
                                        </a>
                                    </div>
                                <?php endif; ?>
                            </div>
                        </div>
                    <?php
                    endif;
                    $compteur++;
                    ?>
                </div>
            <?php
            endif;
        endforeach; ?>
    </div>
</section>
