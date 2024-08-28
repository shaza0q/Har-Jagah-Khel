import mongoose from "mongoose";

// gname, gtype, gdisc, address, pincode, city, state, photo, userEmail

const GroundSchema = new mongoose.Schema({
    ground:{type: String, required: true},
    type:{type: String, required: true},
    discription:{type: String, required: true},
    address:{type: String, required: true},
    pincode: {type: Number, required: true},
    city: {type: String, required: true},
    state: {type: String, required: true},
    photo: {type: String, required: true},
    email: {type: String, required: true},
    location: {
        type: {type: String, default: 'Point'},
        coordinates: []
  }
})

const GroundModel = mongoose.model("Ground", GroundSchema)

export {GroundModel as Ground}