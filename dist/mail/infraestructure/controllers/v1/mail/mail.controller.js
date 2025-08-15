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
exports.MailController = void 0;
const auto_bind_1 = __importDefault(require("auto-bind"));
class MailController {
    constructor(sendMailUseCase) {
        this.sendMailUseCase = sendMailUseCase;
        (0, auto_bind_1.default)(this);
    }
    send(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.sendMailUseCase.exec(Object.assign(Object.assign({}, request.body), { attachments: request.parsedFiles }));
                response.json({ message: 'Email sent successfully' });
            }
            catch (error) {
                if (error instanceof Error) {
                    response.status(400).json({ error: error.message });
                }
                else {
                    response.status(500).json({ error: 'Internal Server Error' });
                }
            }
        });
    }
}
exports.MailController = MailController;
