const gulp = require('gulp')
const shell = require('gulp-shell')



gulp.task('kraken-e2e-ghost-v3.42', () => {
    process.chdir(__dirname+'/kraken-e2e-ghost-v3.42');
    return gulp.src(".")
        .pipe(shell('npm install'))
        .pipe(shell('npm start'));
})

gulp.task('kraken-e2e-ghost-v4.41.3', () => {
    process.chdir(__dirname+'/kraken-e2e-ghost-v4.41.3');
    return gulp.src(".")
        .pipe(shell('npm install'))
        .pipe(shell('npm start'));
})

gulp.task('cypress-v3', () => {
    process.chdir(__dirname+'/cypress-v3');
    return gulp.src(".")
        .pipe(shell('npm install'))
        .pipe(shell('npm start'));
})

gulp.task('cypress-v4.41.3', () => {
    process.chdir(__dirname+'/cypress-v4.41.3');
    return gulp.src(".")
        .pipe(shell('npm install'))
        .pipe(shell('npm start'));
})

gulp.task('resemblejs', () => {
    process.chdir(__dirname+'/resemblejs');
    return gulp.src(".")
        .pipe(shell('npm install'))
        .pipe(shell('npm start'));
})

gulp.task('all-run', gulp.series('kraken-e2e-ghost-v3.42', 'kraken-e2e-ghost-v4.41.3', 'cypress-v4.41.3', 'cypress-v3', 'resemblejs'));