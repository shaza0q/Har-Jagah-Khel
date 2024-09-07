import express from 'express'
import { Booking } from '../models/Booking.js'
import { TimeSlot } from '../models/TimeSlot.js'
import { User } from '../models/User.js'
import {Ground} from '../models/Ground.js'
import { otpGen } from 'otp-gen-agent'
import nodemailer from 'nodemailer'

 
const router = express.Router()


router.post('/addBooking', async(req, res) => {
    const { slotId, groundId, userId } = req.query
    const otp_gen = await otpGen();

    console.log(otp_gen)

    try{
        const data = new Booking({
            ground_id: groundId,
            slot_id: slotId,
            user_id: userId,
            duration: 1,
            otp: otp_gen,
        })
        await data.save()

        await TimeSlot.findOneAndUpdate(
            {_id: slotId},
            {occupied: true}
        )

        const uData = await User.findOne({_id: userId})
        .select('username email')

        const gData = await Ground.findOne({_id: groundId})

        const sData = await TimeSlot.findOne({_id: slotId})
        .select('time_start time_end')


        console.log('------34' + uData + '----' + gData + '----' + sData)


        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'mohdarslaan1207@gmail.com',
              pass: 'jguu wpeq vrbc bovr'
            }
          });
          
          var mailOptions = {
            from: 'Har Jagah Khel',
            to: uData.email,
            subject: `OTP for slot Booking of  ${sData.time_start} - ${sData.time_end}`,
            text: `The OTP is ${otp_gen} for the ground: ${gData.ground}\n
            Address: ${gData.address}\npincode: ${gData.pincode}\ncity: ${gData.city}\nstate: ${gData.state}\n
            Happy Playing`
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              return res.json({message: "error sending message"})
            } else {
              return res.json({status: true, message: "sent message"})
            }
          });

        return res.status(200).json({status: true, message: 'Ground booked'})
    }
    catch(err){
        console.log('-------12', err)
    }
})

router.get('/getBookingData', async(req, res) => {
    const {groundId, userId } = req.query

    try{
        const data = await Booking.find({ground_id: groundId})
        if(data.length !== 0){
            
            return res.json(data)
        }
    }
    catch(e){
        console.log(e)
    }
})


router.get('/getOuterData', async(req, res) => {
    const {slot_id} = req.query
    
    console.log('--------52', slot_id)

    try{
        const data = await Booking.findOne({slot_id: slot_id})
        .populate({path: 'user_id', select: 'username email'})
        .populate({path: 'ground_id', select: 'ground'})
        .populate({path: 'slot_id', select: 'time_start time_end'})
        .select('user_id ground_id slot_id otp createdAt')
        

        return res.json({otherData: data})
    }
    catch(e){console.log(e)}

})


router.post('/confirmBooking', async(req, res) => {
    const id = req.query.id
    console.log('--------77 ' + id)
    try{
        const deletedBooking = await Booking.findByIdAndDelete({_id: id})

        if(!deletedBooking){
            return res.status(404).json({error: 'Booking not found'})
        }

        return res.json({message: 'booking deleted'})
    }
    catch(er){}
})

export {router as BookingRouter}