import { createUser, deleteUserById, getAdmins, getAttendants, getUserById, getUsers, updateUserById, updateUserPassword } from "@/controllers/user"
import express from "express"
const userRouter= express.Router()

userRouter.post("/users",createUser)
userRouter.get("/users",getUsers)
userRouter.get("/users/:id",getUserById)
 
userRouter.put("/users/:id",updateUserById)
userRouter.put("/users/update-password/:id",updateUserPassword)
userRouter.delete("/users/:id",deleteUserById)
userRouter.get("/attendants",getAttendants)
userRouter.get("/admins",getAdmins)
export default userRouter