import AOS from 'aos';
import Rellax from 'rellax';
import { tns } from 'tiny-slider/src/tiny-slider';
import GLightbox from 'glightbox';

(function () {
    'use strict';

    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'slide',
        once: true
    });

    // Initialize Rellax for parallax scrolling
    const rellax = new Rellax('.rellax');

    // Preloader function
    const preloader = function() {
        const loader = document.querySelector('.loader');
        const overlay = document.getElementById('overlayer');

        function fadeOut(el) {
            if (!el) return;  // Vérifie si l'élément existe avant de tenter de modifier son style

            el.style.opacity = 1;
            (function fade() {
                if ((el.style.opacity -= .1) < 0) {
                    el.style.display = "none";
                } else {
                    requestAnimationFrame(fade);
                }
            })();
        }

        if (loader && overlay) {
            setTimeout(() => {
                fadeOut(loader);
                fadeOut(overlay);
            }, 200);
        }
    };
    preloader();

    // Countdown function
    const countdown = function() {
        const elements = document.querySelectorAll('.js-countdown');
        if (elements.length > 0) {
            const finaleDate = new Date("March 22, 2022 00:00:00").getTime();

            const timer = () => {
                const now = new Date().getTime();
                let diff = finaleDate - now;

                if (diff < 0) {
                    const customAlert = document.querySelector('.custom-alert');
                    const counterWrap = document.querySelector('.counter-wrap');

                    if (customAlert) customAlert.style.display = 'block';
                    if (counterWrap) counterWrap.style.display = 'none';
                    return; // Stop the function if the countdown is over
                }

                let days = Math.floor(diff / (1000 * 60 * 60 * 24));
                let hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                let seconds = Math.floor((diff % (1000 * 60)) / 1000);

                days = days <= 9 ? `0${days}` : days;
                hours = hours <= 9 ? `0${hours}` : hours;
                minutes = minutes <= 9 ? `0${minutes}` : minutes;
                seconds = seconds <= 9 ? `0${seconds}` : seconds;

                document.querySelector('#days').textContent = days;
                document.querySelector('#hours').textContent = hours;
                document.querySelector('#minutes').textContent = minutes;
                document.querySelector('#seconds').textContent = seconds;
            };
            timer();
            setInterval(timer, 1000);
        }
    };
    countdown();

    // Tiny slider initialization
    const tinyslier = function() {
        const elements = document.querySelectorAll('#testimonial');
        if (elements.length > 0) {
            const slider = tns({
                container: "#testimonial",
                items: 1,
                axis: "horizontal",
                swipeAngle: false,
                speed: 400,
                nav: true,
                controls: false,
                controlsPosition: "bottom",
                autoplay: true,
                autoplayHoverPause: true,
                autoplayTimeout: 3500,
                autoplayButtonOutput: false,
                responsive: {
                    "350": { items: 1 },
                    "500": { items: 1, gutter: 30 },
                    "768": { items: 2, gutter: 30 }
                }
            });
        }
    };
    tinyslier();

    // Lightbox initialization
    const lightbox = function() {
        const lightboxVideo = GLightbox({
            selector: '.glightbox'
        });
    };
    lightbox();

})();