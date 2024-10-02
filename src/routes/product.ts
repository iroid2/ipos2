 
 
import { createProduct, deleteProductById, getProducts, getSingleProduct, updateProductById } from "@/controllers/product"
import express from "express"
const productRouter= express.Router()

productRouter.post("/product",createProduct)
productRouter.get("/product",getProducts)
productRouter.get("/product/:id",getSingleProduct)
 
productRouter.put("/product/:id",updateProductById)

productRouter.delete("/product/:id",deleteProductById)
 
export default productRouter