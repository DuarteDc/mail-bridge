import autoBind from 'auto-bind'
import Transport from 'nodemailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport'
import { envs } from '@env/env.plugin'

import { MailPort } from '@app/core/ports/mail/mail.port'
import { AttachmentsDto } from '@app/application/dtos/send-mail'

export class EmailService implements MailPort {
  constructor () {
    autoBind(this)
  }
  private transporter:
    | Transport.Transporter<
        SMTPTransport.SentMessageInfo,
        SMTPTransport.Options
      >
    | undefined

  private from: string = ''
  private to: string = ''
  private subject: string = ''
  private text: string = ''
  private html: string = ''
  private attachments: AttachmentsDto[] = []

  auth (user: string, password: string): this {
    this.transporter = Transport.createTransport({
      host: envs.MAILER_SERVICE,
      secure: false,
      auth: {
        user: user,
        pass: password
      }
    })
    return this
  }

  async send (): Promise<boolean> {
    if (!this.transporter) throw new Error('Unauthenticated')
    try {
      await this.transporter.sendMail({
        from: this.from,
        to: this.to,
        subject: this.subject,
        html: this.html,
        text: this.text,
        attachments: this.attachments.length > 0 ? this.attachments : undefined
      })
      return true
    } catch (error) {
      return false
    }
  }

  async verify (): Promise<boolean> {
    if (!this.transporter) throw new Error('Unauthenticated')

    try {
      await this.transporter.verify()
      return true
    } catch {
      return false
    }
  }

  setFrom (from: string): this {
    this.from = from
    return this
  }
  setTo (to: string): this {
    this.to = to
    return this
  }

  setSubject (subject: string): this {
    this.subject = subject
    return this
  }

  setText (text: string): this {
    this.text = text
    return this
  }

  setHtml (html: string): this {
    this.html = html
    return this
  }

  setAttachments (files: AttachmentsDto | AttachmentsDto[]): this {
    if (Array.isArray(files)) {
      this.attachments = files
    } else {
      this.attachments = [files]
    }
    return this
  }
}
