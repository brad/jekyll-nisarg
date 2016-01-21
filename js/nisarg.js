/**
 * Makes the top level navigation menu item clickable
 */
function nisarg_make_top_level_menu_clickable($){
        $( '.navbar-nav > li.menu-item > a' ).click( function(){
          window.location = $( this ).attr( 'href' );
        });
}

jQuery(document).ready(nisarg_make_top_level_menu_clickable);

$(function(){
    $('.dropdown').hover(function() {
        $(this).addClass('open');
    },
    function() {
        $(this).removeClass('open');
    });
});



(function ($) {

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
})(jQuery, window);