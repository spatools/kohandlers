import {
    bindingHandlers,
    unwrap,
} from "knockout";

bindingHandlers.filesize = {
    update(element, valueAccessor, allBindingsAccessor) {
        const
            value = unwrap(valueAccessor()),
            suffix = allBindingsAccessor().suffix || "B";

        bindingHandlers.text.update(element, () => simplifySize(value, suffix));
    }
};

declare module "knockout" {
    interface BindingHandlers {
        filesize: {
            update(element: Node, valueAccessor: () => MaybeSubscribable<string | number>, allBindingsAccessor: AllBindingsAccessor): void;
        };
    }
}

const sizes = {
    k: 1024,
    M: 1024 * 1024,
    G: 1024 * 1024 * 1024,
    T: 1024 * 1024 * 1024 * 1024
} as { [key: string]: number };

function simplifySize(size: string | number, suffix: string): string {
    if (!size) {
        return "";
    }

    const parsedSize = typeof size === "string" ? parseInt(size, 10) : size;
    let result = parsedSize,
        unit = "";

    for (let key in sizes) {
        if (parsedSize > sizes[key]) {
            result = parsedSize / sizes[key];
            unit = key;
            break;
        }
    }

    result = Math.round(result * 100) / 100;
    return `${result} ${unit}${suffix}`;
}
