<?php

namespace App\Blocs;

use Extended\ACF\Fields\Link;
use Extended\ACF\Fields\Text;
use Extended\ACF\Fields\WysiwygEditor;

class BlocHero extends Bloc {

    public static $name = 'hero';
    public static $label = 'Hero';
    public static $icon = 'admin-home';

    protected static function fields() : array {
        return [
            Text::make( 'Titre', 'title' )->required(),
            Text::make( 'Sous titre', 'subtitle' )->required(),
            WysiwygEditor::make( 'Description', 'content' )
                         ->toolbar('basic')->mediaUpload(false)->tabs('visual')->required(),
            Link::make( 'Premier Bouton - Lien', 'linkFirstBtn' )->required(),
            Link::make( 'Deuxième Bouton - Lien', 'linkSecondBtn' )->required(),
            Link::make( 'Troisième Bouton - Lien', 'linkThirdBtn' )->required(),
        ];
    }

}

?>
