/*!
 * Lazy Load - jQuery插件延迟加载图像
 *
 * Copyright (c) 2007-2015 Mika Tuupola
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 *   http://www.appelsiini.net/projects/lazyload
 *
 * Version:  1.9.7
 *
 */

(function($, window, document, undefined) {
    var $window = $(window);

    $.fn.lazyload = function(options) {
        var elements = this;
        var $container;
        var settings = {
            threshold       : 0,
            failure_limit   : 0,
            event           : "scroll",
            effect          : "show",
            container       : window,
            data_attribute  : "original",
            skip_invisible  : false,
            appear          : null,
            load            : null,
            placeholder     : "data:image/png;base64,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"
//            placeholder     : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"
        };

        function update() {
            var counter = 0;

            elements.each(function() {
                var $this = $(this);
                if (settings.skip_invisible && !$this.is(":visible")) {
                    return;
                }
                if ($.abovethetop(this, settings) ||
                    $.leftofbegin(this, settings)) {
                        /* Nothing. */
                } else if (!$.belowthefold(this, settings) &&
                    !$.rightoffold(this, settings)) {
                        $this.trigger("appear");
                        /* if we found an image we'll load, reset the counter */
                        counter = 0;
                } else {
                    if (++counter > settings.failure_limit) {
                        return false;
                    }
                }
            });

        }

        if(options) {
            /* Maintain BC for a couple of versions. */
            if (undefined !== options.failurelimit) {
                options.failure_limit = options.failurelimit;
                delete options.failurelimit;
            }
            if (undefined !== options.effectspeed) {
                options.effect_speed = options.effectspeed;
                delete options.effectspeed;
            }

            $.extend(settings, options);
        }

        /* Cache container as jQuery as object. */
        $container = (settings.container === undefined ||
                      settings.container === window) ? $window : $(settings.container);

        /* Fire one scroll event per scroll. Not one scroll event per image. */
        if (0 === settings.event.indexOf("scroll")) {
            $container.bind(settings.event, function() {
                return update();
            });
        }

        this.each(function() {
            var self = this;
            var $self = $(self);

            self.loaded = false;

            /* If no src attribute given use data:uri. */
            if ($self.attr("src") === undefined || $self.attr("src") === false) {
                if ($self.is("img")) {
                    $self.attr("src", settings.placeholder);
                }
            }

            /* When appear is triggered load original image. */
            $self.one("appear", function() {
                if (!this.loaded) {
                    if (settings.appear) {
                        var elements_left = elements.length;
                        settings.appear.call(self, elements_left, settings);
                    }
                    $("<img />")
                        .bind("load", function() {

                            var original = $self.attr("data-" + settings.data_attribute);
                            $self.hide();
                            if ($self.is("img")) {
                                $self.attr("src", original);
                            } else {
                                $self.css("background-image", "url('" + original + "')");
                            }
                            $self[settings.effect](settings.effect_speed);

                            self.loaded = true;

                            /* Remove image from array so it is not looped next time. */
                            var temp = $.grep(elements, function(element) {
                                return !element.loaded;
                            });
                            elements = $(temp);

                            if (settings.load) {
                                var elements_left = elements.length;
                                settings.load.call(self, elements_left, settings);
                            }
                        })
                        .attr("src", $self.attr("data-" + settings.data_attribute));
                }
            });

            /* When wanted event is triggered load original image */
            /* by triggering appear.                              */
            if (0 !== settings.event.indexOf("scroll")) {
                $self.bind(settings.event, function() {
                    if (!self.loaded) {
                        $self.trigger("appear");
                    }
                });
            }
        });

        /* Check if something appears when window is resized. */
        $window.bind("resize", function() {
            update();
        });

        /* With IOS5 force loading images when navigating with back button. */
        /* Non optimal workaround. */
        if ((/(?:iphone|ipod|ipad).*os 5/gi).test(navigator.appVersion)) {
            $window.bind("pageshow", function(event) {
                if (event.originalEvent && event.originalEvent.persisted) {
                    elements.each(function() {
                        $(this).trigger("appear");
                    });
                }
            });
        }

        /* Force initial check if images should appear. */
        $(document).ready(function() {
            update();
        });

        return this;
    };

    /* Convenience methods in jQuery namespace.           */
    /* Use as  $.belowthefold(element, {threshold : 100, container : window}) */

    $.belowthefold = function(element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = (window.innerHeight ? window.innerHeight : $window.height()) + $window.scrollTop();
        } else {
            fold = $(settings.container).offset().top + $(settings.container).height();
        }

        return fold <= $(element).offset().top - settings.threshold;
    };

    $.rightoffold = function(element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = $window.width() + $window.scrollLeft();
        } else {
            fold = $(settings.container).offset().left + $(settings.container).width();
        }

        return fold <= $(element).offset().left - settings.threshold;
    };

    $.abovethetop = function(element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = $window.scrollTop();
        } else {
            fold = $(settings.container).offset().top;
        }

        return fold >= $(element).offset().top + settings.threshold  + $(element).height();
    };

    $.leftofbegin = function(element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = $window.scrollLeft();
        } else {
            fold = $(settings.container).offset().left;
        }

        return fold >= $(element).offset().left + settings.threshold + $(element).width();
    };

    $.inviewport = function(element, settings) {
         return !$.rightoffold(element, settings) && !$.leftofbegin(element, settings) &&
                !$.belowthefold(element, settings) && !$.abovethetop(element, settings);
     };

    /* Custom selectors for your convenience.   */
    /* Use as $("img:below-the-fold").something() or */
    /* $("img").filter(":below-the-fold").something() which is faster */

    $.extend($.expr[":"], {
        "below-the-fold" : function(a) { return $.belowthefold(a, {threshold : 0}); },
        "above-the-top"  : function(a) { return !$.belowthefold(a, {threshold : 0}); },
        "right-of-screen": function(a) { return $.rightoffold(a, {threshold : 0}); },
        "left-of-screen" : function(a) { return !$.rightoffold(a, {threshold : 0}); },
        "in-viewport"    : function(a) { return $.inviewport(a, {threshold : 0}); },
        /* Maintain BC for couple of versions. */
        "above-the-fold" : function(a) { return !$.belowthefold(a, {threshold : 0}); },
        "right-of-fold"  : function(a) { return $.rightoffold(a, {threshold : 0}); },
        "left-of-fold"   : function(a) { return !$.rightoffold(a, {threshold : 0}); }
    });

})(jQuery, window, document);
