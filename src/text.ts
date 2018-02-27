import {
    unwrap,
    bindingHandlers
} from "knockout";

bindingHandlers.limitedText = {
    init(element, valueAccessor) {
        const
            options = unwrap(valueAccessor()),
            attr = unwrap(options.attr || "text");

        if (attr === "html") {
            return bindingHandlers.html.init();
        }
    },
    update(element, valueAccessor) {
        const
            options = unwrap(valueAccessor()),
            text = unwrap(options.text),
            length = unwrap(options.length),
            suffix = unwrap(options.suffix || "..."),
            escapeCR = unwrap(options.escapeCR || false),
            attr = unwrap(options.attr || "text");

        let result = text;
        if (text) {
            if (text.length > length)
                result = result.substr(0, length) + suffix;
            if (escapeCR) {
                result = result.replace(new RegExp("\n", "g"), " ").replace(new RegExp("\r", "g"), " ");
            }
        }

        if (attr === "text") {
            bindingHandlers.text.update(element, () => result);
        }
        else if (attr === "html") {
            bindingHandlers.html.update(element, () => result);
        }
        else {
            const obj = { [attr]: result };
            bindingHandlers.attr.update(element as HTMLElement, () => obj);
        }
    }
};

bindingHandlers.pad = {
    update(element, valueAccessor) {
        var options = unwrap(valueAccessor()),
            text = String(unwrap(options.text)),
            length = unwrap(options.length),
            char = unwrap(options.char || "0"),
            prefix = unwrap(options.prefix || ""),
            right = unwrap(options.right || false);

        while (text.length < length) {
            text = right ? text + char : char + text;
        }

        bindingHandlers.text.update(element, () => prefix + text);
    }
};

bindingHandlers.format = {
    update(element, valueAccessor) {
        const
            options = unwrap(valueAccessor()),
            formt = unwrap(options.format),
            values = unwrap(options.values);

        bindingHandlers.text.update(element, () => format(formt, values));
    }
};

function format(text: string, args: any[]): string {
    return text.replace(/\{+-?[0-9]+(:[^}]+)?\}+/g, tag => {
        const match = tag.match(/(\{+)(-?[0-9]+)(:([^\}]+))?(\}+)/);
        if (!match) {
            return;
        }

        const index = parseInt(match[2], 10);
        if (match[1].length > 1 && match[5].length > 1) {
            return "{" + index + (match[3] || "") + "}";
        }

        let value = args[index];
        if (typeof value === "undefined") {
            value = "";
        } else if (typeof value !== "string") {
            value = String(value);
        }

        if (match[3]) {
            switch (match[4]) {
                case "U":
                    return value.toUpperCase();
                case "u":
                    return value.toLowerCase();
                default:
                    const win = window as any;
                    if (win.Globalize !== "undefined") {
                        win.Globalize.format(value, match[4]);
                    }
                    break;
            }
        }

        return value;
    });
}

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
