"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _Server_instance;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importStar(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const env_plugin_1 = require("../../conf/env.plugin");
class Server {
    constructor() {
        this.router = (0, express_1.Router)();
    }
    static getInstance() {
        if (!__classPrivateFieldGet(_a, _a, "f", _Server_instance)) {
            __classPrivateFieldSet(_a, _a, new _a(), "f", _Server_instance);
            _a.server = (0, express_1.default)();
        }
        return __classPrivateFieldGet(_a, _a, "f", _Server_instance);
    }
    run(apiRouter) {
        return __awaiter(this, void 0, void 0, function* () {
            this.loadMiddlewares();
            _a.server.use(this.healt());
            _a.server.use(apiRouter);
            this.notFound();
            _a.server.listen(env_plugin_1.envs.PORT, () => {
                console.log(`🚀 Server is running on port ${env_plugin_1.envs.PORT}`);
            });
        });
    }
    loadMiddlewares() {
        _a.server.use((0, cors_1.default)());
        _a.server.use((0, helmet_1.default)());
        _a.server.use(this.limitRequestPerUser());
        _a.server.use(express_1.default.json());
        _a.server.use(express_1.default.urlencoded({ extended: true }));
        _a.server.use(body_parser_1.default.urlencoded({ extended: false }));
    }
    limitRequestPerUser(minutes = 10, limit = 100) {
        return (0, express_rate_limit_1.default)({
            windowMs: minutes * 60 * 100,
            limit,
            standardHeaders: 'draft-8',
            legacyHeaders: false
        });
    }
    healt() {
        this.router.get('/ping', this.limitRequestPerUser(5, 100), (__, response) => {
            response.status(200).send('pong');
        });
        return this.router;
    }
    notFound() {
        _a.server.use((request, response) => {
            response
                .status(404)
                .send(`The requested URL ${request.originalUrl} was not found on this server.`);
        });
    }
}
exports.Server = Server;
_a = Server;
_Server_instance = { value: void 0 };
