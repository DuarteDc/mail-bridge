export interface MailPort {
  verify(): Promise<boolean>
  setFrom(from: string): this
  setTo(to: string): this
  setSubject(subject: string): this
  setText(text: string): this
  setHtml(html: string): this
  setAttachments: (attachments: File[]) => this
  send(): boolean
}
