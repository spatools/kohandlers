import {
    bindingHandlers,
    unwrap,
    MaybeSubscribable
} from "knockout";

bindingHandlers.src = {
    update(element, valueAccessor) {
        var value = unwrap(valueAccessor());

        if (element.getAttribute("src") !== value) {
            element.setAttribute("src", value);
        }
    }
};

bindingHandlers.href = {
    update(element, valueAccessor) {
        const href = unwrap(valueAccessor());
        bindingHandlers.attr.update(element, () => { return { href }; });
    }
};

bindingHandlers.mailto = {
    update(element, valueAccessor) {
        const email = unwrap(valueAccessor());
        bindingHandlers.href.update(element, () => "mailto:" + email);
    }
};

bindingHandlers.classes = {
    update(element, valueAccessor) {
        bindingHandlers.css.update(element, valueAccessor);
    }
};

declare module "knockout" {
    interface BindingHandlers {
        src: {
            update(element: HTMLImageElement, valueAccessor: () => MaybeSubscribable<string>): void;
        };
        href: {
            update(element: HTMLElement, valueAccessor: () => MaybeSubscribable<string>): void;
        };
        mailto: {
            update(element: HTMLElement, valueAccessor: () => MaybeSubscribable<string>): void;
        };
        classes: {
            update(element: HTMLElement, valueAccessor: () => MaybeSubscribable<string>): void;
        };
    }
}
