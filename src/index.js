const mix = require('laravel-mix')
const ConversionTask = require('./conversion-task')

class WebpWatched {
  register(from, to, imageminWebpOptions = {}) {
    Mix.addTask(new ConversionTask({ from, to, imageminWebpOptions }));
  }
}

mix.extend('webpWatched', new WebpWatched())
