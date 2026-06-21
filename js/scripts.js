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


// Tabs
var locationHash = window.location.hash

$('body').on('click', '.tabs .btn', function(e) {
	e.preventDefault()

	if (!$(this).hasClass('active')) {
		let parent = $(this).closest('.tabs_container'),
			activeTab = $(this).data('content'),
			activeTabContent = $(activeTab),
			level = $(this).data('level')

		parent.find('.tabs:first .btn').removeClass('active')
		parent.find('.tab_content.' + level).removeClass('active')

		$(this).addClass('active')
		activeTabContent.addClass('active')
	}
})

if (locationHash && $('.tabs_container').length) {
	let activeTab = $(`.tabs button[data-content="${locationHash}"]`),
		activeTabContent = $(locationHash),
		parent = activeTab.closest('.tabs_container'),
		level = activeTab.data('level')

	parent.find('.tabs:first .btn').removeClass('active')
	parent.find('.tab_content.' + level).removeClass('active')

	activeTab.addClass('active')
	activeTabContent.addClass('active')

	$('html, body').stop().animate({ scrollTop: $activeTabContent.offset().top }, 1000)
}


if (is_touch_device()) {
	// Submenu on the touch screen
	$('header .menu .item > a.sub_link').click(function (e) {
		e.preventDefault()

		const dropdown = $(this).next(),
			isOpen = dropdown.hasClass('show')

		$('header .menu .sub').removeClass('show')

		if (!isOpen) {
			dropdown.addClass('show')
		}
	})

	// Close the submenu when clicking outside it
	document.addEventListener('click', e => {
		if ($(e.target).closest('.menu').length === 0) {
			$('header .menu .sub').removeClass('show')
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