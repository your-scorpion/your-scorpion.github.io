;(function($) {
    "use strict"; 


    
    
    //* Navbar Fixed  
    function navbarFixed(){
        if ( $('.main_header_area').length ){ 
            $(window).on('scroll', function() {
                var scroll = $(window).scrollTop();   
                if (scroll >= 295) {
                    $(".main_header_area").addClass("navbar_fixed");
                } else {
                    $(".main_header_area").removeClass("navbar_fixed");
                }
            });  
        };
    };    
    
    //* Magnificpopup js
    function magnificPopup() {
        if ($('.popup-youtube').length) { 
            //Video Popup
            $('.popup-youtube').magnificPopup({
                disableOn: 700,
                type: 'iframe',
                mainClass: 'mfp-fade',
                removalDelay: 160,
                preloader: false, 
                fixedContentPos: false,
            });   
        };
    };
        
    //* Testimonial js
    function testimonialSlide() {
        if ($('.testimonial_area, .blog_carousel').length) {
            $('.testimonial_slide').owlCarousel({
                loop: true,
                margin: 30,
                nav: false, 
                responsive: {
                    0: {
                        items: 1
                    },
                    1000: {
                        items: 2
                    }, 
                }
            })
            $('.blog_carousel').owlCarousel({
                loop: true,
                margin: 30,
                nav: true, 
                navText: ["<i class='fas fa-arrow-left'></i>","<i class='fas fa-arrow-right'></i>"],
                responsive: {
                    0: {
                        items: 1
                    },
                    700: {
                        items: 2
                    }, 
                }
            })
        };
    };   
    
    //* Isotope js
    function protfolioIsotope(){
        if ( $('.portfolio_grid').length ){ 
            // Activate isotope in container
            $(".portfoli_inner").imagesLoaded( function() {
                $(".portfoli_inner").isotope({
                    layoutMode: 'masonry',  
                }); 
            }); 
            
            // Add isotope click function 
            $(".protfoli_filter li").on('click',function(){
                $(".protfoli_filter li").removeClass("active");
                $(this).addClass("active"); 
                var selector = $(this).attr("data-filter");
                $(".portfoli_inner").isotope({
                    filter: selector,
                    animationOptions: {
                        duration: 450,
                        easing: "linear",
                        queue: false,
                    }
                });
                return false;
            });  
        };
    }; 
    
    //* Countdown
    function countDown() {
        if ($('.countdown_area').length) {
            $('.countdown').countdown('2019/10/10', function(event) {
                var $this = $(this).html(event.strftime(''
                + '<div class="items">Month <span>%m</span></div>'
                + '<div class="items">Days<span>%d</span></div>'
                + '<div class="items">Hours<span>%H</span></div>'
                + '<div class="items">Minutes<span>%M</span></div>'
                + '<div class="items">Seconds<span>%S</span></div>'));
            });
        };
    };   
    
    // Scroll to top
    function scrollToTop() {
        if ($('.scroll-top').length) {  
            $(window).on('scroll', function () {
                if ($(this).scrollTop() > 200) {
                    $('.scroll-top').fadeIn();
                } else {
                    $('.scroll-top').fadeOut();
                }
            }); 
            //Click event to scroll to top
            $('.scroll-top').on('click', function () {
                $('html, body').animate({
                    scrollTop: 0
                }, 1000);
                return false;
            });
        }
    }
    
    // Preloader JS
    function preloader(){
        if( $('.preloader').length ){
            $(window).on('load', function() {
                $('.preloader').fadeOut();
                $('.preloader').delay(50).fadeOut('slow');  
            })   
        }
    } 
    
    /*Function Calls*/ 
    new WOW().init();
    navbarFixed ();   
    scrollToTop (); 
    magnificPopup ();
    testimonialSlide ();
    protfolioIsotope ();
    countDown ();
    preloader ();
    
})(jQuery);