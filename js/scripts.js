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