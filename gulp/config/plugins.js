import replace from "gulp-replace"; // searching & replacing
import plumber from 'gulp-plumber' // errors
import notify from 'gulp-notify'  // msg supports

// export it
export const plugins = {
    replace: replace,
    plumber: plumber,
    notify: notify
}