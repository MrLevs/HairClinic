"use strict";

const isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return (
            isMobile.Android() ||
            isMobile.BlackBerry() ||
            isMobile.iOS() ||
            isMobile.Opera() ||
            isMobile.Windows()
        );
    }
};

if (isMobile.any()) {
    document.body.classList.add('_touch');

    let menuArrows = document.querySelectorAll('.menu__arrow');
    if (menuArrows.length > 0) {
        for (let index = 0; index < menuArrows.length; index++) {
            const menuArrow = menuArrows[index];
            menuArrow.addEventListener('click', function (e) {
                menuArrow.parentElement.classList.toggle('_active');
            })
        }
    }

} else {
    document.body.classList.add('_pc');
}

//Menu Burger
const burgerMenu = document.querySelector('.burger-menu');
const menuBody = document.querySelector('.menu__body');
if (burgerMenu) {
    burgerMenu.addEventListener('click', function (e) {
        document.body.classList.toggle('_lock');
        burgerMenu.classList.toggle('_active');
        menuBody.classList.toggle('_active');
    });
}

//scroll onclick
const menuLinks = document.querySelectorAll('.menu__link[data-goto]');
if (menuLinks.length > 0) {
    menuLinks.forEach(menuLink => {
        menuLink.addEventListener('click', onMenuLinkClick);
    });

    function onMenuLinkClick(e) {
        const menuLink = e.target;
        if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
            const gotoBlock = document.querySelector(menuLink.dataset.goto);
            const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;
            const gotoBlockValueW = gotoBlock.getBoundingClientRect().top + pageYOffset;
            const widthDevice = document.body.clientWidth;

            if (burgerMenu.classList.contains('_active')) {
                document.body.classList.remove('_lock');
                burgerMenu.classList.remove('_active');
                menuBody.classList.remove('_active');
            }

            if (widthDevice <= 950) {
                window.scrollTo({
                    top: gotoBlockValue,
                    behavior: 'smooth'
                });
            } else {
                window.scrollTo({
                    top: gotoBlockValueW,
                    behavior: 'smooth'
                });
            }
            e.preventDefault();
        }
    }
}

//slider
const doctorBox = document.querySelector('.doctor__box');
const fotoBox = document.querySelector('.foto__box');

function slider(item) {
    const slide = item.querySelectorAll('.slider__slide');
    const sliderLine = item.querySelector('.slider__line');
    let count = 0;
    let width;
    const widthDevice = document.body.clientWidth;
    function init() {
        width = item.querySelector('.slider').offsetWidth;
        if (widthDevice <= 800) {
            sliderLine.style.width = width * slide.length + 'px';
        } else {
            sliderLine.style.width = width / 3 * slide.length + 'px';
        }
        slide.forEach(item => {
            if (widthDevice <= 800 && widthDevice > 640) {
                item.style.width = width / 2 + 'px';
            } else if (widthDevice <= 640) {
                item.style.width = width + 'px';
            }
            else {
                item.style.width = width / 3 + 'px';
            }

            item.style.height = 'auto';
        });
        rollSlider();
    }

    window.addEventListener('resize', init);
    init();

    item.querySelector('.slider__button_next').addEventListener('click', function () {
        count++;
        if (widthDevice <= 800 && widthDevice > 640) {
            if (count > slide.length - 4) {
                count = 0;
            }
        } else if (widthDevice <= 640) {
            if (count > slide.length -1) {
                count = 0;
            }
        } else {
            if (count > slide.length - 3) {
            count = 0;
            }
        }

        rollSlider();
    });

    item.querySelector('.slider__button_prev').addEventListener('click', function () {
        count--;
        if (widthDevice <= 800 && widthDevice > 640) {
            if (count < 0) {
            count = slide.length - 4;
            }
        } else if (widthDevice <= 640) {
            if (count < 0) {
                count = slide.length - 1;
            }
        }else {
            if (count < 0) {
                count = slide.length - 3;
            }
        }

        rollSlider();
    });

    function rollSlider() {
        if (widthDevice <= 800) {
            sliderLine.style.transform = 'translate(-' + count * width + 'px)';
        } else {
            sliderLine.style.transform = 'translate(-' + count * (width / 3) + 'px)';
        }
    }

}
slider(doctorBox);
slider(fotoBox);

//popup
let popup = document.querySelector('#popup');
let popup2 = document.querySelector('#popup-2');
let popup3 = document.querySelector('#popup-3');
let btn = document.querySelector('#btn-1');
let btn2 = document.querySelector('#btn-2');
let btn3 = document.querySelector('#btn-3');

function modal(button, modal) {
    let popupLink = modal.querySelector('#popup-link');
    let popupBtn = modal.querySelector('#popup-btn');
    button.onclick = function () {
        modal.showModal();
        document.body.style.overflowY = 'hidden';
    };
    popupBtn.onclick = function () {
        modal.classList.add('is-hidden');
        modal.addEventListener('animationend', isHidden);
        function isHidden() {
            modal.classList.remove('is-hidden');
            modal.close();
            document.body.style.overflowY = '';
            modal.removeEventListener('animationend', isHidden);
        }
    };
    popupLink.onclick = function () {
        modal.classList.add('is-link');
        modal.addEventListener('animationend', isHidden);
        function isHidden() {
            modal.classList.remove('is-link');
            modal.close();
            document.body.style.overflowY = '';
            modal.removeEventListener('animationend', isHidden);
        }
    };
}
modal(btn, popup);
modal(btn2, popup2);
modal(btn3, popup3);

//spoilers
const spoilersArray = document.querySelectorAll('[data-spoilers');
if (spoilersArray.length > 0) {
    const spoilersRegular = Array.from(spoilersArray).filter(item => {
        return !item.dataset.spoilers.split(',')[0];
    });

    if (spoilersRegular.length > 0) {
        initspoilers(spoilersRegular);
    }
    const spoilersMedia = Array.from(spoilersArray).filter(item => {
        return item.dataset.spoilers.split(',')[0];
    });

    if (spoilersMedia.length > 0) {
        const breakpointsArray = [];
        spoilersMedia.forEach(item => {
            const params = item.dataset.spoilers;
            const breakpoint = {};
            const paramsArray = params.split(',');
            breakpoint.value = paramsArray[0];
            breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : 'max';
            breakpoint.item = item;
            breakpointsArray.push(breakpoint);
        });

        let mediaQueries = breakpointsArray.map(item => {
            return '(' + item.type + '-width: ' + item.value + 'px),' + item.value + ',' + item.type;
        });
        mediaQueries = mediaQueries.filter((item, index, self) => {
            return self.indexOf(item) === index;
        });

        mediaQueries.forEach(breakpoint => {
            const paramsArray = breakpoint.split(',');
            const mediaBreakpoint = paramsArray[1];
            const mediaType = paramsArray[2];
            const matchMedia = window.matchMedia(paramsArray[0]);

            const spoilersArray = breakpointsArray.filter(item => {
                if (item.value === mediaBreakpoint && item.type === mediaType) {
                    return true;
                }
            });

            matchMedia.addEventListener('change',function () {
                initspoilers(spoilersArray, matchMedia);
            });
            initspoilers(spoilersArray, matchMedia);
        });
    }
    //init
    function initspoilers(spoilersArray, matchMedia = false) {
        spoilersArray.forEach(spoilersBlock => {
            spoilersBlock = matchMedia ? spoilersBlock.item : spoilersBlock;
            if (matchMedia.matches || !matchMedia) {
                spoilersBlock.classList.add('_init');
                initspoilerBody(spoilersBlock);
                spoilersBlock.addEventListener('click', setspoilerAction);
            } else {
                spoilersBlock.classList.remove('_init');
                initspoilerBody(spoilersBlock, false);
                spoilersBlock.removeEventListener('click', setspoilerAction);
            }
        });
    }

    //content
    function initspoilerBody(spoilersBlock, hidespoilerBody = true) {
        const spoilerTitles = spoilersBlock.querySelectorAll('[data-spoiler]');
        if (spoilerTitles.length > 0) {
            spoilerTitles.forEach(spoilerTitle => {
                if (hidespoilerBody) {
                    spoilerTitle.removeAttribute('tabindex');
                    if (!spoilerTitle.classList.contains('_active')) {
                        spoilerTitle.nextElementSibling.hidden = true;
                    }
                } else {
                    spoilerTitle.setAttribute('tabindex', '-1');
                    spoilerTitle.nextElementSibling.hidden = false;
                }
            });
        }
    }
    function setspoilerAction(e) {
        const el = e.target;
        if (el.hasAttribute('data-spoiler') || el.closest('[data-spoiler]')) {
            const spoilerTitle = el.hasAttribute('data-spoiler') ? el : el.closest('[data-spoiler]');
            const spoilersBlock = spoilerTitle.closest('[data-spoilers]');
            const onespoiler = spoilersBlock.hasAttribute('data-one-spoiler') ? true : false;
            if (!spoilersBlock.querySelectorAll('._slide').length) {
                if (onespoiler && !spoilerTitle.classList.contains('_active')) {
                    hideSpoilersBody(spoilersBlock);
                }
                spoilerTitle.classList.toggle('_active');
                _slideToggle(spoilerTitle.nextElementSibling, 500);
            }
            e.preventDefault();
        }
    }
    function hideSpoilersBody(spoilersBlock) {
        const spoilerActiveTitle = spoilersBlock.querySelector('[data-spoiler]._active');
        if (spoilerActiveTitle) {
            spoilerActiveTitle.classList.remove('_active');
            _slideUp(spoilerActiveTitle.nextElementSibling, 500)
        }
    }
}
//slide toggle
let _slideUp = (target, duration = 500) => {
    if (!target.classList.contains('_slide')) {
        target.classList.add('_slide');
        target.style.transitionProperty = 'height, margin, padding';
        target.style.transitionDuration = duration + 'ms';
        target.style.height = target.offsetHeight + 'px';
        target.offsetHeight;
        target.style.overflow = 'hidden';
        target.style.height = 0;
        target.style.paddingTop = 0;
        target.style.paddingBottom = 0;
        target.style.marginTop = 0;
        target.style.marginBottom = 0;
        window.setTimeout(() => {
            target.hidden = true;
            target.style.removeProperty('height');
            target.style.removeProperty('padding-top');
            target.style.removeProperty('padding-bottom');
            target.style.removeProperty('margin-top');
            target.style.removeProperty('margin-bottom');
            target.style.removeProperty('overflow');
            target.style.removeProperty('transition-duration');
            target.style.removeProperty('transition-property');
            target.classList.remove('_slide');
        }, duration);
    }
};
let _slideDown = (target, duration = 500) => {
    if (!target.classList.contains('_slide')) {
        target.classList.add('_slide');
        if (target.hidden) {
            target.hidden = false;
        }
        let height = target.offsetHeight;
        target.style.overflow = 'hidden';
        target.style.height = 0;
        target.style.paddingTop = 0;
        target.style.paddingBottom = 0;
        target.style.marginTop = 0;
        target.style.marginBottom = 0;
        target.offsetHeight;
        target.style.transitionProperty = 'height, margin, padding';
        target.style.transitionDuration = duration + 'ms';
        target.style.height = height + 'px';
        target.style.removeProperty('padding-top');
        target.style.removeProperty('padding-bottom');
        target.style.removeProperty('margin-top');
        target.style.removeProperty('margin-bottom');
        window.setTimeout(() => {
            target.style.removeProperty('height');
            target.style.removeProperty('overflow');
            target.style.removeProperty('transition-duration');
            target.style.removeProperty('transition-property');
            target.classList.remove('_slide');
        }, duration);
    }
};
let _slideToggle = (target, duration = 500) => {
    if (target.hidden) {
        return _slideDown(target, duration);
    } else {
        return _slideUp(target, duration);
    }
};
//yandex map
ymaps.ready(init);
function init(){
    let myMap = new ymaps.Map("map", {
        center: [55.76, 37.64],
        zoom: 7
    });
    myMap.behaviors.disable(['scrollZoom']);

    let map = document.querySelector('#map');
    let body = document.querySelector('body');
    map.addEventListener('click', scrollMap)
    function scrollMap(e) {
        myMap.behaviors.enable(['scrollZoom']);
        e.stopPropagation();
        map.classList.add('map__shadow');
    }
    body.addEventListener('click', function() {
        myMap.behaviors.disable(['scrollZoom']);
        map.classList.remove('map__shadow');
    });
}
