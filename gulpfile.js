const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const { exec } = require('child_process');

// Task to run shopify theme dev with live-reload
gulp.task('shopify-dev', (done) => {
  exec('shopify theme dev', (err, stdout, stderr) => {
    if (err) {
      console.error(`exec error: ${err}`);
      return;
    }
    console.log(stdout);
    console.error(stderr);
  });
  done();
});

// Task to serve with BrowserSync and watch changes
gulp.task('serve', gulp.series('shopify-dev', () => {
  browserSync.init({
    proxy: "localhost:9292", // Replace with your Shopify dev URL
    files: ["**/*.liquid", "**/*.css", "**/*.js"],
    open: false
  });

  // Watch for any theme file changes
  gulp.watch("**/*.liquid").on('change', browserSync.reload);
  gulp.watch("**/*.css").on('change', browserSync.reload);
  gulp.watch("**/*.js").on('change', browserSync.reload);
}));
