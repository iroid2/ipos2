import { db } from "@/db/db";
import { error } from "console";
 
import { Request, Response } from "express";

export async function createBrand(req:Request,res:Response) {
    const { 
        name,
slug  }=req.body
        try {
            const existingBrand= await db.brand.findUnique({
                where:{slug}
            })
           
            if(existingBrand){
                return res.status(409).json({data:null,error:`(${slug}) already exists`})
            }
            const newbrand= await db.brand.create({
                data:{ name,            
                   slug}
            })
            return res.status(201).json({
                data:newbrand,
                error:null
            })
        } catch (error) {
           return res.status(500).json({
            data:null,  
            error 
           })
        }
}

export async function getbrands(req: Request, res: Response) {  

    try {  
        const brands = await db.brand.findMany({  
            orderBy: { createdAt: "desc" }  
        });  

        return res.status(200).json({  
            data: brands,  
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
export async function getSinglebrand(req: Request, res: Response) {
    const { id }=req.params
    try {
        const existingBrand=await db.brand.findUnique({
            where:{id}
        })
        if(!existingBrand){
            return res.status(409).json({
                data:null,error:" brands doesnt exist "
            })
        }
        return res.status(201).json({
            data:existingBrand,
            error
        })
    } catch (error) {
        console.log(error)
    }
}
// export async function updateBrandById(req: Request, res: Response ) {
//     const { id }=req.params
//     const { 
//         name,            
         
//        slug }=req.body
   
//         try {
//             const clickedbrand= await db.brand.findUnique({
//                 where:{id}
//             })
//             if(!clickedbrand){
//                 return res.status(409).json({
//                     data:null,
//                     error:"there is no such a brand "
//                 })
//             }
//             const brandUpadte= await db.brand.update({
//                 where:{id},data:{name,            
                     
//                    slug}
//             })
//             return res.status(200).json({
//                 data:brandUpadte,
//                 error
//             })
//         } catch (error) {
//             console.log(error)
//         }
// }
 export async function  deleteExistingBrandById(req:Request,res:Response) {
    const {id}=req.params
    try {
        const existingBrand= await db.brand.findUnique({
            where:{id}
        })
        if(!existingBrand){
            return res.status(409).json({
                data:null,
                error:"there is no such a brand "
            })
        }
        const deletedBrand= await db.brand.delete({
            where:{id}
        })
        return res.status(200).json({
           messege:"DELETED SUCESSFULY",
            error:"NULL"
        })
    } catch (error) {
        console.log(error)
    }
 }

 export async function updateBrandById(req:Request, res:Response) {
    const {id}=req.params
    const { 
        name,            
         
       slug }=req.body
  
        try {
          const  existingBrand= await db.brand.findUnique({
            where:{
              id
            }
          })
          if(slug !==existingBrand?.slug){
          const existingBrandBySlug= await db.brand.findUnique({where:{slug}})
          if(existingBrandBySlug){
            return res.status(409).json({
                data:null,
                error:`this brand with ${slug} is not found`
              })
          }
          }
          
         const updatebrand= await db.brand.update({
          where:{id},
           data:{name,            
             
           slug}
        })
         
          return res.status(500).json({
            data:updatebrand,
            error:null
          })
        } catch (error) {
          console.log(error)
        }
    
  }