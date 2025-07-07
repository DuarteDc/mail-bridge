export type AttachmentsDto = {
  filename?: string
  path?: string
  content?: string | Buffer
  contentType?: string
}

export interface SendMailDto {
  from: string
  to: string
  subject: string
  html?: string
  text?: string
  user: string
  password: string
  attachments?: AttachmentsDto | AttachmentsDto[]
}
