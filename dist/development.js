define(["require", "exports", "knockout"], function (require, exports, ko) {
    var handlers = ko.bindingHandlers;
    handlers.debug = {
        update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var options = ko.unwrap(valueAccessor()), message = "Debug Binding", value = options;
            if (options.message && options.value) {
                value = ko.unwrap(options.value);
                message = ko.unwrap(options.message) || "Debug Binding";
            }
            console.log(message, value);
        }
    };
    handlers.console = {
        update: function (element, valueAccessor) {
            console.log(ko.unwrap(valueAccessor()));
        }
    };
});
