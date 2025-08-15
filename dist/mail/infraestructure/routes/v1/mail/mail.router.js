"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const send_mail_use_case_1 = require("../../../../application/use-cases/send-mail.use-case");
const base_request_1 = require("../../../requests/base.request");
const mail_controller_1 = require("../../../controllers/v1/mail/mail.controller");
const email_service_1 = require("../../../../presentation/email/email.service");
const mail_schema_1 = require("../../../requests/schemas/mail/mail.schema");
const mailRouter = (0, express_1.Router)();
const uploadManager = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
const baseRequest = new base_request_1.BaseRequest();
const mailController = new mail_controller_1.MailController(new send_mail_use_case_1.SendMailUseCase(new email_service_1.EmailService()));
mailRouter.post('/send', uploadManager.array('attachments'), baseRequest.validate(mail_schema_1.MailSchema.rules()).bind(baseRequest), mailController.send);
exports.default = mailRouter;
