/**
 * Functions to add dropdown caret at the end of navigation menu item with children
 * and code to remove white between navigation menu and header image.
 */

(function($){
    /**
      * Add Carate-down at the end of menu item, if the menu item has children
      */
    function initMainNavigation( container ) {
        // Add dropdown toggle that displays child menu items.
        var dropdownToggle = $( '<button />', {
            'class': 'dropdown-toggle',
            'aria-expanded': false
        } ).append( $( '<span />', {
            'class': 'screen-reader-text',
            text: 'expand',
        } ) );

        container.find( '.menu-item-has-children > a' ).after( dropdownToggle );

        // Toggle buttons and submenu items with active children menu items.
        container.find( '.current-menu-ancestor > button' ).addClass( 'toggled-on' );
        container.find( '.current-menu-ancestor > .sub-menu' ).addClass( 'toggled-on' );

        // Add menu items with submenus to aria-haspopup="true".
        container.find( '.menu-item-has-children' ).attr( 'aria-haspopup', 'true' );

        container.find( '.dropdown-toggle' ).click( function( e ) {
            var _this            = $( this ),
                screenReaderSpan = _this.find( '.screen-reader-text' );

            e.preventDefault();
            _this.toggleClass( 'toggled-on' );
            _this.next( '.children, .sub-menu' ).toggleClass( 'toggled-on' );

            // jscs:disable
            _this.attr( 'aria-expanded', _this.attr( 'aria-expanded' ) === 'false' ? 'true' : 'false' );
            // jscs:enable
            screenReaderSpan.text(screenReaderSpan.text() === 'expand' ? 'collapse' : 'expand');
        } );
    }
    initMainNavigation( $( '.main-navigation' ) );

    /**
      * Remove white space between menu and header image.
      */
    var setHeight = function (h) {
    	height = h;
    	$("#cc_spacer").css("height", height + "px");

    // Search
    // Initalize lunr with the fields it will be searching on. I've given title
    // a boost of 10 to indicate matches on this field are more important.
    var searchData = $.getJSON(JEKYLL_SEARCH_GLOBALS.baseurl + '/search.json');
    var idx = null;
    searchData.then(function (loadedData) {
      idx = lunr(function () {
        this.field('id');
        this.field('date');
        this.field('title', { boost: 10 });
        this.field('author');
        this.field('categories');
        this.field('content');
        this.field('url');
        for (var key in loadedData) {
          this.add($.extend({ "id": key }, loadedData[key]));
        }
      });
    });
    function getQueryVariable(variable) {
      var query = window.location.search.substring(1);
      var vars = query.split('&');

      for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');

        if (pair[0] === variable) {
          return decodeURIComponent(pair[1].replace(/\+/g, '%20'));
        }
      }
    };
    function displaySearchResults(opts) {
      var searchResults = $('#search' + (opts.sidebar ? '-sidebar' : '') + '-results');
      var template = $('#search' + (opts.sidebar ? '-sidebar' : '') + '-results-template');
      var engine = new Liquid();
      searchResults.empty();
      engine.parseAndRender(template.html(), opts).then(function (html) {
        searchResults.html(html);
        searchResults.show('fast');
      });
    }
    var searchQuery = $('#search-query');
    function doSearch(opts) {
      var searchTerm = '*' + opts.q + '*';
      if (opts.q.length < 3) {
        $('#search' + (opts.sidebar ? '-sidebar' : '') + '-results').hide('fast');
      } else {
        searchData.then(function (loadedData) {
          var results = idx.search(searchTerm); // Get lunr to perform a search
          displaySearchResults($.extend({
            results: results,
            store: loadedData,
            sidebar: opts.sidebar,
          }, window.JEKYLL_SEARCH_GLOBALS));
        });
      }
    }
    searchQuery.on('keyup', function () {
      doSearch({q: searchQuery.val(), sidebar: true});
    });
    var querySearch = getQueryVariable('q');
    if (querySearch) {
      doSearch({q: querySearch});
    }
	}

  // Window events
	$(window).resize(function(){
		setHeight($("#navigation_menu").height());
	});

	$(window).ready(function(){
		setHeight($("#navigation_menu").height());
	});
})(jQuery);
