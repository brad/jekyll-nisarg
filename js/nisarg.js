/**
 * Makes the top level navigation menu item clickable
 */

(function($){
    
    $( '.navbar-nav > li.menu-item > a' ).click( function(){
          window.location = $( this ).attr( 'href' );
        });

    $('.dropdown').hover(function() {
        $(this).addClass('open');
    },
    function() {
        $(this).removeClass('open');
    });

    var setHeight = function (h) {
		
	height = h;

	$("#cc_spacer").css("height", height + "px");
	}

	$(window).resize(function(){
		setHeight($("#navigation_menu").height());
	})

	$(window).ready(function(){
		setHeight($("#navigation_menu").height());
	})


})(jQuery);

