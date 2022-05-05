import gulp from 'gulp';
import { path } from './gulp/config/path.js'
import { plugins } from './gulp/config/plugins.js'

global.app = {
    path: path,
    gulp: gulp,
    plugins: plugins
}


// tasks
import { copy } from "./gulp/tasks/copy.js";
import { reset } from "./gulp/tasks/reset.js";
import { html } from "./gulp/tasks/html.js";
import { server } from "./gulp/tasks/server.js";
import { scss } from "./gulp/tasks/scss.js";


// Изменение файлов
function watcher() {
    gulp.watch(path.watch.files, copy);
    gulp.watch(path.watch.html, html);
    gulp.watch(path.watch.scss, scss);
}

// main tasks
const mainTasks = gulp.parallel(copy, html, scss)

// scripts
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));

// start
gulp.task('default', dev);