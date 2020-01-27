var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { ApolloError } from 'apollo-server-express';
var UniqueError = /** @class */ (function (_super) {
    __extends(UniqueError, _super);
    function UniqueError(message, code, extensions) {
        return _super.call(this, message, code, extensions) || this;
    }
    return UniqueError;
}(ApolloError));
export default UniqueError;
//# sourceMappingURL=UniqueError.js.map