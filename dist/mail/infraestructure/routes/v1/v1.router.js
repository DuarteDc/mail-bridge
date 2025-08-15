"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mail_router_1 = __importDefault(require("./mail/mail.router"));
const v1Router = (0, express_1.Router)();
v1Router.use('/mail', mail_router_1.default);
exports.default = v1Router;
