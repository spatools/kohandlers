/// <reference path="../_definitions.d.ts" />

import ko = require("knockout");
import utils = require("koutils/utils");
var handlers = ko.bindingHandlers;
var sizes = {
    k: 1024,
    M: 1024 * 1024,
    G: 1024 * 1024 * 1024,
    T: 1024 * 1024 * 1024 * 1024
};

function simplifySize(size: string, suffix: string = ""): string {
    if (!size) {
        return "";
    }

    var _size: number = parseInt(size, 10),
        result: number = _size,
        unit: string = "";

    for (var key in sizes) {
        if (size > sizes[key]) {
            result = _size / sizes[key];
            unit = key;
            break;
        }
    }

    result = Math.round(result * 100) / 100;
    return utils.format("{0} {1}{2}", result, unit, suffix);
}

handlers.filesize = {
    update: function (element: HTMLElement, valueAccessor: () => any, allBindingsAccessor: () => any, viewModel: any, bindingContext: KnockoutBindingContext) {
        var value = ko.unwrap(valueAccessor()),
            suffix = allBindingsAccessor().suffix || "B";

        ko.bindingHandlers.text.update(element, utils.createAccessor(simplifySize(value, suffix)), allBindingsAccessor, viewModel, bindingContext);
    }
};
