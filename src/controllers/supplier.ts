import { db } from "@/db/db";
import { Request, Response } from "express";

export async function createSupplier(req:Request,res:Response) {
    const {supplierType,
        name,
      contactPerson,
        phone, 
        email,
       location,
        country,
        website,
        taxPin,
      regNumber,
      bankAccountNumber,
       bankName,
       paymentTerms, 
        logo,     
        rating,
        notes}=req.body
        try {
          const existingSupplierByPhone= await db.supplier.findUnique({where:{phone}})
          if(existingSupplierByPhone){
            return res.status(200).json({
              error:`Customer with this (${phone}) number already exists please make sure its ur number to verify ur account`
            })
          }
          if(email){
            const existingSupplierByEmail= await db.supplier.findUnique({where:{email}})
            if(existingSupplierByEmail){
              return res.status(200).json({
                error:`Customer with this (${email}) already in use if ur trying to hack please go and look 4 ajob`
              })
            }
          }
          if(regNumber){
            const existingSupplierByRegNumber= await db.supplier.findUnique({where:{regNumber}})
            if(existingSupplierByRegNumber){
              return res.status(200).json({
                error:`THIS registration Number  ${regNumber} is already being used so u better use urs`
              })
            }
          }
         
          const newSupplier= await db.supplier.create({
            data:{
              supplierType,
              name,
            contactPerson,
              phone, 
              email,
             location,
              country,
              website,
              taxPin,
            regNumber,
            bankAccountNumber,
             bankName,
             paymentTerms, 
              logo,     
              rating,
              notes
            }
          })
          return res.status(201).json(newSupplier)
         } catch (error) {
          return res.status(409).json({
            data:null,
            error
          })
         }
}
 
 
export async function getAllSuppliers(req:Request, res:Response){
  try {
   const suppliers= await db.supplier.findMany( {
     orderBy:{
       createdAt:"desc"
     }
   } )
   return res.status(201).json(suppliers)
  } catch (error) {
   console.log(error)
  }
 
   
}
export async function getSingleSupplierByid(req:Request, res:Response){
 const { id } =req.params
 try {
   const supplier= await db.supplier.findUnique({
     where:{
       id
     }
   })
   return res.status(200).json(supplier)
 } catch (error) {
   console.log(error)
 }
}