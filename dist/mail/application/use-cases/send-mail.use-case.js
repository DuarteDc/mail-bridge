"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendMailUseCase = void 0;
const auto_bind_1 = __importDefault(require("auto-bind"));
class SendMailUseCase {
    constructor(emailService) {
        this.emailService = emailService;
        (0, auto_bind_1.default)(this);
    }
    exec(_a) {
        return __awaiter(this, arguments, void 0, function* ({ from, to, subject, html = '', text = '', user, password, attachments = [] }) {
            try {
                const isAuthenticated = yield this.emailService
                    .auth(user, password)
                    .verify();
                if (!isAuthenticated)
                    throw new Error('Cannot connect to service, user or password are not valid');
                const sent = yield this.emailService
                    .setFrom(from)
                    .setTo(to)
                    .setSubject(subject)
                    .setHtml(html)
                    .setText(text)
                    .setAttachments(attachments)
                    .send();
                if (!sent)
                    throw new Error('Email not send');
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.SendMailUseCase = SendMailUseCase;
