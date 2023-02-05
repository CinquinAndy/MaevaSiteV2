<?php

namespace App\Blocs;

use Extended\ACF\Fields\File;
use Extended\ACF\Fields\Group;
use Extended\ACF\Fields\Image;
use Extended\ACF\Fields\Link;
use Extended\ACF\Fields\Repeater;
use Extended\ACF\Fields\Select;
use Extended\ACF\Fields\Text;
use Extended\ACF\Fields\TrueFalse;
use Extended\ACF\Fields\WysiwygEditor;

class BlocArticle extends Bloc {

    public static $name = 'article';
    public static $label = 'Article';
    public static $icon = 'media-document';

    protected static function fields(): array {
        return [
            Text::make( 'Titre de l\'article', 'titleArticle' )->required(),
            File::make('Fichier associé (fiche tarif par exemple)','file'),
            WysiwygEditor::make( 'Entrée en matière', 'startArticle' )
                         ->toolbar( 'basic' )->mediaUpload( false )->tabs( 'visual' )->required(),
            Repeater::make( 'Article (rempli une seule colonne, pour chaques éléments)', 'article' )->fields( [
                TrueFalse::make( 'texte avec image','trueFalseArticle')->defaultValue(true)->required(),
                Group::make( 'Contenu', 'contentArticle' )->fields( [
                    WysiwygEditor::make( 'Description', 'description' )
                                 ->toolbar( 'basic' )->mediaUpload( false )->tabs( 'visual' )->required(),
                    Image::make( 'Image de l\'article', 'articleImage' )->required(),
                    Select::make( 'object position image de presentation [defaut : center]', 'positionImage' )->choices( [
                        'object-left-top'     => 'object-left-top',
                        'object-top'          => 'object-top',
                        'object-right-top'    => 'object-right-top',
                        'object-left'         => 'object-left',
                        'object-center'       => 'object-center',
                        'object-right'        => 'object-right',
                        'object-left-bottom'  => 'object-left-bottom',
                        'object-bottom'       => 'object-bottom',
                        'object-right-bottom' => 'object-right-bottom'
                    ] )->defaultValue( 'object-center' )->required(),
                    Select::make( 'object fit image de presentation [defaut : cover]', 'fitImage' )->choices( [
                        'object-contain'    => 'object-contain',
                        'object-cover'      => 'object-cover',
                        'object-fill'       => 'object-fill',
                        'object-none'       => 'object-none',
                        'object-scale-down' => 'object-scale-down'
                    ] )->defaultValue( 'object-cover' )->required(),
                    Link::make( 'bouton, optionnel', 'linkArticle' ),
                ],
                ),
                Group::make( 'Contenu sans image', 'contentArticleWithoutImage' )->fields( [
                    WysiwygEditor::make( 'Description', 'descriptionWithoutImage' )
                                 ->toolbar( 'basic' )->mediaUpload( false )->tabs( 'visual' )->required(),
                    Link::make( 'bouton, optionnel', 'linkArticleWithoutImage' ),
                ] )
            ] )->min( 1 )->collapsed( 'linkPrestation' )->layout('row')->required(),
        ];
    }
}

?>
