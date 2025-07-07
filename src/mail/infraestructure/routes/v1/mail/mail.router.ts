import { Router } from 'express'
import multer from 'multer'

import { SendMailUseCase } from '@app/application/use-cases/send-mail.use-case'
import { MailController } from '@app/infraestructure/controllers/v1/mail/mail.controller'
import { BaseRequest } from '@app/infraestructure/requests/base.request'
import { MailSchema } from '@app/infraestructure/requests/schemas/mail/mail.schema'
import { EmailService } from '@app/presentation/email/email.service'

const mailRouter = Router()
const uploadManager = multer({ storage: multer.memoryStorage() })

const baseRequest = new BaseRequest()
const mailController = new MailController(
  new SendMailUseCase(new EmailService())
)

mailRouter.post(
  '/send',
  uploadManager.array('attachments'),
  baseRequest.validate(MailSchema.rules()).bind(baseRequest),
  mailController.send
)
export default mailRouter
