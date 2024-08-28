import mongoose from "mongoose";

const TimeSlotSchema = new mongoose.Schema({
    ground_id:{type: String, required: true},
    time_start:{type: Number, required: true},
    time_end:{type: Number, required: true},
    time_duration:{type: Number, required: true},
    occupied: {type: Boolean, required: true}
})

const TimeModel = mongoose.model("TimeSlot", TimeSlotSchema)

export {TimeModel as TimeSlot}