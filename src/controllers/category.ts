import { db } from "@/db/db";
import { error } from "console";
 
import { Request, Response } from "express";

export async function createCategory(req:Request,res:Response) {
    const { 
        name,
slug  }=req.body
        try {
            const existingCategory= await db.category.findUnique({
                where:{slug}
            })
           
            if(existingCategory){
                return res.status(409).json({data:null,error:`(${slug}) already exists`})
            }
            const newCategory= await db.category.create({
                data:{ name,            
                     
                   slug}
            })
            return res.status(201).json({
                data:newCategory,
                error:null
            })
        } catch (error) {
           return res.status(500).json({
            data:null,  
            error 
           })
        }
}
export async function getCategory(req: Request, res: Response) {  

    try {  
        const category = await db.category.findMany({  
            orderBy: { createdAt: "desc" }  
        });  

        return res.status(200).json({  
            data: category,  
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
export async function getSinglecategory(req: Request, res: Response) {
    const { id }=req.params
    try {
        const existingCategory=await db.category.findUnique({
            where:{id}
        })
        if(!existingCategory){
            return res.status(409).json({
                data:null,error:" categorys doesnt exist "
            })
        }
        
        return res.status(201).json({
            data:existingCategory,
            error
        })
    } catch (error) {
        console.log(error)
    }
}
// export async function updatecategoryById(req: Request, res: Response ) {
//     const { id }=req.params
//     const { 
//         name,            
         
//        slug }=req.body
   
//         try {
//             const clickedcategory= await db.category.findUnique({
//                 where:{id}
//             })
//             if(!clickedcategory){
//                 return res.status(409).json({
//                     data:null,
//                     error:"there is no such a category "
//                 })
//             }
//             const categoryUpadte= await db.category.update({
//                 where:{id},data:{name,            
                     
//                    slug}
//             })
//             return res.status(200).json({
//                 data:categoryUpadte,
//                 error
//             })
//         } catch (error) {
//             console.log(error)
//         }
// }
 export async function  deleteCategoryById(req:Request,res:Response) {
    const {id}=req.params
    try {
        const existingCategory= await db.category.findUnique({
            where:{id}
        })
        if(!existingCategory){
            return res.status(409).json({
                data:null,
                error:"there is no such a category "
            })
        }
        const deletedcategory= await db.category.delete({
            where:{id}
        })
        return res.status(200).json({
            messege:"Delted sucessfully",
            error:"null"
        })
    } catch (error) {
        console.log(error)
    }
 }

 export async function updatecategoryById(req:Request, res:Response) {
    const {id}=req.params
    const { 
        name,            
         
       slug }=req.body
  
        try {
          const  existingCategory= await db.category.findUnique({
            where:{
              id
            }
          })
          if(slug !==existingCategory?.slug){
          const existingCategoryBySlug= await db.category.findUnique({where:{slug}})
          if(existingCategoryBySlug){
            return res.status(409).json({
                data:null,
                error:`this category with ${slug} is not found`
              })
          }
          }
         const updateCategory= await db.category.update({
          where:{id},
           data:{name,            
           slug}
        })
         
          return res.status(500).json({
            data:updateCategory,
            error:null
          })
        } catch (error) {
          console.log(error)
        }
    
  }