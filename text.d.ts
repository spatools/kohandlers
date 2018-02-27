/// <reference types="knockout" />
declare module "knockout" {
    interface BindingHandlers {
        limitedText: {
            init(element: Node, valueAccessor: () => MaybeSubscribable<LimitedTextOptions>): void;
            update(element: Node, valueAccessor: () => MaybeSubscribable<LimitedTextOptions>): void;
        };
        pad: {
            update(element: Node, valueAccessor: () => MaybeSubscribable<PadOptions>): void;
        };
        format: {
            update(element: Node, valueAccessor: () => MaybeSubscribable<FormatOptions>): void;
        };
    }
}
export interface LimitedTextOptions {
    text: string;
    length: number;
    attr?: string | null;
    suffix?: string | null;
    escapeCR?: boolean | null;
}
export interface PadOptions {
    text: string | number;
    length: number;
    char?: string | null;
    prefix?: string | null;
    right?: boolean | null;
}
export interface FormatOptions {
    format: string;
    values: any[];
}
