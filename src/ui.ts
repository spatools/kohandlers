/// <reference path="../_definitions.d.ts" />

import ko = require("knockout");
import _ = require("underscore");
import $ = require("jquery");
import utils = require("koutils/utils");
var handlers = ko.bindingHandlers;

handlers.editable = {
    init: function (element: HTMLElement, valueAccessor: () => any, allBindingsAccessor: () => any, viewModel: any, bindingContext: KnockoutBindingContext) {
        var options = ko.unwrap(valueAccessor()),
            value = ko.unwrap(options.value),
            isEdit = ko.unwrap(options.isEdit || false),
            type = ko.unwrap(options.type || "text"),
            input = null;

        if (type === "textarea")
            input = $("<textarea>").attr({ "class": "textarea-editable" });
        else if (type === "select")
            input = $("<select>").attr({ "class": "select-editable" });
        else
            input = $("<input>").attr({ "class": "input-editable", type: type });

        if (element.hasAttribute("id"))
            input.attr("name", element.getAttribute("id"));

        $(element).after(input);
        input.after($("<del>"));

        if (type === "checkbox") {
            handlers.checked.init(input.get(0), utils.createAccessor(options.value), allBindingsAccessor, viewModel, bindingContext);
            //input.after($("<del>"));
        }
        else
            handlers.value.init(input.get(0), utils.createAccessor(options.value), allBindingsAccessor, viewModel, bindingContext);
    },
    update: function (element: HTMLElement, valueAccessor: () => any, allBindingsAccessor: () => any, viewModel: any, bindingContext: KnockoutBindingContext) {
        var allBindings = allBindingsAccessor(),
            options = ko.unwrap(valueAccessor()),
            value = ko.unwrap(options.value),
            isEdit = ko.unwrap(options.isEdit || false),
            type = ko.unwrap(options.type || "text"),
            input = $(element).next(),
            del = input.nextAll("del");

        handlers.visible.update(element, utils.createAccessor(!isEdit), allBindingsAccessor, viewModel, bindingContext);
        handlers.visible.update(input.get(0), utils.createAccessor(isEdit), allBindingsAccessor, viewModel, bindingContext);
        handlers.visible.update(del.get(0), utils.createAccessor(isEdit), allBindingsAccessor, viewModel, bindingContext);

        if (type === "checkbox") {
            handlers.visible.update(input.next("del").get(0), utils.createAccessor(isEdit), allBindingsAccessor, viewModel, bindingContext);
            handlers.checked.update(input.get(0), utils.createAccessor(options.value), allBindingsAccessor, viewModel, bindingContext);
        }
        else
            handlers.value.update(input.get(0), utils.createAccessor(options.value), allBindingsAccessor, viewModel, bindingContext);

        if (type === "select" && options.options) {
            handlers.options.update(input.get(0), utils.createAccessor(options.options), allBindingsAccessor, viewModel, bindingContext);

            if (allBindings.optionsText) {
                var optionsText = ko.unwrap(allBindings.optionsText);
                if (typeof (optionsText) === "string") {
                    var _selected = _.find(ko.unwrap(options.options), function (item) {
                        if (allBindings.optionsValue) {
                            var optionsValue = ko.unwrap(allBindings.optionsValue);
                            if (typeof (optionsValue) === "string") {
                                return ko.unwrap(item[optionsValue]) === value;
                            }
                            else if (typeof (optionsValue) === "function") {
                                return ko.unwrap(optionsValue.call(null, item)) === value;
                            }
                        }

                        return item === value;
                    });

                    if (_selected)
                        value = _selected[optionsText];
                }
                else if (typeof (optionsText) === "function") {
                    var _val = optionsText.call(null, value);
                    if (_val)
                        value = _val;
                }
            }
        }

        handlers.text.update(element, utils.createAccessor(value), allBindingsAccessor, viewModel, bindingContext);
    }
};

handlers.clipboard = {
    init: function (element: HTMLElement, valueAccessor: () => any, allBindingsAccessor: () => any, viewModel: any, bindingContext: KnockoutBindingContext) {
        var _value = ko.unwrap(valueAccessor());

        var input = $("<input>").attr({ "class": "input-clipboard", "readonly": "readonly" }).val(_value).hide();

        $(element).after(input).text(_value);

        $(element).on("click", function () {
            $(element).hide();
            input.show().focus().select();
        });

        input
            .on("focusout", function () {
                $(element).show();
                input.hide();
            })
            .on("click", function () {
                $(this).select();
            });
    },
    update: function (element: HTMLElement, valueAccessor: () => any, allBindingsAccessor: () => any, viewModel: any, bindingContext: KnockoutBindingContext) {
        var _value = ko.unwrap(valueAccessor());
        var input = $(element).next();

        $(element).text(_value).show();
        input.val(_value).hide();
    }
};
