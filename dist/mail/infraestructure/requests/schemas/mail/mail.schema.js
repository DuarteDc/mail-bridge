"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailSchema = void 0;
const zod_1 = require("zod");
class MailSchema {
    static rules() {
        return zod_1.z.object({
            user: zod_1.z.string(),
            password: zod_1.z.string(),
            from: zod_1.z.string().email('please provide a valid email!').min(10).max(255),
            to: zod_1.z.string().email('please provide a valid email!').min(10).max(255),
            subject: zod_1.z.string().min(10).max(255),
            text: zod_1.z.string().min(10).optional(),
            html: zod_1.z
                .string()
                .refine(value => /<[^>]+>/.test(value), {
                message: 'Must contain valid HTML tags'
            })
                .optional()
        });
    }
}
exports.MailSchema = MailSchema;
