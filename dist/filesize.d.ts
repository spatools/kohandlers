/// <reference types="knockout" />
declare module "knockout" {
    interface BindingHandlers {
        filesize: {
            update(element: Node, valueAccessor: () => MaybeSubscribable<string | number>, allBindingsAccessor: AllBindingsAccessor): void;
        };
    }
}
export {};
