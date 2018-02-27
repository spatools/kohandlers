(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./development", "./filesize", "./helpers", "./jq", "./text", "./ui"], factory);
    }
})(function (require, exports) {
    "use strict";
    exports.__esModule = true;
    require("./development");
    require("./filesize");
    require("./helpers");
    require("./jq");
    require("./text");
    require("./ui");
});
