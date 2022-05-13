const gulp = require('gulp')
const shell = require('gulp-shell')

gulp.task('example', async () => {
    gulp.src('/kraken-e2e-ghost-v3.42/')
        .pipe(shell.task('npm start'));
})