(function($) {
    'use strict';
    var Evostore = Evostore || {};

    Evostore = {

        // registers the properties
        registerVars: function() {
            this.searchBtn = $('.search-toogle');
            this.backBtn = $('.back-to-top');

            this.header = $('.header');

            this.mainEl = $('html, body');
            this.bodyEl = $('body');
            this.searchBar = $('#search-blk');

            this.mainSlideEl = $('.slider');
            this.secSlideEl = $('.electronic-banner');

            this.aniCirc = $('.anmi-circ');

            this.win = $(window);

            this.resizeEnd = null;
        },

        // initialize
        init: function() {
            this.toggleSearch();
            this.scrollWin();
            this.sliderInit();
            this.displayModal();
            this.toggleCart();
            this.displayFullScreenMenu();
            this.playVideo();
            this.rangeSlider();
            this.countDownTimer();
            this.scrollEvent();
            this.timeOuts();
            this.initAccordion();
            this.initCarousel();
            this.initCountUp();


            var _self = this;

            if (this.win.width() < 768) {
                this.handleMobileDevice();
            }

            var winEl = this.win;
            this.win.on('resize', function() {
                clearTimeout(_self.resizeEnd);
                _self.resizeEnd = setTimeout(function() {
                    winEl.trigger('resize-end');
                }, 100);
            });

            this.win.on('resize-end', function(e) {
                _self.resizeEvent();
            });

            // set the default values
            $('#amount').html("$" + $('#price-range').slider("values", 0) +
                " - $" + $('#price-range').slider("values", 1));
        },

        // searchbar toggle
        toggleSearch: function() {
            var bar = this.searchBar;
            this.searchBtn.on('click', function(e) {
                e.preventDefault();
                bar.slideToggle('in');
            });
        },

        // scroll window to top
        scrollWin: function() {
            var el = this.mainEl;
            this.backBtn.on('click', function(e) {
                console.log(el);
                e.preventDefault();
                el.animate({
                    scrollTop: 0
                }, 750);
            });
        },

        // initialize the slider
        sliderInit: function() {
            var el = this.mainEl;

            // main slider
            if (el.has('.slider')) {
                this.mainSlideEl.fractionSlider({
                    'fullWidth': true,
                    'responsive': true,
                    'dimensions': "1920,900",
                    'increase': false,
                    'pauseOnHover': false,
                    'autoChange': true,
                    'slideEndAnimation': false
                });
            }

            // electonics banner slider
            if (el.has('.electronic-banner')) {
                this.secSlideEl.fractionSlider({
                    'fullWidth': true,
                    'responsive': true,
                    'dimensions': "860,488",
                    'increase': false,
                    'pauseOnHover': false,
                    'autoChange': true,
                    'slideEndAnimation': false
                });
            }
        },

        // display newsletter modal
        displayModal: function() {
            if (this.bodyEl.has('#newsletter')) {
                $('#newsletter').modal('show');
            }
        },

        // offcanvas cart
        toggleCart: function() {
            var _self = this;
            $('.off-cart-btn').on('click', function(e) {
                e.preventDefault();
                $('.cart-canvas').toggleClass('shw');
                $('.off-btn').toggleClass('pull')
                _self.aniCirc.toggleClass('animi');
            });
        },

        // full screen menu
        displayFullScreenMenu: function() {
            var _self = this;
            $('button.nav-tgl').on('click', function() {
                _self.bodyEl.toggleClass('open');
            });
        },

        // youtube video popup
        playVideo: function() {
            $('.play-btn').YouTubePopUp();
        },

        //jquery ui range slider
        rangeSlider: function() {
            $('#price-range').slider({
                range: true,
                min: 0,
                max: 300,
                values: [35, 219],
                slide: function(event, ui) {
                    $('#amount').html("$" + ui.values[0] + " - $" + ui.values[1]);
                    $('#amount1').val(ui.values[0]);
                    $('#amount2').val(ui.values[1]);
                }
            });
        },

        // initialize counter up plugin
        initCountUp: function() {
            $('.count').counterUp({
                delay: 50,
                time: 2000
            });
        },

        // initialize accordion
        initAccordion: function() {
            $(".accordion").accordion({
                heightStyle: "content"
            });
        },

        // count down timer
        countDownTimer: function() {
            var $countDown = $('.count-down');

            if ($countDown.length) {
                var endDate = new Date($countDown.data("end-date"));
                $countDown.countdown({
                    date: endDate,
                    render: function(data) {
                        $(this.el).html(
                            '<div><span class="time">' + this.leadingZeros(data.days, 2) + '</span> DAYS</div>' +
                            '<span class="coln">:</span>' +
                            '<div><span class="time">' + this.leadingZeros(data.hours, 2) + '</span> HOURS</div>' +
                            '<span class="coln">:</span>' +
                            '<div><span class="time">' + this.leadingZeros(data.min, 2) + '</span> MIN</div>' +
                            '<span class="coln">:</span>' +
                            '<div><span class="time">' + this.leadingZeros(data.sec, 2) + '</span> SEC</div>'
                        );
                    }
                });
            }
        },

        // window scroll event
        scrollEvent: function() {
            var _self = this;
            this.win.on('scroll', function() {
                if ($(this).scrollTop() > 200) {
                    _self.backBtn.fadeIn();
                    _self.header.addClass("sticky");

                } else {
                    _self.backBtn.fadeOut();
                    _self.header.removeClass("sticky");
                }
            });

            var $sticky = $('.stick');
            var $stickyrStopper = $('.stop-point');
            if (!!$sticky.offset()) {
                var generalSidebarHeight = $sticky.innerHeight();
                var stickyTop = $sticky.offset().top;
                var stickOffset = 0;
                var stickyStopperPosition = $stickyrStopper.offset().top;
                var stopPoint = stickyStopperPosition - generalSidebarHeight - stickOffset;
                var diff = stopPoint - stickOffset;

                $sticky.css({ position: 'absolute', top: 'initial' });

                _self.win.on('scroll', function() {
                    var windowTop = _self.win.scrollTop();
                    if (stopPoint < windowTop) {
                        $sticky.css({ position: 'absolute', top: diff });
                    } else if (stickyTop < windowTop + stickOffset) {
                        $sticky.css({ position: 'fixed', top: stickOffset });
                    } else {
                        $sticky.css({ position: 'absolute', top: 'initial' });
                    }
                });
            }
        },

        // handle all the function with windows timeout
        timeOuts: function() {
            var _self = this;

            setTimeout(function() {
                _self.aniCirc.addClass('faa-burst animated');
            }, 3000);

            setTimeout(function() {
                $('.progress .bar').each(function() {
                    var me = $(this);
                    var perc = me.attr("data-percentage");

                    var current_perc = 0;

                    var progress = setInterval(function() {
                        if (current_perc >= perc) {
                            clearInterval(progress);
                        } else {
                            current_perc += 1;
                            me.css('width', (current_perc) + '%');
                        }

                        me.text((current_perc) + '%');

                    }, 50);
                });

            }, 1000);
        },

        // carousels initialization
        initCarousel: function() {
            // product slider
            $('.product-slider').slick({
                variableWidth: true,
                infinite: true,
                autoplay: true,
                slidesToShow: 4,
                slidesToScroll: 1,
                responsive: [{
                        breakpoint: 991,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 1
                        }
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1,
                            variableWidth: false,
                            autoplay: false,
                            arrows: false,
                            dots: true
                        }
                    },
                    {
                        breakpoint: 482,
                        settings: {
                            variableWidth: false,
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            dots: true,
                            arrows: false
                        }
                    }
                ]
            });

            // product slider
            $('.look-slider').slick({
                infinite: true,
                variableWidth: true,
                autoplay: true,
                slidesToShow: 2,
                slidesToScroll: 1,
                responsive: [{
                    breakpoint: 569,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        autoplay: true,
                        variableWidth: true
                    }
                }]
            });

            // product slider
            $('.product-slider2').slick({
                variableWidth: true,
                infinite: true,
                autoplay: true,
                slidesToShow: 4,
                slidesToScroll: 1,
                responsive: [{
                        breakpoint: 991,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 1
                        }
                    },
                    {
                        breakpoint: 569,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            variableWidth: false,
                            arrows: false,
                            dots: true,
                        }
                    }
                ]
            });

            // brand slider
            $('.brand-slider').slick({
                infinite: true,
                autoplay: true,
                slidesToShow: 6,
                slidesToScroll: 1,
                speed: 200,
                responsive: [{
                        breakpoint: 991,
                        settings: {
                            slidesToShow: 4
                        }
                    },
                    {
                        breakpoint: 569,
                        settings: {
                            slidesToShow: 3
                        }
                    },
                    {
                        breakpoint: 482,
                        settings: {
                            slidesToShow: 2
                        }
                    }
                ]
            });

            // product slider
            $('.pdt-single').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                dots: false,
                fade: true,
                asNavFor: '.pdt-thumb',
                infinite: true,
                autoplay: true,
                responsive: [{
                    breakpoint: 991,
                    settings: {
                        dots: true
                    }
                }]
            });

            $('.pdt-thumb').slick({
                slidesToShow: 5,
                asNavFor: '.pdt-single',
                dots: false,
                arrows: false,
                variableWidth: true,
                infinite: true,
                autoplay: true
            });
        },

        // for mobile devices
        handleMobileDevice: function() {
            // main nav toggle sub menu
            $('li.menu-item-has-children > a').on('click', function(e) {
                e.preventDefault();
                $(this).next().slideToggle();
            });

            // main nav toggle mega menu
            $('div.menu-item-has-children > h4').on('click', function(e) {
                e.preventDefault();
                $(this).next().slideToggle();
            });

            // mega menu menu-item
            $('.column > h4').on('click', function(e) {
                e.preventDefault();
                $(this).next().slideToggle();
            });

            // top header toggle actions
            $('.dropdown > .drop-down-toggle').on('click', function(e) {
                e.preventDefault();
                $(this).next().slideToggle();
            });

            // mini cart
            $('.crt-btn').on('click', function(e) {
                $('.widget_shopping_cart').slideToggle('.show');
            });

            // category
            $('.cat-toggle').on('click', function(e) {
                $('#elec-catg').slideToggle('.show');
            });

            // category
            $('.navbar-toggle').on('click', function(e) {
                $('#wrap').toggleClass('shw');
            });

            //product single scroll slider 
            $('.scroll-slider').slick({
                infinite: true,
                autoplay: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                dots: true
            });

            // product scroll slider
            var $sticky = $('.stick');
            var $stickyrStopper = $('.stop-point');
            if (!!$sticky.offset()) {
                var generalSidebarHeight = $sticky.innerHeight();
                var stickyTop = $sticky.offset().top;
                var stickOffset = 0;
                var stickyStopperPosition = $stickyrStopper.offset().top;
                var stopPoint = stickyStopperPosition - generalSidebarHeight - stickOffset;
                var diff = stopPoint - stickOffset;

                $sticky.css({ position: 'absolute', top: 'initial' });
                var _self = this;
                this.win.on('scroll', function() {
                    var windowTop = _self.win.scrollTop();
                    if (stopPoint < windowTop) {
                        $sticky.css({ position: 'absolute', top: diff });
                    } else if (stickyTop < windowTop + stickOffset) {
                        $sticky.css({ position: 'fixed', top: stickOffset });
                    } else {
                        $sticky.css({ position: 'absolute', top: 'initial' });
                    }
                });
            }
        },

        // handle window resizes
        resizeEvent: function() {
            if (this.win.width() < 768) {
                // this.handleMobileDevice();
            }
        },

    };

    $(function() {
        Evostore.registerVars();
        Evostore.init();
    });

})(jQuery);