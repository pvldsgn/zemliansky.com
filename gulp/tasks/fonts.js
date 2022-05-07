import fs from 'fs';
import fonter from 'gulp-fonter-fix';
import ttf2woff2 from 'gulp-ttf2woff2'

export const otfToTtf = () => {
    // search files .otf
    return app.gulp.src(`${app.path.srcFolder}/fonts/**/*.otf`, {})
        // catch errors
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: 'Fonts .otf',
                message: "Error: <%= error.message %>"
            })
        ))
        // convert to .ttf
        .pipe(fonter({
            formats: ['ttf']
        }))
        // save to srcFolder
        .pipe(app.gulp.dest(`${app.path.srcFolder}/fonts/`))
}

export const ttfToWoff = () => {
    // search files .ttf
    return app.gulp.src(`${app.path.srcFolder}/fonts/**/*.ttf`, {})
        // catch errors
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: 'Fonts .ttf',
                message: "Error: <%= error.message %>"
            })
        ))
        // convert to .woff
        .pipe(fonter({
            formats: ['woff']
        }))
        // save to buildFolder
        .pipe(app.gulp.dest(`${app.path.build.fonts}`))
        // search files .ttf
        .pipe(app.gulp.src(`${app.path.srcFolder}/fonts/**/*.ttf`))
        // convert to .woff2
        .pipe(ttf2woff2())
        // save to buildFolder
        .pipe(app.gulp.dest(`${app.path.build.fonts}`));
}

export const fontsStyle = () => {
    // scss fonts
    let fontsFile = `${app.path.srcFolder}/scss/fonts.scss`;
    // check fonts
    fs.readdir(app.path.build.fonts, function (err, fontsFiles) {
        if (fontsFiles) {
            // check .scss for turn on
            if (!fs.existsSync(fontsFile)) {
                // if not, create him
                fs.writeFile(fontsFile, '', cb);
                let newFileOnly;
                for (var i = 0; i < fontsFiles.length; i++) {
                    // text to turn on fonts in .scss fonts
                    let fontFileName = fontsFiles[i].split('.')[0];
                    if (newFileOnly !== fontFileName) {
                        let fontName = fontFileName.split('-')[0] ? fontFileName.split('-')[0] : fontFileName;
                        let fontWeight = fontFileName.split('-')[1] ? fontFileName.split('-')[1] : fontFileName;
                        if (fontWeight.toLowerCase() === 'thin') {
                            fontWeight = 100;
                        } else if (fontWeight.toLowerCase() === 'extralight') {
                            fontWeight = 200;
                        } else if (fontWeight.toLowerCase() === 'light') {
                            fontWeight = 300;
                        } else if (fontWeight.toLowerCase() === 'medium') {
                            fontWeight = 500;
                        } else if (fontWeight.toLowerCase() === 'semibold') {
                            fontWeight = 600;
                        } else if (fontWeight.toLowerCase() === 'bold') {
                            fontWeight = 700;
                        } else if (fontWeight.toLowerCase() === 'extrabold' || fontWeight.toLowerCase() === 'heavy') {
                            fontWeight = 800;
                        } else if (fontWeight.toLowerCase() === 'black') {
                            fontWeight = 900;
                        } else {
                            fontWeight = 400;
                        }
                        fs.appendFile(fontsFile, `@font-face {\n\tfont-family: ${fontName};\n\tfont-display: swap;\n\tsrc: url("../fonts/${fontFileName}.woff2") format("woff2"), url("../fonts/${fontFileName}.woff") format("woff");\n\tfont-weight: ${fontWeight};\n\tfont-style: normal;\n}\r\n`, cb);
                        newFileOnly = fontFileName;
                    }
                }
            } else {
                // if file have, send message
                console.log("File scss/fonts.scss already exists. For update this file - delete him")
            }
        }
    });

    return app.gulp.src(`${app.path.srcFolder}`);
    function cb() { }
}


