import {
    bindingHandlers,
    unwrap,
    dataFor,
    isWriteableObservable,

    MaybeSubscribable
} from "knockout";

import * as $ from "jquery";

bindingHandlers.on = {
    init(element, valueAccessor) {
        const
            handlers = unwrap(valueAccessor()),
            $element = $(element);

        $element.on(handlers as any);
    }
};

bindingHandlers.hover = {
    init(element, valueAccessor, allBindingsAccessor, viewModel) {
        const
            val = unwrap(valueAccessor()),
            options = typeof val === "string" ?
                { classes: val } :
                val;

        $(element)
            .on("mouseover", e => {
                options.enter && options.enter.call(viewModel, viewModel, e.originalEvent);

                if (options.classes)
                    bindingHandlers.css.update(element, () => options.classes as string);
            })
            .on("mouseout", e => {
                options.leave && options.leave.call(viewModel, viewModel, e.originalEvent);

                if (options.classes)
                    bindingHandlers.css.update(element, () => "");
            });
    }
};

bindingHandlers.toggle = {
    init(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        const
            value = valueAccessor(),
            rawOptions = unwrap(value),

            options = typeof rawOptions === "boolean" ?
                { value: value as MaybeSubscribable<boolean> } :
                rawOptions,

            event = unwrap(options.event) || "click",
            eventValue = {} as { [key: string]: Function; };

        eventValue[event] = handler;
        bindingHandlers.event.init(element, () => eventValue, allBindingsAccessor, viewModel, bindingContext);

        function handler() {
            if (isWriteableObservable(options.value))
                options.value(!options.value());
        }
    }
};

bindingHandlers.dblclick = {
    init(element, valueAccessor, allBindingsAccessor, viewModel) {
        var fn = valueAccessor();

        $(element).dblclick(function (e) {
            const data = dataFor(this);
            fn.call(viewModel, data, e);
        });
    }
};

bindingHandlers.toggleClass = {
    init(element, valueAccessor) {
        const
            value = unwrap(valueAccessor()),
            off = unwrap(value.off),
            on = unwrap(value.on),
            down = unwrap(value.down),
            useParent = unwrap(value.useParent),

            target = useParent ?
                $(element).parent().get(0) :
                element;

        $(target).data("ko-toggle-class", {
            off: off,
            on: on,
            down: down,
        });

        $(target).on({
            mouseenter() {
                bindingHandlers.css.update(element, createToggleClassAccessor(this, false, true, false));
            },
            mouseout() {
                bindingHandlers.css.update(element, createToggleClassAccessor(this, true, false, false));
            },
            mousedown() {
                bindingHandlers.css.update(element, createToggleClassAccessor(this, false, false, true));
            },
            mouseup() {
                bindingHandlers.css.update(element, createToggleClassAccessor(this, false, true, false));
            }
        });
    },
    update(element, valueAccessor) {
        const
            value = unwrap(valueAccessor()),
            off = unwrap(value.off),
            on = unwrap(value.on),
            down = unwrap(value.down),
            useParent = unwrap(value.useParent),

            target = useParent ?
                $(element).parent().get(0) :
                element;

        $(target).data("ko-toggle-class", {
            off: off,
            on: on,
            down: down
        });

        bindingHandlers.css.update(element, createToggleClassAccessor(target, true, false, false));
    }
};

declare module "knockout" {
    interface BindingHandlers {
        on: {
            init(element: HTMLElement, valueAccessor: () => MaybeSubscribable<OnHandlers>): void;
        };
        hover: {
            init(element: HTMLElement, valueAccessor: () => MaybeSubscribable<string | HoverOptions<typeof viewModel>>, allBindingsAccessor: AllBindingsAccessor, viewModel: any): void;
        };
        toggle: {
            init(element: HTMLElement, valueAccessor: () => MaybeSubscribable<boolean | ToggleOptions>, allBindingsAccessor: AllBindingsAccessor, viewModel: any, bindingContext: BindingContext<any>): void;
        };
        dblclick: {
            init(element: HTMLElement, valueAccessor: () => Function, allBindingsAccessor: AllBindingsAccessor, viewModel: any): void;
        };
        toggleClass: {
            init(element: HTMLElement, valueAccessor: () => MaybeSubscribable<ToggleClassOptions>): void;
            update(element: HTMLElement, valueAccessor: () => MaybeSubscribable<ToggleClassOptions>): void;
        };
    }
}

export type OnHandlers = { [key: string]: Function; };

export interface HoverOptions<T = any> {
    enter?: (this: T, viewModel: T, event: Event) => any;
    leave?: (this: T, viewModel: T, event: Event) => any;
    classes?: string;
}

export interface ToggleOptions {
    value: MaybeSubscribable<boolean>;
    event?: MaybeSubscribable<string | undefined | null>;
}

export interface ToggleClassOptions {
    on: MaybeSubscribable<string>;
    off: MaybeSubscribable<string>;
    down: MaybeSubscribable<string>;
    useParent?: MaybeSubscribable<boolean | undefined | null>;
}

function appendClasses(obj: any, classes: string, value: boolean): void {
    classes.split(/\s+/g).forEach(cssClass => {
        if (!obj[cssClass])
            obj[cssClass] = value;
    });
}

function createToggleClassAccessor(element: HTMLElement, off: boolean, on: boolean, down: boolean): () => any {
    var data = $(element).data("ko-toggle-class"),
        result = {};

    if (data.off === data.on)
        appendClasses(result, data.off, off || on);
    else {
        appendClasses(result, data.off, off);
        appendClasses(result, data.on, on);
    }

    if (data.down !== data.off && data.down !== data.up)
        appendClasses(result, data.down, down);

    return () => result;
}
