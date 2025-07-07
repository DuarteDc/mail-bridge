import { NextFunction, Request } from 'express'

export class ParseFilesMiddleware {
  parse (request: Request, next: NextFunction) {
    const files = request.files as Express.Multer.File[]
    request.parsedFiles = files.map(file => ({
      filename: file.originalname,
      content: file.buffer,
      contentType: file.mimetype
    }))
    next()
  }
}
