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
    knockout_1.bindingHandlers.filesize = {
        update: function (element, valueAccessor, allBindingsAccessor) {
            var value = knockout_1.unwrap(valueAccessor()), suffix = allBindingsAccessor().suffix || "B";
            knockout_1.bindingHandlers.text.update(element, function () { return simplifySize(value, suffix); });
        }
    };
    var sizes = {
        k: 1024,
        M: 1024 * 1024,
        G: 1024 * 1024 * 1024,
        T: 1024 * 1024 * 1024 * 1024
    };
    function simplifySize(size, suffix) {
        if (!size) {
            return "";
        }
        var parsedSize = typeof size === "string" ? parseInt(size, 10) : size;
        var result = parsedSize, unit = "";
        for (var key in sizes) {
            if (parsedSize > sizes[key]) {
                result = parsedSize / sizes[key];
                unit = key;
                break;
            }
        }
        result = Math.round(result * 100) / 100;
        return result + " " + unit + suffix;
    }
});
