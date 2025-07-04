import { Request, Response } from 'express'

import autobind from 'autobind-decorator'

export class MailController {
  @autobind
  send (request: Request, response: Response) {
    console.log(request)

    response.json({ message: 'Holap' })
  }
}
