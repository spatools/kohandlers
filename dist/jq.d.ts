/// <reference types="knockout" />
import { MaybeSubscribable } from "knockout";
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
export declare type OnHandlers = {
    [key: string]: Function;
};
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
