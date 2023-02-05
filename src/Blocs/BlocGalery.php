<?php

namespace App\Blocs;

use Extended\ACF\Fields\Group;
use Extended\ACF\Fields\Image;
use Extended\ACF\Fields\Link;
use Extended\ACF\Fields\Repeater;
use Extended\ACF\Fields\Select;

class BlocGalery extends Bloc {

    public static $name = 'galery';
    public static $label = 'Galeries';
    public static $icon = 'format-image';

    protected static function fields(): array {
        return [
            Repeater::make( 'Galerys', 'galerys' )->fields( [
                Group::make( 'Galery', 'galery' )->fields( [
                    Image::make( 'Image article', 'galeryImage' )->required(),
                    Select::make( 'object position image de presentation [defaut : center]', 'positionGalery' )->choices( [
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
                    Select::make( 'object fit image de presentation [defaut : cover]', 'fitGalery' )->choices( [
                        'object-contain'    => 'object-contain',
                        'object-cover'      => 'object-cover',
                        'object-fill'       => 'object-fill',
                        'object-none'       => 'object-none',
                        'object-scale-down' => 'object-scale-down'
                    ] )->defaultValue( 'object-cover' )->required(),
                    Link::make( 'Lien page article', 'linkGalery' )->required(),
                ] )
            ] )->min( 1 )->collapsed( 'linkGalery' )->required()
        ];
    }
}

?>
