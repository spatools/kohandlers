/// <reference path="../_definitions.d.ts" />

import ko = require("knockout");
import utils = require("koutils/utils");
var handlers = ko.bindingHandlers;

handlers.src = {
    update: function (element, valueAccessor) {
        var value = ko.unwrap(valueAccessor());

        if (element.src !== value)
            element.setAttribute("src", value);
    }
};

handlers.href = {
    update: function (element: HTMLElement, valueAccessor: () => any, allBindingsAccessor: () => any, viewModel: any, bindingContext: KnockoutBindingContext) {
        var value = ko.unwrap(valueAccessor());
        ko.bindingHandlers.attr.update(element, utils.createAccessor({ href: value }), allBindingsAccessor, viewModel, bindingContext);
    }
};

handlers.mailto = {
    update: function (element: HTMLElement, valueAccessor: () => any, allBindingsAccessor: () => any, viewModel: any, bindingContext: KnockoutBindingContext) {
        var email = ko.unwrap(valueAccessor());
        ko.bindingHandlers.href.update(element, utils.createAccessor("mailto:" + email), allBindingsAccessor, viewModel, bindingContext);
    }
};

handlers.classes = {
    update: function (element: HTMLElement, valueAccessor: () => any, allBindingsAccessor: () => any, viewModel: any, bindingContext: KnockoutBindingContext) {
        ko.bindingHandlers.css.update(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext);
    }
};
