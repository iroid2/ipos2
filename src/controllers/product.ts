import { db } from "@/db/db";
import { error } from "console";
 
import { Request, Response } from "express";

export async function createProduct(req:Request,res:Response) {
    const { 
        name,
description, 
batchNumber,
barCode,
image,
// tax  ,
alertQty ,
stockQty,
price ,
buyingprice,
sku ,
productCode,
slug,
supplierId,
unitId ,
brandId,
categoryId,
expiryDate  }=req.body

// barCode  
// sku
// productCode
// slug
        try {
            const existingProductBySlug= await db.product.findUnique({
                where:{slug}
            })
           
            if(existingProductBySlug){
                return res.status(409).json({data:null,error:`(${slug}) already exists`})
            }
           if(barCode){
            const existingProductByBarCode= await db.product.findUnique({
                where:{barCode}
            })
           
            if(existingProductByBarCode){
                return res.status(409).json({data:null,error:`(${barCode}) already exists`})
            }
           }
            const existingProductByProductCode= await db.product.findUnique({
                where:{productCode}
            })
           
            if(existingProductByProductCode){
                return res.status(409).json({data:null,error:`(${productCode}) already exists`})
            }
            const existingProductBySKU= await db.product.findUnique({
                where:{sku}
            })
           
            if(existingProductBySKU){
                return res.status(409).json({data:null,error:`pRODUCT with(${sku}) already exists`})
            }
            const newProduct= await db.product.create({
                data:{  name,
                    description, 
                    batchNumber,
                    barCode,
                    image,
                    // tax,
                    alertQty ,
                    stockQty,
                    price ,
                    buyingprice,
                    sku ,
                    productCode,
                    slug,
                    supplierId,
                    unitId ,
                    brandId,
                    categoryId,
                    expiryDate }
            })
            return res.status(200).json({
                data:newProduct,
                error:null
            })
        } catch (error) {
           return res.status(500).json({
            data:null,  
            error 
           })
        }
}
export async function getProducts(req: Request, res: Response) {  

    try {  
        const product = await db.product.findMany({  
            orderBy: { createdAt: "desc" }  
        });  

        return res.status(200).json({  
            data: product,  
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
export async function getSingleProduct(req: Request, res: Response) {
    const { id }=req.params
    try {
        const existingProduct=await db.product.findUnique({
            where:{id}
        })
        if(!existingProduct){
            return res.status(409).json({
                data:null,error:" Product doesnt exist "
            })
        }
        
        return res.status(201).json({
            data:existingProduct,
            error
        })
    } catch (error) {
        console.log(error)
    }
}
 
 export async function  deleteProductById(req:Request,res:Response) {
    const {id}=req.params
    try {
        const existingProduct= await db.product.findUnique({
            where:{id}
        })
        if(!existingProduct){
            return res.status(409).json({
                data:null,
                error:"there is no such a Product "
            })
        }
        const deletedProduct= await db.product.delete({
            where:{id}
        })
        return res.status(200).json({
            messege:"Deleted sucessfully",
            error:null
        })
    } catch (error) {
        console.log(error)
    }
 }

 export async function updateProductById(req:Request, res:Response) {
    const {id}=req.params
    const { 
        name,
description, 
batchNumber,
barCode,
image,
tax  ,
alertQty ,
stockQty,
price ,
buyingprice,
sku ,
productCode,
slug,
supplierId,
unitId ,
brandId,
categoryId,
expiryDate  }=req.body
  
        try {
          const  existingProduct= await db.product.findUnique({
            where:{
              id
            }
          })
          if(slug && slug !==existingProduct?.slug){
          const existingProductBySlug= await db.product.findUnique({where:{slug}})
          if(existingProductBySlug){
            return res.status(409).json({
                data:null,
                error:`this Product with ${slug} is not found`
              })
          }
          }
          if(sku && sku !==existingProduct?.sku){
            const existingProductBySkU= await db.product.findUnique({where:{sku}})
            if(existingProductBySkU){
              return res.status(409).json({
                  data:null,
                  error:`this Product with ${sku} is not found`
                })
            }
            }
            if(productCode && productCode !==existingProduct?.productCode){
                const existingProductByProductCode= await db.product.findUnique({where:{productCode}})
                if(existingProductByProductCode){
                  return res.status(409).json({
                      data:null,
                      error:`this Product with ${productCode} is not found`
                    })
                }
                }
                if(barCode && barCode !==existingProduct?.barCode){
                    const existingProductByBarCode= await db.product.findUnique({where:{barCode}})
                    if(existingProductByBarCode){
                      return res.status(409).json({
                          data:null,
                          error:`this Product with ${barCode} is not found`
                        })
                    }
                    }    
         const updateProduct= await db.product.update({
          where:{id},
           data:{    name,
            description, 
            batchNumber,
            barCode,
            image,
            // tax  ,
            alertQty ,
            stockQty,
            price ,
            buyingprice,
            sku ,
            productCode,
            slug,
            supplierId,
            unitId ,
            brandId,
            categoryId,
            expiryDate }
        })
         
          return res.status(500).json({
            data:updateProduct,
            error:null
          })
        } catch (error) {
          console.log(error)
        }
    
  }