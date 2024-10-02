 
import { createCategory, deleteCategoryById, getCategory, getSinglecategory, updatecategoryById } from "@/controllers/category"
 
import express from "express"
const categoryRouter= express.Router()

categoryRouter.post("/category",createCategory)
categoryRouter.get("/category",getCategory)
categoryRouter.get("/category/:id",getSinglecategory)
 
categoryRouter.put("/category/:id",updatecategoryById)
 
categoryRouter.delete("/category/:id",deleteCategoryById)
 
export default categoryRouter