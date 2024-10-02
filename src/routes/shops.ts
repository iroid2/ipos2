import { createShop, getShopAttendants, getShops, getSingleShop, updateShopById } from "@/controllers/shop"
import express from "express"
const shopRouter=express.Router()

shopRouter.post("/shops",createShop)
shopRouter.get("/shops",getShops)
shopRouter.get("/shops/:id",getSingleShop)
shopRouter.put("/shops/:id",updateShopById)
shopRouter.get("/shops/attendants/:shopId",getShopAttendants)
// shopRouter.get("/shops/:id",getShops)
// shopRouter.put("/shops/:id",getShops)
// shopRouter.delete("/shops/:id",getShops)



export default shopRouter