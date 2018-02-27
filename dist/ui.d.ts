/// <reference types="knockout" />
import { MaybeSubscribable } from "knockout";
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
