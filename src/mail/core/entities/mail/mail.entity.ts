export interface MailEntity {
  from: string
  to: string
  subject: string
  text: string
  html: string
  attachments: []
}
