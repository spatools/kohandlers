define(["require", "exports", "knockout", "koutils/utils"], function (require, exports, ko, utils) {
    var handlers = ko.bindingHandlers;
    handlers.src = {
        update: function (element, valueAccessor) {
            var value = ko.unwrap(valueAccessor());
            if (element.src !== value)
                element.setAttribute("src", value);
        }
    };
    handlers.href = {
        update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var value = ko.unwrap(valueAccessor());
            ko.bindingHandlers.attr.update(element, utils.createAccessor({ href: value }), allBindingsAccessor, viewModel, bindingContext);
        }
    };
    handlers.mailto = {
        update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var email = ko.unwrap(valueAccessor());
            ko.bindingHandlers.href.update(element, utils.createAccessor("mailto:" + email), allBindingsAccessor, viewModel, bindingContext);
        }
    };
    handlers.classes = {
        update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            ko.bindingHandlers.css.update(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext);
        }
    };
});
