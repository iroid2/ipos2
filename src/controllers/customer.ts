import { db } from "@/db/db";
import { Request, Response } from "express";


export async function createCustomer(req:Request, res:Response) {
   const {  customerType,
    firstName       ,  
    lastName        ,  
    phone           ,      
    gender          , 
    maxCreditLimit  ,
    maxCreditDays  ,
    country         ,  
    location        ,  
    taxPin          ,    
    dob             ,   
    email           ,  
    NIN      }=req.body
   try {
    const existingUserPhone= await db.customer.findUnique({where:{phone}})
    if(existingUserPhone){
      return res.status(200).json({
        error:`Customer with this (${phone}) number already exists please make sure its ur number to verify ur account`
      })
    }
    if(email){
      const existingCustomerByEmail= await db.customer.findUnique({where:{email}})
      if(existingCustomerByEmail){
        return res.status(200).json({
          error:`Customer with this (${email}) already in use if ur trying to hack please go and look 4 ajob`
        })
      }
    }
    if(NIN){
      const existingCustomerByNIN= await db.customer.findUnique({where:{NIN}})
      if(existingCustomerByNIN){
        return res.status(200).json({
          error:`THIS ${NIN} is already being used so u better use urs`
        })
      }
    }
   
    const newCustomer= await db.customer.create({
      data:{
        customerType,
        firstName       ,  
        lastName        ,  
        phone           ,      
        gender          , 
        maxCreditLimit  ,
        maxCreditDays  ,
        country         ,  
        location        ,  
        taxPin          ,    
        dob             ,   
        email           ,  
        NIN  
      }
    })
    return res.status(201).json(newCustomer)
   } catch (error) {
    console.log(error)
   }
   
}

export async function getCustomers(req:Request, res:Response){
   try {
    const customers= await db.customer.findMany( {
      orderBy:{
        createdAt:"desc"
      }
    } )
    return res.status(201).json(customers)
   } catch (error) {
    console.log(error)
   }
  
    
}
export async function getSingleCustomerByid(req:Request, res:Response){
  const { id } =req.params
  try {
    const customer= await db.customer.findUnique({
      where:{
        id
      }
    })
    return res.status(200).json(customer)
  } catch (error) {
    console.log(error)
  }
}
