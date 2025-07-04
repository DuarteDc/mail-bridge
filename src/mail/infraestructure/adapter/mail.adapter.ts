import nodemailer from 'nodemailer'

import { MailPort } from '@/mail/core/ports/mail/mail.port'

export class MailAdapter implements MailPort {
  private transporter = typeof nodemailer

  constructor () {}
  send: () => boolean

  async verify (): boolean {
    await this.transporter.verify()
    return true
  }

  setFrom (from: string): this {
    return this
  }
  setTo: (to: string) => this
  setSubject: (subject: string) => this
  setText: (text: string) => this
  setHtml: (html: string) => this
  setAttachments: (attachments: File[]) => this
}
