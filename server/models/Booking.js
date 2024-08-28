import mongoose, { mongo } from "mongoose";
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId


const BookingSchema = new mongoose.Schema({
    ground_id:{type: Schema.Types.ObjectId, ref: 'Ground' },
    slot_id:{type: Schema.Types.ObjectId, ref: 'TimeSlot' },
    user_id:{type: Schema.Types.ObjectId, ref: 'User'},
    duration:{type: Number, required: true},
    otp:{type: Number, required: true},

},{
    timestamps:true
})

const BookingModel = mongoose.model("Booking", BookingSchema)

export {BookingModel as Booking}