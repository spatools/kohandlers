/// <reference types="knockout" />
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
export {};
