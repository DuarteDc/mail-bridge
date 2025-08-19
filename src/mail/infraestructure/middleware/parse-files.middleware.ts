import { NextFunction, Request, Response } from 'express'

export class ParseFilesMiddleware {
  parse (request: Request, _response: Response, next: NextFunction) {
    const files = request.files as Express.Multer.File[]
    request.parsedFiles = files.map(file => ({
      filename: file.originalname,
      content: file.buffer,
      contentType: file.mimetype
    }))
    next()
  }
}
