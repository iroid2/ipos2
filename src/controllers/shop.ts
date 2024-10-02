import { db } from "@/db/db";
import { error } from "console";
 
import { Request, Response } from "express";

export async function createShop(req:Request,res:Response) {
    const { 
        name,
        
        slug,
        location,adminId,attendantIds}=req.body
        try {
            const existingShop= await db.shop.findUnique({
                where:{slug}
            })
            if(existingShop){
                return res.status(409).json({data:null,error:`(${name}) already exists`})
            }
            const newShop= await db.shop.create({
                data:{ name,
        
                    slug,
                    location,adminId,attendantIds}
            })
            return res.status(201).json({
                data:newShop,
                error:null
            })
        } catch (error) {
           return res.status(500).json({
            data:null,  
            error 
           })
        }
}

export async function getShops(req: Request, res: Response) {  

    try {  
        const shops = await db.shop.findMany({  
            orderBy: { createdAt: "desc" }  
        });  

        return res.status(200).json({  
            data: shops,  
            error: null  
        });  
    } catch (error) {  
        console.error(error); // Log the error  
        return res.status(500).json({  
            data: null,  
            error: "Internal Server Error"  
        });  
    }  
}
export async function getSingleShop(req: Request, res: Response) {
    const { id }=req.params
    try {
        const shop=await db.shop.findUnique({
            where:{id}
        })
        if(!shop){
            return res.status(409).json({
                data:null,error:"somethign went wrong"
            })
        }
        return res.status(201).json({
            data:shop,
            error
        })
    } catch (error) {
        console.log(error)
    }
}
export async function updateShopById(req: Request, res: Response ) {
    const { id }=req.params
    const { 
        name,
        
        slug,
        location,adminId,attendantIds}=req.body
   
        try {
            const clickedShop= await db.shop.findUnique({
                where:{id}
            })
            if(!clickedShop){
                return res.status(409).json({
                    data:null,
                    error:"there is no such a shop "
                })
            }
            const shopUpdte= await db.shop.update({
                where:{id},data:{name,
        
                    slug,
                    location,adminId,attendantIds}
            })
            return res.status(200).json({
                data:shopUpdte,
                error
            })
        } catch (error) {
            
        }
}
 export async function getShopAttendants(req:Request,res:Response ) {
    const {shopId}=req.params
    console.log(shopId)
    try {
        const existingShop=await db.shop.findUnique({
            where:{id:shopId}
        })
        if(!existingShop){
            return res.status(200).json({
                data:null,
                error:"this shop doesnt exist"
            })
        }
        const shoppAttendants=await db.user.findMany({
            where:{
                id:{
                    in:existingShop.attendantIds
                }
            },
            select:{
                email: true,
    username: true,
    firstName: true,
    lastName: true,
    phone: true,
            }
        })
        return res.status(200).json({
            data:shoppAttendants,
            error
        })
    } catch (error) {
        console.log(error)
    }
 }