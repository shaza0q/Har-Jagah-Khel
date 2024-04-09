import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema({
    username:{type: String, required: true},
    email:{type: String, required:true},
    password:{type: String, required: true},
    type:{type: String, required: true},
    address:{type: String, required: true},
    pincode: {type: Number, required: true},
    city: {type: String, required: true},
    state: {type: String, required: true}
})

const CompanyModel = mongoose.model("Company", CompanySchema)

export {CompanyModel as Company}