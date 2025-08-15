"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRequest = void 0;
const zod_1 = require("zod");
const auto_bind_1 = __importDefault(require("auto-bind"));
class BaseRequest {
    constructor() {
        (0, auto_bind_1.default)(this);
    }
    validate(schema) {
        return (request, response, next) => {
            try {
                if (!request.body) {
                    response.status(400).json({ message: 'Invalid body request' });
                    return;
                }
                schema.parse(request.body);
                next();
            }
            catch (error) {
                if (error instanceof zod_1.ZodError) {
                    const errorMessages = error.errors.map(issue => {
                        return {
                            message: `${issue.path.join('.')} is ${issue.message}`
                        };
                    });
                    response
                        .status(400)
                        .json({ error: 'Invalid data', details: errorMessages });
                }
                else {
                    response.status(500).json({ error: 'Internal Server Error' });
                }
            }
        };
    }
}
exports.BaseRequest = BaseRequest;
