// import express, { Request, Response } from "express";
console.log(2+4)


import express, { Request, Response } from "express"; // Import the Express framework
 
import customerRouter from "./routes/customer";
import userRouter from "./routes/users";
import shopRouter from "./routes/shops";
import supplierRouter from "./routes/suppliers";
import loginRouter from "./routes/login";
import unitRouter from "./routes/units";
import brandRouter from "./routes/brands";
import categoryRouter from "./routes/category";
import productRouter from "./routes/product";


require("dotenv").config(); // Load environment variables from a .env file into process.env
const cors = require("cors"); // Import the CORS middleware
const app = express(); // Create an Express application instance
 
app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS) for all routes
 
const PORT = process.env.PORT || 8000; // Set the server's port from environment variables or default to 8000
 
app.use(express.json()); // Parse incoming JSON requests and make the data available in req.body
 
app.listen(PORT, () => {
  // Start the server and listen on the specified port
  console.log(`Server is running on http://localhost:${PORT}`); // Log a message indicating the server is running
});

// KA

app.use('/api/v1',customerRouter)
app.use('/api/v1',userRouter)   
app.use('/api/v1',shopRouter)
app.use('/api/v1',supplierRouter)
app.use('/api/v1',loginRouter)
app.use('/api/v1',unitRouter)
app.use('/api/v1',brandRouter)
app.use('/api/v1',categoryRouter)
app.use('/api/v1',productRouter)