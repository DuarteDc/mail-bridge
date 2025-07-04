import autobind from 'autobind-decorator'

import { z } from 'zod'
export class MailSchema {
  private readonly MAX_FILE_SIZE = 5000000
  private readonly ACCEPTED_IMAGE_TYPES = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp'
  ]

  @autobind
  rules () {
    return z.object({
      from: z.string().email('please provide a valid email!').min(10).max(255),
      to: z.string().email('please provide a valid email!').min(10).max(255),
      subject: z.string().min(10).max(255),
      text: z.string().min(10).optional(),
      html: z
        .string()
        .refine(value => /<[^>]+>/.test(value), {
          message: 'Must contain valid HTML tags'
        })
        .optional(),
      attachments: z
        .any()
        .refine(files => files?.[0]?.size < this.MAX_FILE_SIZE)
        .refine(files => this.ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.size), {
          message: `Only support ${this.ACCEPTED_IMAGE_TYPES.map(
            type => `.${type.split('/').pop()}`
          )}`
        })
    })
  }
}
