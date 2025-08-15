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
exports.EmailService = void 0;
const auto_bind_1 = __importDefault(require("auto-bind"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const env_plugin_1 = require("../../../conf/env.plugin");
class EmailService {
    constructor() {
        this.from = '';
        this.to = '';
        this.subject = '';
        this.text = '';
        this.html = '';
        this.attachments = [];
        (0, auto_bind_1.default)(this);
    }
    auth(user, password) {
        this.transporter = nodemailer_1.default.createTransport({
            host: env_plugin_1.envs.MAILER_SERVICE,
            secure: false,
            auth: {
                user: user,
                pass: password
            }
        });
        return this;
    }
    send() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.transporter)
                throw new Error('Unauthenticated');
            try {
                yield this.transporter.sendMail({
                    from: this.from,
                    to: this.to,
                    subject: this.subject,
                    html: this.html,
                    text: this.text,
                    attachments: this.attachments.length > 0 ? this.attachments : undefined
                });
                return true;
            }
            catch (error) {
                console.log(error);
                return false;
            }
        });
    }
    verify() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.transporter)
                throw new Error('Unauthenticated');
            try {
                return yield this.transporter.verify();
            }
            catch (_a) {
                return false;
            }
        });
    }
    setFrom(from) {
        this.from = from;
        return this;
    }
    setTo(to) {
        this.to = to;
        return this;
    }
    setSubject(subject) {
        this.subject = subject;
        return this;
    }
    setText(text) {
        this.text = text;
        return this;
    }
    setHtml(html) {
        this.html = html;
        return this;
    }
    setAttachments(files) {
        if (Array.isArray(files)) {
            this.attachments = files;
        }
        else {
            this.attachments = [files];
        }
        return this;
    }
}
exports.EmailService = EmailService;
