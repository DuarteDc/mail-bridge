import { z } from 'zod'

export abstract class MailSchema {
  static rules () {
    return z.object({
      user: z.string(),
      password: z.string(),
      from: z.string().email('please provide a valid email!').min(10).max(255),
      to: z.string().email('please provide a valid email!').min(10).max(255),
      subject: z.string().min(10).max(255),
      text: z.string().min(10).optional(),
      html: z
        .string()
        .refine(value => /<[^>]+>/.test(value), {
          message: 'Must contain valid HTML tags'
        })
        .optional()
    })
  }
}
