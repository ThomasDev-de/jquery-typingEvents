// noinspection DuplicatedCode

(function ($) {
    // noinspection DuplicatedCode
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
            trim: ".,|]\\^",
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

                    const isPrevented = setup.preventedKeys.length !== 0 && (setup.preventedKeys.indexOf(e.key) > -1);
                    const isAllowed = !isPrevented &&  ! setup.allowedKeys.length || (setup.allowedKeys.indexOf(e.key) > -1);

                    input.trigger('key.any', [e.key, isAllowed]);
                    input.trigger('key.' + e.key, [e.key, isAllowed]);
                    setup.onKeyDown(e, e.key, isAllowed);

                    if (!isAllowed) {
                        e.preventDefault();
                        input.trigger('key.prevented', [e.key]);
                        setup.onPrevented(e.key);
                        return;
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

                        let value = $.trim(input.val());
                        if (input.attr('type') !== 'password') {
                            if (setup.trim && setup.trim.length) {
                                for (let c of setup.trim) {
                                    value = trim(value, c);
                                }
                            }
                        }

                        input.val($.trim(value));
                        input.trigger('typingEnd', [input.val() || null]);
                        input.data('typing', false);
                        setup.onTypingEnd(input.val());
                    }, setup.delay);
                })
        }

        /**
         * @link https://stackoverflow.com/a/32516190
         * @param {string} s
         * @param {string} c
         * @return {string}
         */
        function trim(s, c) {
            if (c === "]") c = "\\]";
            if (c === "^") c = "\\^";
            if (c === "\\") c = "\\\\";
            return s.replace(new RegExp(
                "^[" + c + "]+|[" + c + "]+$", "g"
            ), "");
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
