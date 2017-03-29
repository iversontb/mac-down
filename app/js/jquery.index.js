( function(){

    "use strict";

    $( function(){

        $.each( $('.rate__new'), function(){
            new Rating( $(this) );
        } );

        $( '.tabs' ).each( function(){
            new Tabs( {
                obj: $( this ),
                showType: 1, // if "showType = 0" tabs will be without any animations
                activeIndex: function( index ){
                }
            } );
        } );

    } );

    var Rating = function (obj) {

        var _obj = obj,
            _itemRate = _obj.find('div'),
            _hiddenInput = _obj.find('input[type="hidden"]');

        var _addEvents = function () {

                _itemRate.on({
                    'click': function(){
                        var curItem = $(this),
                            dataRate = curItem.attr('data-rate'),
                            prevElems = curItem.prevAll('div');

                        _itemRate.removeClass('active');
                        prevElems.addClass('active');
                        curItem.addClass('active');
                        _hiddenInput.val(dataRate);
                    }
                });

            },
            _init = function () {
                _addEvents();
            };

        _init();
    };

    var Tabs = function( params ) {

        //private properties
        var _self = this,
            _obj = params.obj,
            _showType = params.showType,
            _callbackActiveIndex = params.activeIndex,
            _window = $( window ),
            _tabsBtn = _obj.find( 'dt'),
            _tabsContent = _obj.find( 'dd'),
            _mobileScreen = true,
            _globalWidth = 0;

        //private methods
        var _addClassForAnimation = function() {

                if( _showType == 1 ){

                    _obj.addClass( 'tabs_animated1' );

                } else if( _showType == 2 ){

                    _obj.addClass( 'tabs_animated2' );

                }

            },
            _onEvents = function()  {

                _tabsBtn.on( {
                    click: function() {

                        _slideContent( $( this) );
                        _changeActiveTab( $( this) );

                    }
                } );

                _window.on( {
                    load: function () {

                        _setFirstActive();

                    }
                } );

            },

            _init = function() {

                _obj[ 0 ].obj = _self;
                _onEvents();
                _addClassForAnimation();

            },
            _changeActiveTab = function( elem ) {

                var curItem = elem,
                    nextContent = curItem.next(),
                    nextContentInner = nextContent.find( '.tabs__content' );

                if( !curItem.hasClass( 'active' ) ) {

                    _tabsBtn.removeClass( 'active' );
                    _tabsContent.height( 0 );
                    curItem.addClass( 'active' );
                    nextContent.innerHeight( nextContentInner.innerHeight() );
                }

                _callbackActiveIndex( curItem.index() / 2 );

            },
            _setFirstActive = function() {

                if( _mobileScreen ) {

                    _tabsBtn.eq( 0 ).addClass( 'active' );
                    _tabsBtn.eq( 0 ).next().height( _tabsBtn.eq( 0 ).next().find('.tabs__content').outerHeight(true) );

                }

            },
            _slideContent = function( elem ) {

                var curItem = elem,
                    nextContent = curItem.next(),
                    nextContentInner = nextContent.find( '.tabs__content' );

                if( !curItem.hasClass( 'active' ) ) {

                    _tabsBtn.removeClass( 'active' );
                    _tabsContent.removeAttr( 'style' );
                    curItem.addClass( 'active' );
                    nextContent.height( nextContentInner.outerHeight(true) );

                } else {

                    curItem.removeClass( 'active' );
                    nextContent.removeAttr( 'style' );
                }

            };

        _init();
    };

} )();

