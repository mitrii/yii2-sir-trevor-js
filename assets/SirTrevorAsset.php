<?php

namespace kato\sirtrevorjs\assets;

use Yii;
use yii\web\AssetBundle;

class SirTrevorAsset extends AssetBundle {

    public $language;
    public $debug = false;
    public $sourcePath = '@sirtrevorjs/bower_components';

    public $publishOptions = [
        'forceCopy' => true
    ];

    public function registerAssetFiles($view)
    {
        $language = $this->language ? $this->language : Yii::$app->language;

        if ($this->debug !== 'true') {
            $this->js[] = 'sir-trevor-js/build/sir-trevor.min.js';
        } else {
            $this->js[] = 'sir-trevor-js/build/sir-trevor.debug.js';
        }

        if ($language !== 'en') {
            $this->js[] = 'sir-trevor-js/locales/' . $language . '.js';
        }

        $this->js[] = "custom-blocks/code.js";
        $this->js[] = "custom-blocks/audio.js";

        parent::registerAssetFiles($view);
    }

    public $css = [
        'sir-trevor-js/sir-trevor-icons.css',
        'sir-trevor-js/build/sir-trevor.css',
    ];

    public $js = [
        "es5-shim/es5-shim.js",
    ];

    public $depends = [
        'yii\web\JqueryAsset',
        'yii\web\YiiAsset',
    ];
}