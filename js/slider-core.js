// js/slider-core.js
(function () {
    'use strict';

    // Вспомогательные DOM-хелперы
    const qs = (selector, parent = document) => parent.querySelector(selector);
    const qsa = (selector, parent = document) => Array.from(parent.querySelectorAll(selector));

    // Безопасное получение CSS-переменных
    const getCssVar = (el, name) => {
        const val = getComputedStyle(el).getPropertyValue(name).trim(),
        num = parseFloat(val)

        return isNaN(num) ? val : num
    }

    // Хранилище активных инстансов Swiper, чтобы не плодить утечки памяти
    const activeSwipers = new Map();

    const commonSlideClasses = {
        watchSlidesProgress: true,
        slideActiveClass: 'active',
        slideVisibleClass: 'visible',
        lazy: true
    };

    // Функция деструктуризации существующего слайдера перед обновлением
    const destroySwiper = (swiperEl) => {
        if (activeSwipers.has(swiperEl)) {
            const instance = activeSwipers.get(swiperEl);
            if (instance && typeof instance.destroy === 'function') {
                instance.destroy(true, true);
            }
            activeSwipers.delete(swiperEl);
        }
    };

    // Функция создания или обновления слайдера
    const createOrUpdateSwiper = (swiperEl, options) => {
        if (!swiperEl || typeof window.Swiper === 'undefined') return null;
        destroySwiper(swiperEl);
        const instance = new Swiper(swiperEl, options);
        activeSwipers.set(swiperEl, instance);
        return instance;
    };

    // Выравнивание высоты слайдов
    const bindEqualHeightObserver = (container, slideSelector) => {
        const setEqualHeight = () => {
            const slides = qsa(slideSelector, container);
            if (!slides.length) return;
            slides.forEach(slide => slide.style.height = 'auto');
            const maxHeight = Math.max(...slides.map(slide => slide.offsetHeight));
            slides.forEach(slide => slide.style.height = `${maxHeight}px`);
        };
        setEqualHeight();
        // Слушаем изменение размеров экрана для перерасчета высоты
        window.removeEventListener('resize', setEqualHeight);
        window.addEventListener('resize', setEqualHeight, { passive: true });
    };

    // Система реестра: сюда модули-блоки будут складывать свои функции инициализации
    const initRegistry = [];

    const registerInit = (fn) => {
        if (typeof fn === 'function') {
            initRegistry.push(fn);
            // Если документ уже готов — запускаем сразу, иначе ждем
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', fn);
            } else {
                fn();
            }
        }
    };

    // Функция задержки выполнения (debounce), чтобы избежать лагов при ресайзе
    const debounce = (func, wait) => {
        let timeout;
        return function (...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    };

    // Слежение за брейкпоинтами для точечного перезапуска слайдеров
    const initSliderAdaptiveReinitByMatchMedia = () => {
        const mqs = [
            window.matchMedia('(max-width: 767px)'),
            window.matchMedia('(min-width: 768px) and (max-width: 1279px)'),
            window.matchMedia('(min-width: 1280px)')
        ];

        const reinit = debounce(() => {
            // Запускаем инициализацию всех зарегистрированных на странице блоков заново
            initRegistry.forEach(fn => fn());
            console.log('[AppSliders] Переинициализация всех слайдеров');
        }, 120);

        mqs.forEach((mq) => {
            mq.removeEventListener('change', reinit);
            mq.addEventListener('change', reinit);
        });
    };

    // Запускаем адаптивный трекер сразу
    initSliderAdaptiveReinitByMatchMedia();

    // Экспортируем общее API в глобальный объект
    window.AppSliders = {
        qs,
        qsa,
        getCssVar,
        commonSlideClasses,
        createOrUpdateSwiper,
        bindEqualHeightObserver,
        registerInit
    };
})();