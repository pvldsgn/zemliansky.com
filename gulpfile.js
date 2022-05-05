import gulp from 'gulp';
import { path } from './gulp/config/path.js'

global.app = {
    path: path,
    gulp: gulp
}

// Задачи
import { copy } from "./gulp/tasks/copy.js";
import { reset } from "./gulp/tasks/reset.js";
import { html } from "./gulp/tasks/html.js";


// Изменение файлов
function watcher() {
    gulp.watch(path.watch.files, copy);
    gulp.watch(path.watch.html, html)
}

const mainTasks = gulp.parallel(copy, html)

// Сценарии
const dev = gulp.series(reset, mainTasks, copy, watcher);

// Выполнение
gulp.task('default', dev);