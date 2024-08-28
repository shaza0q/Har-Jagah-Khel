import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { UserRouter } from './routes/user.js'
import { GroundRouter } from './routes/ground.js'
import { TimeSlotRouter } from './routes/timeSlot.js'
import { BookingRouter } from './routes/booking.js';
import cookieParser from 'cookie-parser'
import { cronScheduler } from './cron/renewSlot.js';
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
app.use('/ground', GroundRouter)
app.use('/time', TimeSlotRouter)
app.use('/book', BookingRouter)

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
    cronScheduler()
})
