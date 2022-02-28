import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import postRoute from './routes/posts.js'

dotenv.config()
const app = express();

app.use(bodyParser.json({ limit: '20mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '20mb', extended: true }))
app.use(cors());
app.use('/posts', postRoute)

const PORT = process.env.PORT || 8000;

app.get("/", (req,res)=>{
    res.send("Welcome to your memories")
})

mongoose.connect(process.env.MONGO_URL, ()=>{
    console.log("db connected");
})

app.listen(PORT, ()=>{
    console.log("server started");
})