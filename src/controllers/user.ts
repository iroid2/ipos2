import bycrypt from 'bcrypt'
import { db } from "@/db/db";
import { error } from "console";
import { Request, Response } from "express";

export async function createUser(req:Request,res:Response) {
    const { email,          
        username ,
        password ,
          firstName,  
          lastName,  
          phone ,
          dob  ,   role,
          gender,image
       }=req.body
       try {
        // client validation
        const existingUserByEmail= await db.user.findUnique({
          where:{email}
        })
        const existingUserByPhone= await db.user.findUnique({
          where:{phone}
        })
        const existingUserByUserName= await db.user.findUnique({
          where:{username}
        })
        if(existingUserByEmail){
          return res.status(409).json({
            error:`user with this (${email} )alread exists`,
            data:null
          })
        }
        if(existingUserByUserName){
          return res.status(409).json({
            error:`user with this (${username}) alread exists`,
            data:null
          })
        }
        if(existingUserByEmail){
          return res.status(409).json({
            error:`user with this (${phone}) alread exists`,
            data:null
          })
        }
        if(existingUserByPhone){
          return res.status(409).json({
            error:`user with this (${phone })alread exists`,
            data:null
          })
        }
        const hashedPassword:string= await bycrypt.hash(password,10)

        const newUser=await db.user.create({
          data:{
            email,          
            username ,
            password : hashedPassword ,
              firstName,  
              lastName,  
              phone ,
              role,
              dob  ,   
              gender,
              image:image?image:"https://utfs.io/f/45019b31-b147-47a1-8584-a51e6b37f147-4sjosp.jpeg"
          }
        })
        const {password:savedPassword,...others}=newUser
        res.status(201).json({
          data:others,
          error:null
        })
       } catch (error) {
        console.log(error)
       }
    }

export async function getUsers(req:Request,res:Response) {
  const { email,          
    username ,
    password ,
      firstName,  
      lastName,  
      phone ,
      dob  ,   
      gender,image
   }=req.body
  try {
    const users= await db.user.findMany()
    const filteredUsers=users.map((user:any)=>{
      const {password,...others}=user
      return others
    })
    return res.status(200).json({
      data:filteredUsers,
      error:null
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      data:null,
      error:"something went wrong"
    })
  }
}

export async function getUserById(req:Request, res:Response) {
  const {id}=req.params
  try {
    const clickedUser =await db.user.findUnique({
      where:{id}
    })
    if(!clickedUser){
      return res.status(404).json({
        data:null,
        error:"user not found"
      })
    }
    const {password, ...result}=clickedUser
   
    return res.status(200).json({
      data:result,
      error:null
    })
  } catch (error) {
console.log(error)
  }
}
export async function updateUserById(req:Request, res:Response) {
  const {id}=req.params
  const {email,          
    username ,
      firstName,  
      lastName,  
      phone ,
      dob  ,   
      gender,image,role,password}=req.body

      try {
        const existingUser= await db.user.findUnique({
          where:{
            id
          }
        })
        if(!existingUser){
          return res.status(404).json({
            data:null,
            error:"no user found"
          })
        
        }
        if (email && email !==existingUser.email) {
          const existingUserByEmail= await db.user.findUnique({
            where:{email}
          })
          if(existingUserByEmail){
            return res.status(409).json({
              error:`user with this (${phone}) already exists`,
              data:null
            })
          }
        }
        if(phone && phone !==existingUser.phone){
          const existingUserByPhone= await db.user.findUnique({
            where:{phone}
          })
          if(existingUserByPhone){
            return res.status(409).json({
              error:`user with this (${phone })alread exists`,
              data:null
            })
          }
        }
        
        
       if(username && username !==existingUser.username){
        const existingUserByUserName= await db.user.findUnique({
          where:{username}
        })
        if(existingUserByUserName){
          return res.status(409).json({
            error:`user with this (${username}) alread exists`,
            data:null
          })
        }
       }

       let hashedPassword=existingUser.password

       if(password ){
        const hashedPassword = await bycrypt.hash(password,10)
       }
         
       const updateUser= await db.user.update({
        where:{id},data:{email,          
          username ,
       
            firstName,  
            lastName,  
            phone ,
            dob  ,   
            gender,image,role,password:hashedPassword}
      })
       const {password:savedPassword,...others}=updateUser
        return res.status(500).json({
          data:others,
          error:null
        })
      } catch (error) {
        console.log(error)
      }
  
}
export async function updateUserPassword(req:Request, res:Response) {
  const {id}=req.params
  const {password}=req.body

      try {
        const existingUser= await db.user.findUnique({
          where:{
            id
          }
        })
        if(!existingUser){
          return res.status(404).json({
            data:null,
            error:"no user found"
          })
         
        }
        const hashedPassword:string= await bycrypt.hash(password,10)
        const updateUserPassword= await db.user.update({
          where:{id},data:{
            password:hashedPassword}
        })
         
        return res.status(500).json({
          data:updateUserPassword,
          error:null
        })
      } catch (error) {
        
      }
  
}
export async function deleteUserById(req:Request, res:Response) {
  const {id}=req.params
  try {
    const user = await db.user.findUnique({
      where:{id}
    })
    if(!user){
      return res.status(404).json({
        data:null,
        error:"no user"
      })
    }
    const deleteUser= await db.user.delete({
      where:{id}
    })
    return res.status(200).json({
      success:true,
      error:null
    })
  } catch (error) {
    
  }
}
export async function getAttendants(req:Request,res:Response) {
  
  try {
    const users= await db.user.findMany({
      where:{
        role:'ATTENDANT'
      }
    })
    const filteredUsers=users.map((user:any)=>{
      const {password,...others}=user
      return others
    })
    return res.status(200).json({
      data:filteredUsers,
      error:null
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      data:null,
      error:"something went wrong"
    })
  }
}
export async function getAdmins(req:Request,res:Response) {
  
  try {
    const users= await db.user.findMany({
      where:{
        role:'Admin'
      }
    })
    const filteredUsers=users.map((user:any)=>{
      const {password,...others}=user
      return others
    })
    return res.status(200).json({
      data:filteredUsers,
      error:null
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      data:null,
      error:"something went wrong"
    })
  }
}