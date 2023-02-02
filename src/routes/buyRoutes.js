import { Router } from 'express'
import { creatbuy, listbuy } from '../controller/buy.js'
import { authValidation } from '../middleware/authValidation.js'

const buyRouter = Router()

buyRouter.use(authValidation)
buyRouter.post("/sales", creatbuy)
buyRouter.get("/sales", listbuy)

export default buyRouter