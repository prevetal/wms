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


// Phone input mask
new Maska.MaskInput('input[type=tel]', {
	mask: '+7 (###) ###-##-##'
})


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


// Popover
document.querySelectorAll('[popover]').forEach(el => {
	el.addEventListener('toggle', e => document.querySelector(`[popovertarget="${el.id}"]`)?.classList.toggle('active', e.newState === 'open'))
})


document.querySelectorAll('.modal .container').forEach(wrapper => {
	wrapper.addEventListener('click', e => {
		if (e.target === wrapper) {
			wrapper.closest('[popover]').hidePopover()
		}
	})
})


document.querySelector('#get_demo_modal .inner').addEventListener('click', e => {
    e.stopPropagation()
})


// Custom submit
$('.form').submit(function(e) {
	e.preventDefault()

    document.querySelectorAll('[popover]:popover-open').forEach(p => p.hidePopover())

	document.getElementById('success_modal').showPopover()
})



// Mob. menu
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