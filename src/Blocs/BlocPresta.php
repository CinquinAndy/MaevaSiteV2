<?php

namespace App\Blocs;

use Extended\ACF\Fields\Group;
use Extended\ACF\Fields\Image;
use Extended\ACF\Fields\Link;
use Extended\ACF\Fields\Repeater;
use Extended\ACF\Fields\Select;
use Extended\ACF\Fields\WysiwygEditor;

class BlocPresta extends Bloc {

    public static $name = 'presta';
    public static $label = 'Prestations';
    public static $icon = 'products';

    protected static function fields(): array {
        return [
            Repeater::make( 'Préstations', 'prestations' )->fields( [
                Group::make( 'Préstation', 'prestation' )->fields( [
                    Image::make( 'Image de la prestation', 'thumbMasked' )->required(),
                    Select::make( 'object position image de presentation [defaut : center]', 'positionMasked' )->choices( [
                        'object-left-top'     => 'object-left-top',
                        'object-top'          => 'object-top',
                        'object-right-top'    => 'object-right-top',
                        'object-left'         => 'object-left',
                        'object-center'       => 'object-center',
                        'object-right'        => 'object-right',
                        'object-left-bottom'  => 'object-left-bottom',
                        'object-bottom'       => 'object-bottom',
                        'object-right-bottom' => 'object-right-bottom'
                    ] )->defaultValue('object-center')->required(),
                    Select::make( 'object fit image de presentation [defaut : cover]', 'fitMasked' )->choices( [
                        'object-contain'    => 'object-contain',
                        'object-cover'      => 'object-cover',
                        'object-fill'       => 'object-fill',
                        'object-none'       => 'object-none',
                        'object-scale-down' => 'object-scale-down'
                    ] )->defaultValue('object-cover')->required(),
                    Link::make( 'Lien page prestation', 'linkPrestation' )->required(),
                    Image::make( 'Image de la description de la prestation', 'thumbDescription' )->required(),
                    Select::make( 'object position image de description [defaut : center]', 'positionThumbDescription' )->choices( [
                        'object-left-top'     => 'object-left-top',
                        'object-top'          => 'object-top',
                        'object-right-top'    => 'object-right-top',
                        'object-left'         => 'object-left',
                        'object-center'       => 'object-center',
                        'object-right'        => 'object-right',
                        'object-left-bottom'  => 'object-left-bottom',
                        'object-bottom'       => 'object-bottom',
                        'object-right-bottom' => 'object-right-bottom'
                    ] )->defaultValue('object-center')->required(),
                    Select::make( 'object fit image de description [defaut : cover]', 'fitThumbDescription' )->choices( [
                        'object-contain'    => 'object-contain',
                        'object-cover'      => 'object-cover',
                        'object-fill'       => 'object-fill',
                        'object-none'       => 'object-none',
                        'object-scale-down' => 'object-scale-down'
                    ] )->defaultValue('object-cover')->required(),
                    WysiwygEditor::make( 'Description', 'description' )
                                 ->toolbar( 'basic' )->mediaUpload( false )->tabs( 'visual' )->required()
                ] )
            ] )->min( 1 )->collapsed( 'linkPrestation' )->required()
        ];
    }

}

?>
