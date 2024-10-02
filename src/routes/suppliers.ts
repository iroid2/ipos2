 
import { createSupplier, getAllSuppliers, getSingleSupplierByid } from "@/controllers/supplier"
import express from "express"
const supplierRouter=express.Router()


supplierRouter.post('/suppliers',createSupplier)
supplierRouter.get('/suppliers',getAllSuppliers)
supplierRouter.get('/suppliers/:id',getSingleSupplierByid)
// customerRouter.get('/api/v2/customers',getv2Customers)
export default supplierRouter