/// <reference path="../_definitions.d.ts" />

import ko = require("knockout");
import _ = require("underscore");
import $ = require("jquery");
import utils = require("koutils/utils");
var handlers = ko.bindingHandlers;

handlers.on = {
    init: function (element, valueAccessor) {
        var handlers = ko.unwrap(valueAccessor()),
            $element = $(element);

        _.each(handlers, (handler: (e: JQueryEventObject) => any, key?: string) => {
            $element.on(key, handler);
        });
    }
};

handlers.hover = {
    init: function (element: HTMLElement, valueAccessor: () => any, allBindingsAccessor: () => any, viewModel: any, bindingContext: KnockoutBindingContext) {
        var value = ko.unwrap(valueAccessor());

        if (typeof value === "string")
            value = { classes: value };

        $(element)
            .on("mouseover", function (e: JQueryEventObject) {
                if (value.enter)
                    value.enter.call(viewModel, viewModel, e.originalEvent);

                if (value.classes)
                    ko.bindingHandlers.css.update(element, utils.createAccessor(value.classes), allBindingsAccessor, viewModel, bindingContext);
            })
            .on("mouseout", function (e: JQueryEventObject) {
                if (value.leave)
                    value.leave.call(viewModel, viewModel, e.originalEvent);

                if (value.classes)
                    ko.bindingHandlers.css.update(element, utils.createAccessor(""), allBindingsAccessor, viewModel, bindingContext);
            });
    }
};

handlers.toggle = {
    init: function (element: HTMLElement, valueAccessor: () => any, allBindingsAccessor: () => any, viewModel: any, bindingContext: KnockoutBindingContext) {
        var value = valueAccessor(),
            options = ko.unwrap(value),
            event = ko.unwrap(options.event) || "click",
            eventValue = {};

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

function appendClasses(obj: any, classes: string, value: boolean): void {
    _.each(classes.split(/\s+/), (cssClass) => {
        if (!obj[cssClass])
            obj[cssClass] = value;
    });
}
function createToggleClassAccessor(element: HTMLElement, off: boolean, on: boolean, down: boolean): () => any {
    var data = $(element).data("ko-toggle-class"),
        result = {};

    if (data.off === data.on)
        appendClasses(result, data.off, off || on);
    else {
        appendClasses(result, data.off, off);
        appendClasses(result, data.on, on);
    }

    if (data.down !== data.off && data.down !== data.up)
        appendClasses(result, data.down, down);

    return () => result;
}

ko.bindingHandlers.toggleClass = {
    init: function (element: HTMLElement, valueAccessor: () => any, allBindingsAccessor: () => any, viewModel: any, bindingContext: KnockoutBindingContext) {
        var value = ko.unwrap(valueAccessor()),
            off = ko.unwrap(value.off),
            on = ko.unwrap(value.on),
            down = ko.unwrap(value.down),
            useParent = ko.unwrap(value.useParent),
            _element = element;

        if (useParent)
            _element = $(element).parent().get(0);

        $(_element).data("ko-toggle-class", {
            off: off,
            on: on,
            down: down,
        });

        $(_element).on({
            mouseenter: function () {
                ko.bindingHandlers.css.update(element,
                    createToggleClassAccessor(this, false, true, false),
                    allBindingsAccessor, viewModel, bindingContext);
            },
            mouseout: function () {
                ko.bindingHandlers.css.update(element,
                    createToggleClassAccessor(this, true, false, false),
                    allBindingsAccessor, viewModel, bindingContext);
            },
            mousedown: function () {
                ko.bindingHandlers.css.update(element,
                    createToggleClassAccessor(this, false, false, true),
                    allBindingsAccessor, viewModel, bindingContext);
            },
            mouseup: function () {
                ko.bindingHandlers.css.update(element,
                    createToggleClassAccessor(this, false, true, false),
                    allBindingsAccessor, viewModel, bindingContext);
            }
        });
    },
    update: function (element: HTMLElement, valueAccessor: () => any, allBindingsAccessor: () => any, viewModel: any, bindingContext: KnockoutBindingContext) {
        var value = ko.unwrap(valueAccessor()),
            off = ko.unwrap(value.off),
            on = ko.unwrap(value.on),
            down = ko.unwrap(value.down),
            useParent = ko.unwrap(value.useParent),
            _element = element;

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
