import { TimeSlot } from '../models/TimeSlot.js';


export const generateTimeSlots = async(gId, start, end, duration, bol) => {
    let prev = start;
    const timeSlots = [] 

    for(let i=start+duration; i<=end; i+=duration){
        const newTimeSlot = new TimeSlot({
            ground_id: gId,
            time_start: prev,
            time_end: i,
            time_duration: duration,
            occupied: bol
        })

        console.log(newTimeSlot)

        timeSlots.push(newTimeSlot)
        prev=i
    }

    await TimeSlot.insertMany(timeSlots)
}