 
 
import { createBrand, deleteExistingBrandById, getbrands, getSinglebrand, updateBrandById } from "@/controllers/brands"
import express from "express"
const brandRouter= express.Router()

brandRouter.post("/brands",createBrand)
brandRouter.get("/brands",getbrands)
brandRouter.get("/brands/:id",getSinglebrand)
 
brandRouter.put("/brands/:id",updateBrandById)
 
brandRouter.delete("/brands/:id",deleteExistingBrandById)
 
export default brandRouter