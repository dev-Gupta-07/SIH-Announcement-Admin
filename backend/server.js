const express=require('express')
const dotenv = require("dotenv");  
const connectDB = require("./config/db");     
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const authRoute=require("./routes/authRoutes")
const userRoute=require("./routes/userRoutes")
const stationRoute=require("./routes/stationRoutes")

const trainRoute = require("./routes/trainRoutes");
const app=express();

app.use(express.json())
dotenv.config();
connectDB()

app.get("/",(req,res)=>{
    res.send("Successfully executed")

})

app.use("/api/auth",authRoute);
app.use("/api/user",userRoute);
app.use("/api/station",stationRoute);
app.use("/api/train",trainRoute);

app.use(notFound);

app.use(errorHandler);
const PORT=process.env.PORT||2000;
app.listen(PORT,
    console.log(`Server listening at port ${PORT}`)
);
