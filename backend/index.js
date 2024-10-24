import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRouter from './routes/auth.js'
import departmentRouter from './routes/department.js'
import employeeRouter from './routes/employee.js'

import connectdb from "./database/mongo.js";
connectdb()
dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/auth',authRouter);
app.use('/api/department',departmentRouter);
app.use('/api/employee',employeeRouter);

app.listen(process.env.PORT,()=>{
    console.log(`app listening at port ${process.env.PORT}`)
})
