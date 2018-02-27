(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "knockout", "jquery"], factory);
    }
})(function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var knockout_1 = require("knockout");
    var $ = require("jquery");
    knockout_1.bindingHandlers.editable = {
        init: function (element, valueAccessor, allBindingsAccessor) {
            var options = knockout_1.unwrap(valueAccessor()), value = knockout_1.unwrap(options.value), isEdit = knockout_1.unwrap(options.isEdit || false), type = knockout_1.unwrap(options.type || "text"), input = null;
            if (type === "textarea") {
                input = $("<textarea>").attr({ "class": "textarea-editable" });
            }
            else if (type === "select") {
                input = $("<select>").attr({ "class": "select-editable" });
            }
            else {
                input = $("<input>").attr({ "class": "input-editable", type: type });
            }
            if (element.hasAttribute("id")) {
                input.attr("name", element.getAttribute("id"));
            }
            $(element).after(input);
            input.after($("<del>"));
            if (type === "checkbox") {
                return knockout_1.bindingHandlers.checked.init(input.get(0), function () { return options.value; }, allBindingsAccessor);
                //input.after($("<del>"));
            }
            else {
                return knockout_1.bindingHandlers.value.init(input.get(0), function () { return options.value; }, allBindingsAccessor);
            }
        },
        update: function (element, valueAccessor, allBindingsAccessor) {
            var allBindings = allBindingsAccessor(), options = knockout_1.unwrap(valueAccessor()), isEdit = knockout_1.unwrap(options.isEdit || false), type = knockout_1.unwrap(options.type || "text"), input = $(element).next(), del = input.nextAll("del");
            knockout_1.bindingHandlers.visible.update(element, function () { return !isEdit; });
            knockout_1.bindingHandlers.visible.update(input.get(0), function () { return isEdit; });
            knockout_1.bindingHandlers.visible.update(del.get(0), function () { return isEdit; });
            if (type === "checkbox") {
                knockout_1.bindingHandlers.visible.update(input.next("del").get(0), function () { return isEdit; });
                // bindingHandlers.checked.update(input.get(0), () => options.value, allBindingsAccessor);
            }
            else
                knockout_1.bindingHandlers.value.update(input.get(0), function () { return options.value; }, allBindingsAccessor);
            var value = knockout_1.unwrap(options.value);
            if (type === "select" && options.options) {
                knockout_1.bindingHandlers.options.update(input.get(0), function () { return options.options; }, allBindingsAccessor);
                if (allBindings.optionsText) {
                    var optionsText = knockout_1.unwrap(allBindings.optionsText), selectOptions = knockout_1.unwrap(options.options);
                    if (typeof (optionsText) === "string") {
                        var _selected = selectOptions.filter(function (item) {
                            if (allBindings.optionsValue) {
                                var optionsValue = knockout_1.unwrap(allBindings.optionsValue);
                                if (typeof (optionsValue) === "string") {
                                    return knockout_1.unwrap(item[optionsValue]) === value;
                                }
                                else if (typeof (optionsValue) === "function") {
                                    return knockout_1.unwrap(optionsValue.call(null, item)) === value;
                                }
                            }
                            return item === value;
                        })[0];
                        if (_selected)
                            value = _selected[optionsText];
                    }
                    else if (typeof optionsText === "function") {
                        var _val = optionsText.call(null, value);
                        if (_val)
                            value = _val;
                    }
                }
            }
            knockout_1.bindingHandlers.text.update(element, function () { return value; });
        }
    };
    knockout_1.bindingHandlers.clipboard = {
        init: function (element, valueAccessor) {
            var _this = this;
            var value = knockout_1.unwrap(valueAccessor()), input = $("<input>").attr({ "class": "input-clipboard", "readonly": "readonly" }).val(value).hide();
            $(element).after(input).text(value);
            $(element).on("click", function () {
                $(element).hide();
                input.show().focus().select();
            });
            input
                .on("focusout", function () {
                $(element).show();
                input.hide();
            })
                .on("click", function () {
                $(_this).select();
            });
        },
        update: function (element, valueAccessor) {
            var value = knockout_1.unwrap(valueAccessor()), input = $(element).next();
            $(element).text(value).show();
            input.val(value).hide();
        }
    };
});
