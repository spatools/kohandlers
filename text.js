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
    knockout_1.bindingHandlers.limitedText = {
        init: function (element, valueAccessor) {
            var options = knockout_1.unwrap(valueAccessor()), attr = knockout_1.unwrap(options.attr || "text");
            if (attr === "html") {
                return knockout_1.bindingHandlers.html.init();
            }
        },
        update: function (element, valueAccessor) {
            var options = knockout_1.unwrap(valueAccessor()), text = knockout_1.unwrap(options.text), length = knockout_1.unwrap(options.length), suffix = knockout_1.unwrap(options.suffix || "..."), escapeCR = knockout_1.unwrap(options.escapeCR || false), attr = knockout_1.unwrap(options.attr || "text");
            var result = text;
            if (text) {
                if (text.length > length)
                    result = result.substr(0, length) + suffix;
                if (escapeCR) {
                    result = result.replace(new RegExp("\n", "g"), " ").replace(new RegExp("\r", "g"), " ");
                }
            }
            if (attr === "text") {
                knockout_1.bindingHandlers.text.update(element, function () { return result; });
            }
            else if (attr === "html") {
                knockout_1.bindingHandlers.html.update(element, function () { return result; });
            }
            else {
                var obj_1 = (_a = {}, _a[attr] = result, _a);
                knockout_1.bindingHandlers.attr.update(element, function () { return obj_1; });
            }
            var _a;
        }
    };
    knockout_1.bindingHandlers.pad = {
        update: function (element, valueAccessor) {
            var options = knockout_1.unwrap(valueAccessor()), text = String(knockout_1.unwrap(options.text)), length = knockout_1.unwrap(options.length), char = knockout_1.unwrap(options.char || "0"), prefix = knockout_1.unwrap(options.prefix || ""), right = knockout_1.unwrap(options.right || false);
            while (text.length < length) {
                text = right ? text + char : char + text;
            }
            knockout_1.bindingHandlers.text.update(element, function () { return prefix + text; });
        }
    };
    knockout_1.bindingHandlers.format = {
        update: function (element, valueAccessor) {
            var options = knockout_1.unwrap(valueAccessor()), formt = knockout_1.unwrap(options.format), values = knockout_1.unwrap(options.values);
            knockout_1.bindingHandlers.text.update(element, function () { return format(formt, values); });
        }
    };
    function format(text, args) {
        return text.replace(/\{+-?[0-9]+(:[^}]+)?\}+/g, function (tag) {
            var match = tag.match(/(\{+)(-?[0-9]+)(:([^\}]+))?(\}+)/);
            if (!match) {
                return;
            }
            var index = parseInt(match[2], 10);
            if (match[1].length > 1 && match[5].length > 1) {
                return "{" + index + (match[3] || "") + "}";
            }
            var value = args[index];
            if (typeof value === "undefined") {
                value = "";
            }
            else if (typeof value !== "string") {
                value = String(value);
            }
            if (match[3]) {
                switch (match[4]) {
                    case "U":
                        return value.toUpperCase();
                    case "u":
                        return value.toLowerCase();
                    default:
                        var win = window;
                        if (win.Globalize !== "undefined") {
                            win.Globalize.format(value, match[4]);
                        }
                        break;
                }
            }
            return value;
        });
    }
});
