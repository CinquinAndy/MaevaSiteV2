<?php

namespace App\Blocs;

use Extended\ACF\Fields\Group;
use Extended\ACF\Fields\Image;
use Extended\ACF\Fields\Range;
use Extended\ACF\Fields\Repeater;
use Extended\ACF\Fields\Text;

class BlocInGalery extends Bloc {

    public static $name = 'ingalery';
    public static $label = 'In Galerie';
    public static $icon = 'images-alt2';

    protected static function fields(): array {
        return [
            Text::make('description - photographe' , 'description'),
            Repeater::make( 'Galerys', 'galerys' )->fields( [
                Image::make( 'Image article', 'galeryImage' )->required(),
                group::make('desktop','desktop')->fields([
                    Range::make( 'Column image', 'columnImage')->min(1)->max(10)->defaultValue(2)->required(),
                    Range::make( 'Row image', 'rowImage')->min(1)->max(10)->defaultValue(2)->required(),
                ]),
                group::make('tablet','tablet')->fields([
                    Range::make( 'Column image', 'columnImage')->min(1)->max(6)->defaultValue(2)->required(),
                    Range::make( 'Row image', 'rowImage')->min(1)->max(6)->defaultValue(2)->required(),
                ]),
                group::make('phone','phone')->fields([
                    Range::make( 'Column image', 'columnImage')->min(1)->max(6)->defaultValue(2)->required(),
                    Range::make( 'Row image', 'rowImage')->min(1)->max(6)->defaultValue(2)->required(),
                ]),
            ] )->min( 1 )->collapsed( 'linkGalery' )->required()
        ];
    }
}

?>
