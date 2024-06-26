const userValidator = require('../validators/userValidator');
const bcryptjs=require('bcryptjs');
const User=require('../models/userModel');
const jwt=require('jsonwebtoken')



const signUp=async(req,res)=>{
    try{
        const{email,password,name,age,city,zipCode}=req.body;
        const { error } = userValidator.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        const hashedPass=bcryptjs.hashSync(password,10);
        const newUser=new User({email,password:hashedPass,name,age,city,zipCode})
        await newUser.save()
        res.json("Signup successful");
    }
    catch(error){
        res.status(500).send(error.message);
    }
}

const logIn=async(req,res)=>{
    try{
        const{email,password}=req.body;
        if(!email || !password || email==='' || password===''){
            return res.status(400).send("Email and password are required");
        }
        const validUser=await User.findOne({email});
        if(!validUser){
            return res.status(400).send("Invalid email or password");
        }
        const validPassword = bcryptjs.compareSync(password,validUser.password);
        if(!validPassword){
            return res.status(400).send("Invalid email or password");
        }
        const token=jwt.sign({id:validUser._id},process.env.JWT_SECRET,{expiresIn:'2d'})
        const{password:pass,...rest}=validUser._doc
        res.status(200).cookie('access_token',token,{
            httpOnly:true
        }).json(rest);
    }catch(error){
        res.status(500).json({message:"Unable to Log In"})
    }
}

const logOut=async(req,res)=>{
    try{
        res.clearCookie('access_token').json("Logged Out Successfully");
    }catch(error){
        res.status(500).json({message:"Unable to Log Out"})
    }
}


module.exports={signUp,logIn,logOut}