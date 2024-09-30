import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())

app.listen(process.env.PORT,()=>{
    console.log(`app listening at port ${process.env.PORT}`)
})
