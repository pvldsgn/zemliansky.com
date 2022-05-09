import * as flsFunctions from "./modules/functions.js";
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
// import { TweenMax } from "gsap/all.js";
gsap.registerPlugin(ScrollTrigger);

flsFunctions.isWebp();

// info
// document.getElementsByClassName('card-item')[0].style = "border-radius: 5em";


// parallax-card
gsap.to(".card-bg", {
    scrollTrigger: {
        scrub: 2
    },
    y: 100
});


// smooth scroll
const scrollWrap = document.getElementsByClassName("main")[0],
    speed = 0.1;

var offset = 0;

// body.style.height = Math.floor(height) + "px";

function smoothScroll() {
    offset += (window.pageYOffset - offset) * speed;

    var scroll = "translateY(-" + offset + "px) translateZ(0)";
    scrollWrap.style.transform = scroll;

    callScroll = requestAnimationFrame(smoothScroll);
}

smoothScroll();

