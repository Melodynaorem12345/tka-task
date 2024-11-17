(function($) {
    "use strict";

    // Function to toggle 'scrolled' class based on scroll position
    function toggleScrolled() {
        const $body = $('body');
        const $header = $('#header');
        const $bottomHeader = $('.bottom-header');
        if (!$header.hasClass('scroll-up-sticky') && !$header.hasClass('sticky-top') && !$header.hasClass('fixed-top')) return;

        if ($(window).scrollTop() > 100) {
            $body.addClass('scrolled');
            $bottomHeader.addClass('show');
        } else {
            $body.removeClass('scrolled');
            $bottomHeader.removeClass('show');
        }
    }

    // Attach toggleScrolled to scroll and load events
    $(document).on('scroll', toggleScrolled);
    $(window).on('load', toggleScrolled);

    // Mobile navigation toggle
    const $mobileNavToggleBtn = $('.mobile-nav-toggle');
    function mobileNavToggle() {
        $('body').toggleClass('mobile-nav-active');
        $mobileNavToggleBtn.toggleClass('bi-list bi-x');
    }
    $mobileNavToggleBtn.on('click', mobileNavToggle);

    $('#navmenu a').on('click', function() {
        if ($('body').hasClass('mobile-nav-active')) {
            mobileNavToggle();
        }
    });

    // Dropdown toggle
    $('.navmenu .toggle-dropdown').on('click', function(e) {
        e.preventDefault();
        $(this).parent().toggleClass('active');
        $(this).parent().next().toggleClass('dropdown-active');
        e.stopImmediatePropagation();
    });

    // ScrollSpy function
    const $navmenuLinks = $('.navmenu a');
    function navmenuScrollspy() {
        const position = $(window).scrollTop() + 200;

        $navmenuLinks.each(function() {
            const $link = $(this);
            const href = $link.attr('href');
            
            // Skip invalid hrefs or external URLs
            if (!href || href.startsWith('http') || href === '#') return;

            let section;
            try {
                section = $(href); // Attempt to find the section
            } catch (error) {
                console.warn(`Invalid selector: ${href}`);
                return; // Skip if href is not a valid CSS selector
            }

            if (section.length) {
                if (position >= section.offset().top && position <= (section.offset().top + section.outerHeight())) {
                    $('.navmenu a.active').removeClass('active');
                    $link.addClass('active');
                } else {
                    $link.removeClass('active');
                }
            }
        });
    }

    $(window).on('load scroll', navmenuScrollspy);

    // Custom swiper slide navigation
    $('.custom-swiper-slide').on('click', function() {
        const $container = $('.custom-swiper-container');
        const targetPosition = $(this).position().left + $container.scrollLeft();
        $container.animate({ scrollLeft: targetPosition }, 300);
    });

    // Section toggle functions
    $('.main-heading').on('click', function() {
        $(this).next('.section-content').slideToggle();
        $(this).find('i').toggleClass('bi-chevron-up bi-chevron-down');
    });

    $('.section-heading').on('click', function() {
        $(this).nextAll('.section-content').slideToggle();
        $(this).find('i').toggleClass('bi-chevron-down bi-chevron-up');
    });

    // Theme color change functionality
    const defaultColor = $('.color[data-bg="#ffffff"]');
    defaultColor.addClass('active');
    $('.theme-container').addClass('color-black');

    const themeDetails = {
        "#ffffff": { name: "Light", textClass: "color-black" },
        "#000000": { name: "Dark", textClass: "color-white" },
        "#6a1b9a": { name: "Purple", textClass: "color-white" },
        "#03a9f4": { name: "Blue", textClass: "color-white" },
        "#ff5722": { name: "Orange", textClass: "color-white" },
        "#FF0000": { name: "Red", textClass: "color-white" },
        "#FFC0CB": { name: "Pink", textClass: "color-black" },
        "#008000": { name: "Green", textClass: "color-white" },
        "#A52A2A": { name: "Brown", textClass: "color-white" },
        "#FFFF00": { name: "Yellow", textClass: "color-black" },
    };

    $('.color').on('click', function() {
        $('.color').removeClass('active');
        $(this).addClass('active');
        const gradientClass = $(this).data('gradient');
        const videoBoxColor = $(this).data('bg');

        $('.theme-container').removeClass('color-black color-white').css('background', gradientClass);

        if ($('.playground').length > 0) {
            $('.playground').css('background', videoBoxColor);
        }

        const themeDetail = themeDetails[videoBoxColor] || { name: "Custom", textClass: "color-black" };
        $('.theme-toggle-label .theme-mode').text(themeDetail.name);
        $('.theme-container').addClass(themeDetail.textClass);
        $('.theme-toggle-circle').css('background', videoBoxColor);

        if (videoBoxColor === '#ffffff') {
            $('.theme-container').addClass('color-black').removeClass('color-white');
        } else if (videoBoxColor === '#000000') {
            $('.theme-container').addClass('color-white').removeClass('color-black');
        }
    });

})(jQuery);
