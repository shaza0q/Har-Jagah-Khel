import express from 'express'
// import dotenv from 'dotenv';
// import bcrypt, { hash } from 'bcrypt'
import { User } from '../models/User.js'
import {Company} from '../models/Company.js'
import { Ground } from '../models/Ground.js';
import jwt from 'jsonwebtoken'
import pin from 'pincode-lat-long'
import { TimeSlot } from '../models/TimeSlot.js';


const router = express.Router()
          

router.post('/addGround', async (req, res) => {
//   console.log("-----15",req.body)
  const { gname, gtype, gdisc, address, pincode, city, state, photo, email } = req.body;
//   console.log(pincode)
  

  const loc = await pin.getlatlong(pincode)
  if(!loc){
    return res.status(400).json({message: 'Please provide correct zipcode'})
  }

//   console.log('------20',loc)
  const locati = []

  locati.push(loc.lat)
  locati.push(loc.long)


//   console.log('------26',locati)


//   console.log(gname, gtype, gdisc, address, pincode, city, state, photo, email);

  try {
      // Example logic - Find the company based on userEmail
      const comp = await Company.findOne({ email });
      if (!comp) {
          console.log('Company not registered');
      }

      // Create a new ground object and save it to the database
      const newGround = new Ground({
          ground:gname,
          type:gtype,
          discription:gdisc,
          address,
          pincode,
          city,
          state,
          photo,
          email,
          location: { coordinates: locati}
      });
      await newGround.save();

      // Send a response back to the client
      return res.json({ status: true, message: 'Ground Added' });
  } catch (e) {
      // Handle any errors
      console.log(e);
      return res.status(500).json({ status: false, message: 'Error adding ground' });
  }
});



router.get('/getGroundDetail', async(req,res)=>{
    const email = req.query.email

    try{
        const data = await Ground.find({email})
        // console.log(data)
        // console.log('-----57', data)
        return res.json(data)
    }catch(e){
        console.log("Error getting ground data", e)
    }
})


router.get('/list/ground', async(req,res)=>{
    const {zipcode, minDist, maxDist} = req.query

    // console.log({zipcode, minDist, maxDist})

    try{
        const hill = pin.getlatlong(zipcode)
        const cord = []

        cord.push(hill.lat)
        cord.push(hill.long)

        let data = await Ground.find( {
            location:
              { $near :
                 {
                   $geometry: { type: "Point",  coordinates: cord },
                   $minDistance: minDist ?? 0,
                   $maxDistance: maxDist ?? 50000
                 }
              }
          }).lean()
          
          for(const ground of data){
            ground.here = 1
            console.log("here1")

           const slots =  await TimeSlot.find({
                ground_id: ground._id 
            })

           ground.slots = slots
           
            // console.log('-----116',Object.getOwnPropertyNames(ground))

        }

        // data.time = 150

        // console.log("here2",data[0])
        return res.json(data)
    }catch(e){
        console.log("Error getting ground data", e)
    }
})



export {router as GroundRouter}