import { Router } from 'express'
import { creatProducts, listProducts } from '../controller/products.js'


const productsRouter = Router()



productsRouter.post("/products", creatProducts)
productsRouter.get("/products", listProducts)

export default productsRouter