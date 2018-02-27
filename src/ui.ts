import {
    bindingHandlers,
    unwrap,

    MaybeSubscribable
} from "knockout";

import * as $ from "jquery";

bindingHandlers.editable = {
    init(element, valueAccessor, allBindingsAccessor) {
        var options = unwrap(valueAccessor()),
            value = unwrap(options.value),
            isEdit = unwrap(options.isEdit || false),
            type = unwrap(options.type || "text"),
            input = null;

        if (type === "textarea") {
            input = $("<textarea>").attr({ "class": "textarea-editable" });
        } else if (type === "select") {
            input = $("<select>").attr({ "class": "select-editable" });
        } else {
            input = $("<input>").attr({ "class": "input-editable", type: type });
        }

        if (element.hasAttribute("id")) {
            input.attr("name", element.getAttribute("id"));
        }

        $(element).after(input);
        input.after($("<del>"));

        if (type === "checkbox") {
            return bindingHandlers.checked.init(input.get(0), () => options.value, allBindingsAccessor);
            //input.after($("<del>"));
        }
        else {
            return bindingHandlers.value.init(input.get(0), () => options.value, allBindingsAccessor);
        }
    },
    update(element, valueAccessor, allBindingsAccessor) {
        const
            allBindings = allBindingsAccessor(),
            options = unwrap(valueAccessor()),
            isEdit = unwrap(options.isEdit || false),
            type = unwrap(options.type || "text"),
            input = $(element).next(),
            del = input.nextAll("del");

        bindingHandlers.visible.update(element, () => !isEdit);
        bindingHandlers.visible.update(input.get(0), () => isEdit);
        bindingHandlers.visible.update(del.get(0), () => isEdit);

        if (type === "checkbox") {
            bindingHandlers.visible.update(input.next("del").get(0), () => isEdit);
            // bindingHandlers.checked.update(input.get(0), () => options.value, allBindingsAccessor);
        }
        else
            bindingHandlers.value.update(input.get(0), () => options.value, allBindingsAccessor);

        let value = unwrap(options.value);
        if (type === "select" && options.options) {
            bindingHandlers.options.update(input.get(0), () => options.options, allBindingsAccessor);

            if (allBindings.optionsText) {
                var optionsText = unwrap(allBindings.optionsText),
                    selectOptions = unwrap(options.options);

                if (typeof (optionsText) === "string") {
                    var _selected = selectOptions.filter(item => {
                        if (allBindings.optionsValue) {
                            var optionsValue = unwrap(allBindings.optionsValue);
                            if (typeof (optionsValue) === "string") {
                                return unwrap(item[optionsValue]) === value;
                            }
                            else if (typeof (optionsValue) === "function") {
                                return unwrap(optionsValue.call(null, item)) === value;
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

        bindingHandlers.text.update(element, () => value);
    }
};

bindingHandlers.clipboard = {
    init(element, valueAccessor) {
        const
            value = unwrap(valueAccessor()),
            input = $("<input>").attr({ "class": "input-clipboard", "readonly": "readonly" }).val(value).hide();

        $(element).after(input).text(value);

        $(element).on("click", () => {
            $(element).hide();
            input.show().focus().select();
        });

        input
            .on("focusout", () => {
                $(element).show();
                input.hide();
            })
            .on("click", () => {
                $(this).select();
            });
    },
    update(element, valueAccessor) {
        const
            value = unwrap(valueAccessor()),
            input = $(element).next();

        $(element).text(value).show();
        input.val(value).hide();
    }
};

declare module "knockout" {
    interface BindingHandlers {
        editable: {
            init(element: HTMLElement, valueAccessor: () => MaybeSubscribable<EditableOptions>, allBindingsAccessor: AllBindingsAccessor): void;
            update(element: HTMLElement, valueAccessor: () => MaybeSubscribable<EditableOptions>, allBindingsAccessor: AllBindingsAccessor): void;
        };
        clipboard: {
            init(element: HTMLElement, valueAccessor: () => MaybeSubscribable<string>): void;
            update(element: HTMLElement, valueAccessor: () => MaybeSubscribable<string>): void;
        };
    }
}

export interface EditableOptions {
    value: string;
    isEdit?: MaybeSubscribable<boolean>;
    type?: MaybeSubscribable<string>;
    options?: MaybeSubscribable<any[]>;
}
