import {
    bindingHandlers,
    unwrap
} from "knockout";

bindingHandlers.debug = {
    update(element, valueAccessor) {
        const options = unwrap(valueAccessor());
        let message = "Debug Binding",
            value = options;

        if (options.message && options.value) {
            value = unwrap(options.value);
            message = unwrap(options.message) || "Debug Binding";
        }

        console.log(message, value);
    }
};

bindingHandlers.console = {
    update(element, valueAccessor) {
        console.log(unwrap(valueAccessor()));
    }
};

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
