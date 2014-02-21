define(["require", "exports", "knockout", "underscore", "koutils/utils"], function(require, exports, ko, _, utils) {
    var handlers = ko.bindingHandlers;

    handlers.limitedText = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var options = ko.unwrap(valueAccessor()), attr = ko.unwrap(options.attr || "text");

            if (attr === "html")
                handlers.html.init(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext);
        },
        update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var options = ko.unwrap(valueAccessor()), text = ko.unwrap(options.text), length = ko.unwrap(options.length), suffix = ko.unwrap(options.suffix || "..."), escapeCR = ko.unwrap(options.escapeCR || false), attr = ko.unwrap(options.attr || "text");

            var result = text;
            if (text) {
                if (text.length > length)
                    result = result.substr(0, length) + suffix;
                if (escapeCR) {
                    result = result.replace(new RegExp("\n", "g"), " ").replace(new RegExp("\r", "g"), " ");
                }
            }

            if (attr === "text") {
                handlers.text.update(element, utils.createAccessor(result), allBindingsAccessor, viewModel, bindingContext);
            } else if (attr === "html") {
                handlers.html.update(element, utils.createAccessor(result), allBindingsAccessor, viewModel, bindingContext);
            } else {
                var obj = {};
                obj[attr] = result;
                handlers.attr.update(element, utils.createAccessor(obj), allBindingsAccessor, viewModel, bindingContext);
            }
        }
    };

    handlers.pad = {
        update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var options = ko.unwrap(valueAccessor()), text = String(ko.unwrap(options.text)), length = ko.unwrap(options.length), char = ko.unwrap(options.char || "0"), prefix = ko.unwrap(options.prefix || ""), right = ko.unwrap(options.right || false);

            while (text.length < length) {
                text = right ? text + char : char + text;
            }

            handlers.text.update(element, utils.createAccessor(prefix + text), allBindingsAccessor, viewModel, bindingContext);
        }
    };

    handlers.format = {
        update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var options = ko.unwrap(valueAccessor()), format = ko.unwrap(options.format), values = ko.unwrap(options.values), args = [format];

            _.each(values, function (value) {
                args.push(ko.unwrap(value));
            });

            handlers.text.update(element, utils.createAccessor(utils.format.apply(null, args)), allBindingsAccessor, viewModel, bindingContext);
        }
    };
});
