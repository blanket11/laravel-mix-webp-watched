# Laravel Mix Webp Watched

## Introduction
This plugin is an extension to Laravel Mix that monitors image changes and converts them to webp.

## Usage

Install the package in your project.
```
npm install --save-dev laravel-mix-webp-watched
```

OR

```
yarn add --dev laravel-mix-webp-watched
```

Add it to your `webpack.mix.js` file.
```
let mix = require('laravel-mix');

require('laravel-mix-webp-watched');

mix
    .webpWatched('resources/images', 'public/images')
```


## Options

If you want to specify the quality, specify the option.

```
mix.js('resources/app.js', 'public/js')
  .sass('resources/app.scss', 'public/css')
  .webpWatched('resources/images', 'public/images', {
    imageminWebpOptions: {
      quality: 50,
    }
  })
```
