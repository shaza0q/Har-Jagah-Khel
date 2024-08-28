import express from 'express'
import { Ground } from '../models/Ground.js';
import { TimeSlot } from '../models/TimeSlot.js';
import { generateTimeSlots } from '../middleware/generateTimeSlots.js';




const router = express.Router()


router.post('/addTimeSlot', async(req, res) => {
    // console.log(req.body)
    const {checkedM, checkedA, checkedE, checkedN, groundId} = req.body

    console.log(res)

    // console.log('req:',checkedM, checkedA, checkedE, checkedN, groundId)


    try{
        const id = await Ground.findOne({_id: groundId})
        if(!id){
            console.log('-------17 not FOUND ground')
        }else{
            if(checkedM){
               await generateTimeSlots(groundId, 500, 1100, 100, false)
    
            }
    
            if(checkedA){
                await generateTimeSlots(groundId, 1200, 1500, 100, false)
            }
    
            if(checkedE){
                await generateTimeSlots(groundId, 1530, 1930, 100, false)
            }
    
            if(checkedN){
                await generateTimeSlots(groundId, 2000, 2400, 100, false)
            }
            
    
            res.status(200).json({message: 'Time slots added'})

        }
    }
    catch(e){
        console.log(e)
    } 
})

router.get('/getTimeSlot', async(req, res) => {
    const {groundId} = req.query
    // console.log('------54',groundId)

    try{
        const data = await TimeSlot.find({ground_id: groundId})
        // console.log(data)
        return res.json(data)
    }
    catch(err){
        console.log('-------60', err)
    }
}) 



export {router as TimeSlotRouter}