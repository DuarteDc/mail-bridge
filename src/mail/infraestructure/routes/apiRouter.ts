import { Router } from 'express'
import v1Router from './v1/v1.router'

export const apiRouter = () => {
  const api = Router()
  api.use('/v1', v1Router)
  return api
}
