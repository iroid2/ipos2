import { db } from "@/db/db"
import { Request, Response } from "express"
import bycrypt from 'bcrypt'
import { error } from "console";
import { generateAccessToken } from "@/utils/generateJWT";
export async function authorizeUser(req:Request,res:Response) {
    const { email,          
        username ,
        password ,
          
       }=req.body
       try {
      let existingUser=null;
      if(email){
        existingUser=await db.user.findUnique({
            where:{email}
        })
      }
      if(username){
        existingUser=await db.user.findUnique({
            where:{username}
        })
      }
      if(!existingUser){
        return res.status(404).json({
            error:"wrong credentials",
            data:null
        })
      }
      const passwordMatch= await bycrypt.compare(password,existingUser.password)
      if(!passwordMatch){
        return res.json({
            error:"Wrong Credentials",
            data:null
        }).status(403);
      }
    //   destructure poassword out from existing user
    const {password:userPassword,...userWithoutPassword}=existingUser
    const accessToken=generateAccessToken(userWithoutPassword)
    const result={ accessToken}
       return res.status(201).json(result)
       } catch (error) {
        console.log(error)
       }
    }