const path = require('path');
const globby = require('globby')
const Task = require('laravel-mix/src/tasks/Task')
const chokidar = require('chokidar');
const imagemin = require('imagemin')
const imageminWebp = require('imagemin-webp')

class ConversionTask extends Task {

  _isBeingWatched = 0;

  run() {
    if (this._isBeingWatched) return;

    this.data.imageminWebpOptions = Object.assign({
      quality: 50
    }, this.data.imageminWebpOptions)

    for (let fromRelative of globby.sync(this.data.from)) {
      this._convertWebp(fromRelative);
    }
  }

  watch() {
    if (this._isBeingWatched) return;

    let watcher = chokidar.watch(this.data.from);

    watcher.on('change', (path, status) => {
      this._convertWebp(path);
    });

    watcher.on('add', (path, status) => {
      this._convertWebp(path);
    });

    this._isBeingWatched = true;
  }

  _convertWebp(imagePath) {

    if (imagePath.match(/\.(jpe?g|png|gif)$/i) === null) {
      return
    }

    let { root, dir, base, ext, name } = path.parse(imagePath)

    let toDir = dir.replace(this.data.from, this.data.to)

    imagemin([imagePath], {
      destination: toDir,
      plugins: [
        imageminWebp(this.data.imageminWebpOptions)
      ],
    })
  }
}

module.exports = ConversionTask
