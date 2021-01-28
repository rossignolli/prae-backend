"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Error = /** @class */ (function () {
    function Error(message, statusCode) {
        if (statusCode === void 0) { statusCode = 400; }
        this.message = message;
        this.statusCode = statusCode;
    }
    return Error;
}());
exports.default = Error;
