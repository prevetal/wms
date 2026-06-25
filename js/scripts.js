BODY = document.getElementsByTagName('body')[0]

// Mobile width
initAdaptiveViewport()


// Accordion
$('body').on('click', '.accordion_item .top', function(e) {
	e.preventDefault()

	let item = $(this).closest('.accordion_item'),
		accordion = $(this).closest('.accordion')

	if (item.hasClass('active')) {
		item.removeClass('active').find('.hidden').slideUp(300)
	} else {
		accordion.find('.accordion_item').removeClass('active')
		accordion.find('.hidden').slideUp(300)

		item.addClass('active').find('.hidden').slideDown(300)
	}
})


if (is_touch_device()) {
	// Submenu on the touch screen
	$('header .menu .item > a.sub_link, footer .menu .item > a.sub_link').click(function (e) {
		e.preventDefault()

		$(this).closest('.item').toggleClass('open')
	})

	// Close the submenu when clicking outside it
	document.addEventListener('click', e => {
		if ($(e.target).closest('.menu').length === 0) {
			$('header .menu .item, footer .menu .item').removeClass('open')
		}
	})
}


// Custom select - Nice select
const selects = document.querySelectorAll('select:not(.skip)'),
	selectsInstances = []

if (selects) {
	selects.forEach(el => {
		selectsInstances.push(NiceSelect.bind(el, {
			placeholder: el.getAttribute('data-placeholder')
		}))

		el.addEventListener('change', () => el.classList.add('selected'))

		if (el.querySelector('option[selected]')) {
			el.classList.add('selected')
		}
	})
}


// Mob. menu
$('header .mob_menu_btn').click((e) => {
	e.preventDefault()

	$('header .mob_menu_btn').toggleClass('active')
	$('body').toggleClass('lock')
	$('.mob_menu').toggleClass('show')
})


$('.mob_menu .menu .item  > a.sub_link').click(function(e) {
	e.preventDefault()

	$(this).closest('.item').toggleClass('open')
})



window.addEventListener('load', function () {
	// Fixed header
	headerInit = true,
	headerHeight = $('header').outerHeight()

	$('header').wrap('<div class="header_wrap"></div>')
	$('.header_wrap').height(headerHeight)

	headerInit && $(window).scrollTop() > headerHeight
		? $('header').addClass('fixed')
		: $('header').removeClass('fixed')
})



window.addEventListener('resize', function () {
	// Fixed header
	headerInit = false
	$('.header_wrap').height('auto')

	setTimeout(() => {
		headerInit = true
		headerHeight = $('header').outerHeight()

		$('.header_wrap').height(headerHeight)

		headerInit && $(window).scrollTop() > headerHeight
			? $('header').addClass('fixed')
			: $('header').removeClass('fixed')
	}, 100)
})



window.addEventListener('scroll', function () {
	// Fixed header
	typeof headerInit !== 'undefined' && headerInit && $(window).scrollTop() > headerHeight
		? $('header').addClass('fixed')
		: $('header').removeClass('fixed')
})