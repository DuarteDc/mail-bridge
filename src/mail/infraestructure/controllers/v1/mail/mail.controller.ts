import { Request, Response } from 'express'
import autoBind from 'auto-bind'

import { SendMailUseCase } from '@app/application/use-cases/send-mail.use-case'
import { SendMailDto } from '@app/application/dtos/send-mail'

export class MailController {
  constructor (private readonly sendMailUseCase: SendMailUseCase) {
    autoBind(this)
  }

  async send (request: Request<{}, {}, SendMailDto>, response: Response) {
    try {
      await this.sendMailUseCase.exec({
        ...request.body,
        attachments: request.parsedFiles
      })

      response.json({ message: 'Email sent successfully' })
    } catch (error: unknown) {
      if (error instanceof Error) {
        response.status(400).json({ error: error!.message })
      } else {
        response.status(500).json({ error: 'Internal Server Error' })
      }
    }
  }
}
