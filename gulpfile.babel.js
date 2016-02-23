import gulp from 'gulp';
import gulpUtil from 'gulp-util';
import webpack from 'webpack';

gulp.task('webpack', done => {
  webpack({
    entry: 'app/boot.js',
    output: {
      filename: 'build/js/app.min.js'
    },
    module: {
      loaders: [
        { test: /\.js?$/, loader: 'babel', exclude: /node_modules|bower_components/, query: { presets: [ 'es2015' ] } },
      ]
    }
  }, function(error) {
    var pluginError;

    if (error) {
      pluginError = new gulpUtil.PluginError('webpack', error);

      if (done) {
        done(pluginError);
      } else {
        gulpUtil.log('[webpack]', pluginError);
      }

      return;
    }

    if (done) {
      done();
    }
  });
});

gulp.task('default', ['webpack']);