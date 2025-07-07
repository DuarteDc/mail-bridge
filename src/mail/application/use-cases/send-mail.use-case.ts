import { EmailService } from '@app/presentation/email/email.service'
import { SendMailDto } from '../dtos/send-mail'
import autoBind from 'auto-bind'

export class SendMailUseCase {
  constructor (private readonly emailService: EmailService) {
    autoBind(this)
  }

  async exec ({
    from,
    to,
    subject,
    html = '',
    text = '',
    user,
    password,
    attachments = []
  }: SendMailDto) {
    try {
      const isAuthenticated = await this.emailService
        .auth(user, password)
        .verify()

      if (!isAuthenticated)
        throw new Error(
          'Cannot connect to service, user or password are not valid'
        )

      const sent = await this.emailService
        .setFrom(from)
        .setTo(to)
        .setSubject(subject)
        .setHtml(html)
        .setText(text)
        .setAttachments(attachments)
        .send()

      if (!sent) throw new Error('Email not send')
    } catch (error) {
      throw error
    }
  }
}
