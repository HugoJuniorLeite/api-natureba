import express from "express";
import cors from "cors";
import authRouter from "./routes/authRoutes.js"; 
import productsRouter from "./routes/productsRoutes.js";
import buyRouter from "./routes/buyRoutes.js";



const app = express();
app.use(cors());
app.use(express.json());


app.use([authRouter,/*naturebaRouter,*/productsRouter,buyRouter])




const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));