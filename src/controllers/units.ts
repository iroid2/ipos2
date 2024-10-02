import { db } from "@/db/db";
import { error } from "console";
 
import { Request, Response } from "express";

export async function createUnit(req:Request,res:Response) {
    const { 
        name,            
        abbreviation,
       slug }=req.body
        try {
            const existingUnit= await db.unit.findUnique({
                where:{slug}
            })
           
            if(existingUnit){
                return res.status(409).json({data:null,error:`(${slug}) already exists`})
            }
            const newUnit= await db.unit.create({
                data:{ name,            
                    abbreviation,
                   slug}
            })
            return res.status(201).json({
                data:newUnit,
                error:null
            })
        } catch (error) {
           return res.status(500).json({
            data:null,  
            error 
           })
        }
}

export async function getUnits(req: Request, res: Response) {  

    try {  
        const units = await db.unit.findMany({  
            orderBy: { createdAt: "desc" }  
        });  

        return res.status(200).json({  
            data: units,  
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
export async function getSingleUnit(req: Request, res: Response) {
    const { id }=req.params
    try {
        const existingunit=await db.unit.findUnique({
            where:{id}
        })
        if(!existingunit){
            return res.status(409).json({
                data:null,error:" units doesnt exist "
            })
        }
        return res.status(201).json({
            data:existingunit,
            error
        })
    } catch (error) {
        console.log(error)
    }
}
export async function updateunitById(req: Request, res: Response ) {
    const { id }=req.params
    const { 
        name,            
        abbreviation,
       slug }=req.body
   
        try {
            const clickedUnit= await db.unit.findUnique({
                where:{id}
            })
            if(!clickedUnit){
                return res.status(409).json({
                    data:null,
                    error:"there is no such a unit "
                })
            }
            const unitUpdte= await db.unit.update({
                where:{id},data:{name,            
                    abbreviation,
                   slug}
            })
            return res.status(200).json({
                data:unitUpdte,
                error
            })
        } catch (error) {
            
        }
}
 export async function  deleteUnitById(req:Request,res:Response) {
    const {id}=req.params
    try {
        const clickedUnit= await db.unit.findUnique({
            where:{id}
        })
        if(!clickedUnit){
            return res.status(409).json({
                data:null,
                error:"there is no such a unit "
            })
        }
        const deleteUnit= await db.unit.delete({
            where:{id}
        })
        return res.status(200).json({
            data:null,
            error,
            messege:"Deleted sucessfully"
        })
    } catch (error) {
        console.log(error)
    }
 }

 export async function updateUnitById(req:Request, res:Response) {
    const {id}=req.params
    const { 
        name,            
        abbreviation,
       slug }=req.body
  
        try {
          const  existingUnit= await db.unit.findUnique({
            where:{
              id
            }
          })
          if(id !==existingUnit?.id){
          const existingUnitBySlug= await db.unit.findUnique({where:{slug}})
          if(existingUnitBySlug){
            return res.status(409).json({
                data:null,
                error:`this unit with ${id} is not found`
              })
          }
          }
          
         const updateUnit= await db.unit.update({
          where:{id},
           data:{name,            
            abbreviation,
           slug}
        })
         
          return res.status(500).json({
            data:updateUnit,
            error:null
          })
        } catch (error) {
          console.log(error)
        }
    
  }