import { Router } from 'express'
import multer from 'multer'

import { SendMailUseCase } from '../../../../application/use-cases/send-mail.use-case'
import { BaseRequest } from '../../../requests/base.request'
import { MailController } from '../../../controllers/v1/mail/mail.controller'
import { EmailService } from '../../../../presentation/email/email.service'
import { MailSchema } from '../../../requests/schemas/mail/mail.schema'

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
