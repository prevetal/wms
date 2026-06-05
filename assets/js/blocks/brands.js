// js/blocks/brands.js
(function () {
    'use strict';

    // Если по какой-то причине ядро slider-core не загрузилось, прекращаем выполнение и не спамим ошибками в консоль
    if (!window.AppSliders) {
        console.warn('[AppSliders] Core script not found. Slider "reviews" cannot be initialized.')
        return
    }

    const { qs, qsa, getCssVar, commonSlideClasses, createOrUpdateSwiper, bindEqualHeightObserver, registerInit } = window.AppSliders

    // Функция инициализации
    const initBrands = () => {
        qsa('.brands .swiper').forEach((el) => {
            createOrUpdateSwiper(el, {
                ...commonSlideClasses,
                loop: true,
                speed: 500,
                autoplay: {
                    delay: 1000,
                    disableOnInteraction: true,
                },
                allowTouchMove: false,
                spaceBetween: getCssVar(el, '--spaceBetween'),
                slidesPerView: getCssVar(el, '--slidesPerView'),
            })
        })
    }

    // Регистрируем наш блок в системе ядра
    registerInit(initBrands)
})()



// // Brands slider
// const brandsSliders = [],
//     brands = document.querySelectorAll('.brands .swiper')

// brands.forEach((el, i) => {
//     el.classList.add('brands_s' + i)

//     let options = {
//         loop: true,
//         speed: 500,
//         autoplay: {
//             delay: 1000,
//             disableOnInteraction: true,
//         },
//         allowTouchMove: false,
//         spaceBetween: getCssVar(el, '--spaceBetween'),
//         slidesPerView: getCssVar(el, '--slidesPerView'),
//     }

//     brandsSliders.push(new Swiper('.brands_s' + i, options))
// })