// js/blocks/reviews.js
(function () {
    'use strict';

    // Если по какой-то причине ядро slider-core не загрузилось, прекращаем выполнение и не спамим ошибками в консоль
    if (!window.AppSliders) {
        console.warn('[AppSliders] Core script not found. Slider "reviews" cannot be initialized.')
        return
    }

    const { qs, qsa, getCssVar, commonSlideClasses, createOrUpdateSwiper, bindEqualHeightObserver, registerInit } = window.AppSliders

    // Функция инициализации
    const initReviews = () => {
        qsa('.reviews .swiper').forEach((el) => {
            createOrUpdateSwiper(el, {
                ...commonSlideClasses,
                loop: false,
                loopAdditionalSlides: 1,
                speed: 500,
                navigation: {
                    nextEl: qs('.swiper-button-next', el),
                    prevEl: qs('.swiper-button-prev', el)
                },
                spaceBetween: getCssVar(el, '--spaceBetween'),
                slidesPerView: getCssVar(el, '--slidesPerView'),
            })

            bindEqualHeightObserver(el, '.review')
        })
    }

    // Регистрируем наш блок в системе ядра
    registerInit(initReviews)
})()



// // Reviews slider
// const reviewsSliders = [],
//     reviews = document.querySelectorAll('.reviews .swiper')

// reviews.forEach((el, i) => {
//     el.classList.add('reviews_s' + i)

//     let options = {
//         loop: false,
//         loopAdditionalSlides: 1,
//         speed: 500,
//         watchSlidesProgress: true,
//         slideActiveClass: 'active',
//         slideVisibleClass: 'visible',
//         lazy: true,
//         navigation: {
//             nextEl: el.querySelector('.swiper-button-next'),
//             prevEl: el.querySelector('.swiper-button-prev')
//         },
//         spaceBetween: getCssVar(el, '--spaceBetween'),
//         slidesPerView: getCssVar(el, '--slidesPerView'),
//         on: {
//             init: swiper => setHeight(swiper.el.querySelectorAll('.review')),
//             resize: swiper => {
//                 let items = swiper.el.querySelectorAll('.review')

//                 items.forEach(el => el.style.height = 'auto')

//                 setHeight(items)
//             }
//         }
//     }

//     reviewsSliders.push(new Swiper('.reviews_s' + i, options))
// })