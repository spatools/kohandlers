define(["require", "exports", "knockout", "underscore", "jquery", "koutils/utils"], function(require, exports, ko, _, $, utils) {
    var handlers = ko.bindingHandlers;

    handlers.on = {
        init: function (element, valueAccessor) {
            var handlers = ko.unwrap(valueAccessor()), $element = $(element);

            _.each(handlers, function (handler, key) {
                $element.on(key, handler);
            });
        }
    };

    handlers.hover = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var value = ko.unwrap(valueAccessor());

            if (typeof value === "string")
                value = { classes: value };

            $(element).on("mouseover", function (e) {
                if (value.enter)
                    value.enter.call(viewModel, viewModel, e.originalEvent);

                if (value.classes)
                    ko.bindingHandlers.css.update(element, utils.createAccessor(value.classes), allBindingsAccessor, viewModel, bindingContext);
            }).on("mouseout", function (e) {
                if (value.leave)
                    value.leave.call(viewModel, viewModel, e.originalEvent);

                if (value.classes)
                    ko.bindingHandlers.css.update(element, utils.createAccessor(""), allBindingsAccessor, viewModel, bindingContext);
            });
        }
    };

    handlers.toggle = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var value = valueAccessor(), options = ko.unwrap(value), event = ko.unwrap(options.event) || "click", eventValue = {};

            if (_.isBoolean(options))
                options = { value: value };

            var handler = function () {
                if (ko.isWriteableObservable(options.value))
                    options.value(!options.value());
            };

            eventValue[event] = handler;
            ko.bindingHandlers.event.init(element, utils.createAccessor(eventValue), allBindingsAccessor, viewModel, bindingContext);
        }
    };

    handlers.dblclick = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
            var fn = valueAccessor();
            $(element).dblclick(function () {
                var data = ko.dataFor(this);
                fn.call(viewModel, data);
            });
        }
    };

    function createToggleClassAccessor(element, off, on, down) {
        var data = $(element).data("ko-toggle-class"), result = {}, appendClasses = function (obj, classes, value) {
            _.each(classes.split(/\s+/), function (_class) {
                if (!obj[_class])
                    obj[_class] = value;
            });
        };

        if (data.off === data.on)
            appendClasses(result, data.off, off || on);
        else {
            appendClasses(result, data.off, off);
            appendClasses(result, data.on, on);
        }

        if (data.down !== data.off && data.down !== data.up)
            appendClasses(result, data.down, down);

        return function () {
            return result;
        };
    }

    ko.bindingHandlers.toggleClass = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var value = ko.unwrap(valueAccessor()), off = ko.unwrap(value.off), on = ko.unwrap(value.on), down = ko.unwrap(value.down), useParent = ko.unwrap(value.useParent), _element = element;

            if (useParent)
                _element = $(element).parent().get(0);

            $(_element).data("ko-toggle-class", {
                off: off,
                on: on,
                down: down
            });

            $(_element).on({
                mouseenter: function () {
                    ko.bindingHandlers.css.update(element, createToggleClassAccessor(this, false, true, false), allBindingsAccessor, viewModel, bindingContext);
                },
                mouseout: function () {
                    ko.bindingHandlers.css.update(element, createToggleClassAccessor(this, true, false, false), allBindingsAccessor, viewModel, bindingContext);
                },
                mousedown: function () {
                    ko.bindingHandlers.css.update(element, createToggleClassAccessor(this, false, false, true), allBindingsAccessor, viewModel, bindingContext);
                },
                mouseup: function () {
                    ko.bindingHandlers.css.update(element, createToggleClassAccessor(this, false, true, false), allBindingsAccessor, viewModel, bindingContext);
                }
            });
        },
        update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var value = ko.unwrap(valueAccessor()), off = ko.unwrap(value.off), on = ko.unwrap(value.on), down = ko.unwrap(value.down), useParent = ko.unwrap(value.useParent), _element = element;

            if (useParent)
                _element = $(element).parent().get(0);

            $(_element).data("ko-toggle-class", {
                off: off,
                on: on,
                down: down
            });

            ko.bindingHandlers.css.update(element, createToggleClassAccessor(_element, true, false, false), allBindingsAccessor, viewModel, bindingContext);
        }
    };
});
