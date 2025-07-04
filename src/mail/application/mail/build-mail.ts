import { MailPort } from '@/mail/core/ports/mail/mail.port'

export class BuildMail {
  constructor (private readonly MailTransport: MailPort) {}

  exec ({}) {
    this.MailTransport.setFrom('xs')
  }
}
