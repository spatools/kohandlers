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
    knockout_1.bindingHandlers.debug = {
        update: function (element, valueAccessor) {
            var options = knockout_1.unwrap(valueAccessor());
            var message = "Debug Binding", value = options;
            if (options.message && options.value) {
                value = knockout_1.unwrap(options.value);
                message = knockout_1.unwrap(options.message) || "Debug Binding";
            }
            console.log(message, value);
        }
    };
    knockout_1.bindingHandlers.console = {
        update: function (element, valueAccessor) {
            console.log(knockout_1.unwrap(valueAccessor()));
        }
    };
});
