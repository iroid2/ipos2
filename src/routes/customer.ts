import { createCustomer, getCustomers, getSingleCustomerByid } from "@/controllers/customer"
import express from "express"
const customerRouter=express.Router()


customerRouter.post('/customers',createCustomer)
customerRouter.get('/customers',getCustomers)
customerRouter.get('/customers/:id',getSingleCustomerByid)
// customerRouter.get('/api/v2/customers',getv2Customers)
export default customerRouter