(function ($) {
    $.fn.typingEvents = function (options) {
        if (!$(this).length) {
            return this;
        }

        if ($(this).length > 1) {
            return $(this).each(function (i, e) {
                return $(e).typingEvents(options);
            });
        }

        const input = $(this);

        if (input.data('typingEvents') === true) {
            return input;
        }

        const DEFAULTS = {
            delay: 400,
            preventedKeys: [],
            allowedKeys: [],
            onKeyDown(event, key, allowed) {
            },
            onKeyUp(key) {
            },
            onPrevented(key) {
            },
            onTypingStart() {
            },
            onTypingEnd(value) {
            }
        };

        const setup = $.extend({}, DEFAULTS, options || {});

        let timer = 0;

        /**
         *
         * @param {$|jQuery} el
         * @return {void}
         */
        function events(el) {
            el
                .on('keydown', function (e) {
                    setup.onKeyUp(e, e.key);
                })
                .on('keydown', function (e) {

                    setup.onKeyDown(e, e.key);
                    const disallow = (setup.allowedKeys.length && setup.allowedKeys.indexOf(e.key) === -1) || setup.preventedKeys.indexOf(e.key) > -1;
                    input.trigger('key.any', [e.key, !disallow]);
                    input.trigger('key.'+e.key, [e.key, !disallow]);
                    setup.onKeyDown(e, e.key, !disallow);

                    if(disallow){
                        e.preventDefault();
                        input.trigger('key.prevented', [e.key]);
                        setup.onPrevented(e.key);
                        return false;
                    }

                    if (input.data('typing') !== true) {
                        input.trigger('typingStart');
                        input.data('typing', true);
                        setup.onTypingStart();
                    }
                })
                .on('input', function () {
                    if (timer) {
                        clearTimeout(timer);
                    }

                    timer = setTimeout(function () {
                        input.val($.trim(input.val()));
                        input.trigger('typingEnd', [input, input.val() || null])
                        input.data('typing', false);
                        setup.onTypingEnd(input.val());
                    }, setup.delay);
                })
        }

        /**
         *
         * @return {$|jQuery}
         */
        function init() {
            events(input);
            input.data('typing', false);
            input.data('typingEvents', true);
            input.data('setup', setup);
            return input;
        }

        return init();
    };
}(jQuery));
