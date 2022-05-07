import replace from "gulp-replace"; // searching & replacing
import plumber from 'gulp-plumber' // errors
import notify from 'gulp-notify'  // msg supports
import browsersync from 'browser-sync' // local browser
import newer from 'gulp-newer' // check updates
import ifPlugin from 'gulp-if' // if idk what is it

// export it
export const plugins = {
    replace: replace,
    plumber: plumber,
    notify: notify,
    browsersync: browsersync,
    newer: newer,
    if: ifPlugin
}