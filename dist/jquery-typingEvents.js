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
        const wrapperClass = 'wc-typing-wrapper';

        if (input.data('typingEvents') === true) {
            return input;
        }

        const DEFAULTS = {
            delay: 400,
            typingContent: '✍'
        };

        const setup = $.extend({}, DEFAULTS, options || {});

        let timer = 0;

        function events(el) {
            el
                .on('keydown', function () {
                    if (input.data('typing') !== true) {
                        input.trigger('typingStart');
                        input.data('typing', true);
                        getWrapper(input).addClass('typing')
                    }
                })
                .on('input', function () {
                    if (timer) {
                        clearTimeout(timer);
                    }

                    timer = setTimeout(function () {
                        input.trigger('typingEnd', [input, input.val() || null])
                        input.data('typing', false);
                        getWrapper(input).removeClass('typing')
                    }, setup.delay);
                })
        }

        function getWrapper(input) {
            return input.closest('.' + wrapperClass);
        }

        function setStyles() {
            if (!$("style#wc_typing_styles").length) {
                $(`<style id="wc_typing_styles">
                        .wc-typing-wrapper { position: relative; display: flex; align-items: center; }
                        .wc-typing-wrapper.typing::after { display: block; position: absolute; flex: 1; right: 10px; font-size:1.5rem;  content: '${setup.typingContent}'}
                    </style>`).appendTo('head');
            }
        }

        function init() {
            events(input);
            input.wrap(function () {
                return `<div class="${wrapperClass}"></div>`;
            });
            input.data('typing', false);
            input.data('typingEvents', true);
            input.data('setup', setup);
            input.addClass('wc-typing-events');
            setStyles();
            return input;
        }

        return init();
    };
}(jQuery));