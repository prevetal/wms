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