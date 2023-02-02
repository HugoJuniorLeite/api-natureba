import { Router } from 'express'
import { signUp, signIn } from '../controller/auth.js'
import { validateSchema } from '../middleware/validateSchema.js'
import { signUpSchema } from '../schema/signUpSchema.js'
import { signInSchema } from '../schema/signInSchema.js'

const authRouter = Router()

authRouter.post("/",validateSchema(signInSchema), signIn)
authRouter.post("/cadastro",validateSchema(signUpSchema), signUp)

export default authRouter