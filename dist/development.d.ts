export interface DebugOptions {
    message?: string;
    value: any;
}
declare module "knockout" {
    interface BindingHandlers {
        debug: {
            update(element: Node, valueAccessor: () => any): void;
        };
        console: {
            update(element: Node, valueAccessor: () => any): void;
        };
    }
}
