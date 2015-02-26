define(["require", "exports", "knockout", "koutils/utils"], function (require, exports, ko, utils) {
    var handlers = ko.bindingHandlers;
    var sizes = {
        k: 1024,
        M: 1024 * 1024,
        G: 1024 * 1024 * 1024,
        T: 1024 * 1024 * 1024 * 1024
    };
    function simplifySize(size, suffix) {
        if (suffix === void 0) { suffix = ""; }
        if (!size) {
            return "";
        }
        var _size = parseInt(size, 10), result = _size, unit = "";
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
        update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var value = ko.unwrap(valueAccessor()), suffix = allBindingsAccessor().suffix || "B";
            ko.bindingHandlers.text.update(element, utils.createAccessor(simplifySize(value, suffix)), allBindingsAccessor, viewModel, bindingContext);
        }
    };
});
