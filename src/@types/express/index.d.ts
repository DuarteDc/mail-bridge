import { AttachmentsDto } from '@app/application/dtos/send-mail'

declare global {
  namespace Express {
    export interface Request {
      parsedFiles: AttachmentsDto[]
    }
  }
}
