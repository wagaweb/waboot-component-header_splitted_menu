function Waboot_HeaderSplittedMenu(params){
    var $ = jQuery;
    var defaults_params = {
        positionTop: jQuery(window).height() / 2,
        widthStart: 400,
        widthEnd: 200,
        heightStart: 0,
        heightEnd: 0,
        splitStart: 0,
        splitEnd: 100
    };

    this.params = $.extend(defaults_params,params);

    var self = this;

    this.mosefx = function(){
        var $ = jQuery;

        var logo = $('.logonav');
        var logoImg = $('.logonav img');
        var navLeft = $('.main-navigation .navbar-split-left');
        var navRight = $('.main-navigation .navbar-split-right');

        var positionLeftStart = (self.params.widthStart / 2) * -1;
        var positionLeftEnd = (self.params.widthEnd / 2) * -1;

        navLeft.css('padding-top', self.params.heightStart + 'px');
        navLeft.css('padding-bottom', self.params.heightStart + 'px');
        navRight.css('padding-top', self.params.heightStart + 'px');
        navRight.css('padding-bottom', self.params.heightStart + 'px');

        logo.css('top', self.params.positionTop);
        logoImg.css('width', self.params.widthStart);
        logo.css('margin-left', positionLeftStart);

        $(window).scroll(function () {
            if ($(window).scrollTop() < self.params.positionTop) {
                var scrollTop = $(window).scrollTop();
                logo.css('top', self.params.positionTop - scrollTop + 'px');
                logoImg.css('width', self.params.widthStart - scrollTop * ( (self.params.widthStart - self.params.widthEnd) / self.params.positionTop ) + 'px');
                logo.css('margin-left', positionLeftStart - scrollTop * ( (positionLeftStart - positionLeftEnd) / self.params.positionTop ) + 'px');

                var paddingLRPos = self.params.splitStart - scrollTop * ( (self.params.splitStart - self.params.splitEnd) / self.params.positionTop );

                navLeft.css('padding-right', paddingLRPos + 'px');
                navRight.css('padding-left', paddingLRPos + 'px');

                var paddingTBPos = self.params.heightStart - scrollTop * ( (self.params.heightStart - self.params.heightEnd) / self.params.positionTop );

                navLeft.css('padding-top', paddingTBPos + 'px');
                navLeft.css('padding-bottom', paddingTBPos + 'px');
                navRight.css('padding-top', paddingTBPos + 'px');
                navRight.css('padding-bottom', paddingTBPos + 'px');
            } else {
                logo.css('top', '0px');
                logoImg.css('width', self.params.widthEnd + 'px');
                logo.css('margin-left', positionLeftEnd + 'px');
                navLeft.css('padding-right', self.params.splitEnd + 'px');
                navRight.css('padding-left', self.params.splitEnd + 'px');
                navLeft.css('padding-top', self.params.heightEnd + 'px');
                navLeft.css('padding-bottom', self.params.heightEnd + 'px');
                navRight.css('padding-top', self.params.heightEnd + 'px');
                navRight.css('padding-bottom', self.params.heightEnd + 'px');
            }
        });
    };

    this.split = function(){
        var $ = jQuery;
        var logocontainer = $('.logonav'),
            logo = $('.logonav img'),
            width = logo.width(),
            height = logo.height(),
            headerNav = $('.main-navigation ul').height(),
            navLeft = $('.main-navigation .navbar-split-left'),
            navRight = $('.main-navigation .navbar-split-right'),
            additionalMargin = parseInt(wabootHeaderSplitted.margin);

        logocontainer.css('margin-left', (width/2)*-1);

        if (height > headerNav) {
            navLeft.css('padding-top', (height-headerNav)/2);
            navRight.css('padding-top', (height-headerNav)/2);
            navLeft.css('padding-bottom', (height-headerNav)/2);
            navRight.css('padding-bottom', (height-headerNav)/2);
        }else{
            navLeft.css('padding-top', 0);
            navRight.css('padding-top', 0);
            navLeft.css('padding-bottom', 0);
            navRight.css('padding-bottom', 0);
        }

        navLeft.css('padding-right', width/2+additionalMargin);
        navRight.css('padding-left', width/2+additionalMargin);
    }
}

jQuery(document).ready(function($){

    /**
     * Enables the Dropdown functionality
     * @param {string} el the menu with .sub-menu elements
     */
    var Dropdown = function(el){
        this.last_menu_id = "";
        this.hideMenus = function(){
            jQuery('.sub-menu').slideUp();
        };
        var self = this;
        $(el+' > a').on('click', function(e){
            e.preventDefault();
            e.stopPropagation();
            var $target = $(e.currentTarget),
                $submenu = $target.next('.sub-menu'),
                $menu = $target.parents('li'),
                menu_id = $menu.attr('id');
            if(menu_id === self.last_menu_id){
                $submenu.slideUp();
                self.last_menu_id = "";
            }else{
                self.hideMenus();
                $submenu.slideDown();
                self.last_menu_id = menu_id;
            }
        });
        $(document).click(function() {
            self.hideMenus();
            self.last_menu_id = "";
        });
    };

    if($('.menu-item-has-children').length > 0){
        new Dropdown('.menu-item-has-children');
    }

    /**
     * Enable Toggle
     */
    $('.navbar-toggle').click(function(){
        $('.navbar-main-collapse').toggle({
            'easing': 'swing'
        });
    });


    if(wabootHeaderSplitted.split_enabled){
        var wbhsm = new Waboot_HeaderSplittedMenu();
        wbhsm.split();
        $(window).resize(function() {
            wbhsm.split();
        });
    }
});