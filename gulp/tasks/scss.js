import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename'; // .css to .min.css

import cleanCss from 'gulp-clean-css'; // squize zip css
import webpcss from 'gulp-webpcss'; // webp images
import autoprefixer from 'gulp-autoprefixer'; // crossbrowser
import groupCssMediaQueries from 'gulp-group-css-media-queries'; // add @mediaQueries

const sass = gulpSass(dartSass);

export const scss = () => {
    return app.gulp.src(app.path.src.scss, {
        sourcemaps: true
    })
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: 'SCSS',
                message: "Error: <%= error.message %>"
            })
        ))
        .pipe(app.plugins.replace(/@img\//g, '../img/'))
        .pipe(sass({
            outputStyle: 'expanded'
        }))
        .pipe(groupCssMediaQueries())
        .pipe(webpcss(
            {
                webpClass: ".webp",
                noWebpClass: ".no-webp"
            }
        ))
        .pipe(autoprefixer(
            {
                grid: true,
                overrideBrowserlist: ["last 3 version"],
                cascade: true
            }
        ))
        // if i need css not .min de-comment it!
        // .pipe(app.gulp.dest(app.path.build.css))
        .pipe(cleanCss())
        .pipe(rename({
            extname: ".min.css"
        }))
        .pipe(app.gulp.dest(app.path.build.css))
        .pipe(app.plugins.browsersync.stream())
}