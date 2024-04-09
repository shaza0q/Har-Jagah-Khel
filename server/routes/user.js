import express from 'express'
import bcrypt, { hash } from 'bcrypt'
import { User } from '../models/User.js'
import {Company} from '../models/Company.js'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'

const router = express.Router();

router.post('/signup', async(req, res) => {
    const {username, email, password, type, address, pincode, city, state} = req.body;
    const user = await User.findOne({email})
    const comp = await Company.findOne({email})
    if(user || comp){
        return res.json({message: "User already existing"})
    }

    const hashwassword = await bcrypt.hash(password, 10)
    var newUser;
    console.log(typeof(type))
    if(type == "Customer"){
      newUser = new User({username, email, password: hashwassword, type, address, pincode, city, state})
    }else{
      newUser = new Company({username, email, password: hashwassword, type, address, pincode, city, state})
    }
    await newUser.save()
    return res.json({status: true, message: "Record Registered"})
})

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "user is not registered" });
    }
  
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.json({ message: "password is incorrect" });
    }
  
    const token = jwt.sign({ username: user.username, email }, process.env.KEY, {
      expiresIn: "1h",
    });
    console.log("token generated....",)
    res.cookie("token", token, { httpOnly: true, maxAge: 360000 });
    return res.json({ status: true, message: "login successfully" });
  });

router.post('/forgot-password', async(req, res) => {
  const {email} = req.body;
  try{
    const user = await User.findOne({email})
    if(!user){
      return res.json({message: "User not registered"})
    }

    const token = jwt.sign({id: user._id}, process.env.KEY, {expiresIn: "1h",});

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'mohdarslaan1207@gmail.com',
        pass: 'jguu wpeq vrbc bovr'
      }
    });
    
    var mailOptions = {
      from: 'mohdarslaan1207@gmail.com',
      to: email,
      subject: 'Reset Password',
      text: `http://localhost:3000/resetPassword/${token}`
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        return res.json({message: "error sending message"})
      } else {
        return res.json({status: true, message: "sent message"})
      }
    });

  }
  catch(err){
    console.log(err);
  }
})

router.post('/reset-password/:token', async(req, res) => {
  const {token} = req.params
  const {password} = req.body
  try{
    const decoded = jwt.verify(token, process.env.KEY);
    const idn = decoded.id;
    console.log('decoded object: ', decoded)
    console.log('user id: ', decoded.id)

    const hashPasword = await bcrypt.hash(password, 10)
    await User.findByIdAndUpdate({_id: idn}, {password: hashPasword})
    return res.json({status: true, message: "updated Password"})

  }catch(err){
    return res.json(err)
    // return res.json("Invalid Token")
  }
})

const verifyUser = async(req, res, next) => {
  try{
    const token = req.cookies.token
    if(!token) return res.json({status: false, message: "no token"})

    const decoded = jwt.verify(token, process.env.KEY)
    next()
  }
  catch(err){
    return res.json(err)
  }
}


router.get('/verify',verifyUser, (req,res) => {
  return res.json({status: true, message: "authorised"})

})

router.get('/logout', (req, res) => {
  res.clearCookie('token')
  return res.json({status: true})
})

router.get('/loginData', async(req, res) => {
  const token = req.cookies.token
  console.log("token-------146",token)
  try{
    const decoded = jwt.verify(token, process.env.KEY)
    const {username, email} = decoded;
    const user = await User.findOne({ email });
    console.log(user)
    res.json({status: true, user})
  }
  catch(error){
    console.log("Eror fetching user data: ", error)
  }
})


export {router as UserRouter}