"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
class UniqueError extends apollo_server_express_1.ApolloError {
    constructor(message, code, extensions) {
        super(message, code, extensions);
    }
}
exports.default = UniqueError;
//# sourceMappingURL=UniqueError.js.map