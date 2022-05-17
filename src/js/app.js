import * as flsFunctions from "./modules/functions.js";
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
// import { TweenMax } from "gsap/all.js";
gsap.registerPlugin(ScrollTrigger);

flsFunctions.isWebp();

// ANIMATE
//
// parallax-card
gsap.to(".card-bg", {
    scrollTrigger: {
        scrub: 2
    },
    y: 110
});

gsap.to(".main-bg", {
    scrollTrigger: {
        scrub: 2
    },
    y: 150
});

// move mobile
gsap.to(".card-mobile", {
    scrollTrigger: {
        scrub: 2
    },
    scale: 1.5,
    y: -10
});

gsap.to(".arrow", {
    scrollTrigger: {
        scrub: 2
    },
    opacity: 0
});

// smooth scroll

// const scrollWrap = document.getElementsByClassName("main")[0];
// const speed = 0.1;

// let offset = 0;
// let callScroll = null;

// function smoothScroll() {
//     let delta = window.pageYOffset - offset;
//     offset += delta * speed;

//     var scroll = "translateY(-" + offset + "px)";
//     scrollWrap.style.transform = scroll;

//     if (Math.abs(delta) > 0.5)
//         callScroll = requestAnimationFrame(smoothScroll);
// }

// window.addEventListener('scroll', function (e) {
//     if (callScroll !== null) cancelAnimationFrame(callScroll);
//     smoothScroll();
// });

// FOOTER
