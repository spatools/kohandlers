/// <reference path="../../../typings/knockout/knockout.d.ts" />

interface KnockoutBindingHandlers {
    command: KnockoutBindingHandler;
    loader: KnockoutBindingHandler;
    limitedText: KnockoutBindingHandler;
    pad: KnockoutBindingHandler;
    format: KnockoutBindingHandler;
    filesize: KnockoutBindingHandler;
    src: KnockoutBindingHandler;
    href: KnockoutBindingHandler;
    mailto: KnockoutBindingHandler;
    classes: KnockoutBindingHandler;
    on: KnockoutBindingHandler;
    hover: KnockoutBindingHandler;
    toggle: KnockoutBindingHandler;
    toggleClass: KnockoutBindingHandler;
    dblclick: KnockoutBindingHandler;
    editable: KnockoutBindingHandler;
    clipboard: KnockoutBindingHandler;
    debug: KnockoutBindingHandler;
    console: KnockoutBindingHandler;
}

declare module "koutils/all" {
var result: boolean;
export = result;
}

declare module "koutils/development" {
}

declare module "koutils/filesize" {
}

declare module "koutils/helpers" {
}

declare module "koutils/jquery" {
}

declare module "koutils/text" {
}

declare module "koutils/ui" {
}
