(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "knockout"], factory);
    }
})(function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var knockout_1 = require("knockout");
    knockout_1.bindingHandlers.src = {
        update: function (element, valueAccessor) {
            var value = knockout_1.unwrap(valueAccessor());
            if (element.getAttribute("src") !== value) {
                element.setAttribute("src", value);
            }
        }
    };
    knockout_1.bindingHandlers.href = {
        update: function (element, valueAccessor) {
            var href = knockout_1.unwrap(valueAccessor());
            knockout_1.bindingHandlers.attr.update(element, function () { return { href: href }; });
        }
    };
    knockout_1.bindingHandlers.mailto = {
        update: function (element, valueAccessor) {
            var email = knockout_1.unwrap(valueAccessor());
            knockout_1.bindingHandlers.href.update(element, function () { return "mailto:" + email; });
        }
    };
    knockout_1.bindingHandlers.classes = {
        update: function (element, valueAccessor) {
            knockout_1.bindingHandlers.css.update(element, valueAccessor);
        }
    };
});
