(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "knockout", "jquery"], factory);
    }
})(function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var knockout_1 = require("knockout");
    var $ = require("jquery");
    knockout_1.bindingHandlers.on = {
        init: function (element, valueAccessor) {
            var handlers = knockout_1.unwrap(valueAccessor()), $element = $(element);
            $element.on(handlers);
        }
    };
    knockout_1.bindingHandlers.hover = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
            var val = knockout_1.unwrap(valueAccessor()), options = typeof val === "string" ?
                { classes: val } :
                val;
            $(element)
                .on("mouseover", function (e) {
                options.enter && options.enter.call(viewModel, viewModel, e.originalEvent);
                if (options.classes)
                    knockout_1.bindingHandlers.css.update(element, function () { return options.classes; });
            })
                .on("mouseout", function (e) {
                options.leave && options.leave.call(viewModel, viewModel, e.originalEvent);
                if (options.classes)
                    knockout_1.bindingHandlers.css.update(element, function () { return ""; });
            });
        }
    };
    knockout_1.bindingHandlers.toggle = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var value = valueAccessor(), rawOptions = knockout_1.unwrap(value), options = typeof rawOptions === "boolean" ?
                { value: value } :
                rawOptions, event = knockout_1.unwrap(options.event) || "click", eventValue = {};
            eventValue[event] = handler;
            knockout_1.bindingHandlers.event.init(element, function () { return eventValue; }, allBindingsAccessor, viewModel, bindingContext);
            function handler() {
                if (knockout_1.isWriteableObservable(options.value))
                    options.value(!options.value());
            }
        }
    };
    knockout_1.bindingHandlers.dblclick = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
            var fn = valueAccessor();
            $(element).dblclick(function (e) {
                var data = knockout_1.dataFor(this);
                fn.call(viewModel, data, e);
            });
        }
    };
    knockout_1.bindingHandlers.toggleClass = {
        init: function (element, valueAccessor) {
            var value = knockout_1.unwrap(valueAccessor()), off = knockout_1.unwrap(value.off), on = knockout_1.unwrap(value.on), down = knockout_1.unwrap(value.down), useParent = knockout_1.unwrap(value.useParent), target = useParent ?
                $(element).parent().get(0) :
                element;
            $(target).data("ko-toggle-class", {
                off: off,
                on: on,
                down: down
            });
            $(target).on({
                mouseenter: function () {
                    knockout_1.bindingHandlers.css.update(element, createToggleClassAccessor(this, false, true, false));
                },
                mouseout: function () {
                    knockout_1.bindingHandlers.css.update(element, createToggleClassAccessor(this, true, false, false));
                },
                mousedown: function () {
                    knockout_1.bindingHandlers.css.update(element, createToggleClassAccessor(this, false, false, true));
                },
                mouseup: function () {
                    knockout_1.bindingHandlers.css.update(element, createToggleClassAccessor(this, false, true, false));
                }
            });
        },
        update: function (element, valueAccessor) {
            var value = knockout_1.unwrap(valueAccessor()), off = knockout_1.unwrap(value.off), on = knockout_1.unwrap(value.on), down = knockout_1.unwrap(value.down), useParent = knockout_1.unwrap(value.useParent), target = useParent ?
                $(element).parent().get(0) :
                element;
            $(target).data("ko-toggle-class", {
                off: off,
                on: on,
                down: down
            });
            knockout_1.bindingHandlers.css.update(element, createToggleClassAccessor(target, true, false, false));
        }
    };
    function appendClasses(obj, classes, value) {
        classes.split(/\s+/g).forEach(function (cssClass) {
            if (!obj[cssClass])
                obj[cssClass] = value;
        });
    }
    function createToggleClassAccessor(element, off, on, down) {
        var data = $(element).data("ko-toggle-class"), result = {};
        if (data.off === data.on)
            appendClasses(result, data.off, off || on);
        else {
            appendClasses(result, data.off, off);
            appendClasses(result, data.on, on);
        }
        if (data.down !== data.off && data.down !== data.up)
            appendClasses(result, data.down, down);
        return function () { return result; };
    }
});
