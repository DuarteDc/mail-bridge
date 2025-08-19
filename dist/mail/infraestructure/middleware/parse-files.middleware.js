"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParseFilesMiddleware = void 0;
class ParseFilesMiddleware {
    parse(request, _response, next) {
        const files = request.files;
        request.parsedFiles = files.map(file => ({
            filename: file.originalname,
            content: file.buffer,
            contentType: file.mimetype
        }));
        next();
    }
}
exports.ParseFilesMiddleware = ParseFilesMiddleware;
