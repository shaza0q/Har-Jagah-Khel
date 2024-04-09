import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { UserRouter } from './routes/user.js';
import cookieParser from 'cookie-parser'
import cors from 'cors'
dotenv.config()

const app = express()
app.use(express.json())
app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true
}))
app.use(cookieParser())
app.use('/auth', UserRouter)

mongoose.connect('mongodb://127.0.0.1:27017/authentication')
const db = mongoose.connection;

db.on('error', (err) => {
    console.error('MongoDb conn error: ', err)
})

db.once('open', () => {
    console.log('Connection established')
})

app.listen(process.env.PORT, ()=>{
    console.log("Server running")
})