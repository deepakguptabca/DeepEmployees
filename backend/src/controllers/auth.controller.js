import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"

export const signup = async (req,res) =>{
    const {fullName,email,password} = req.body;
    try {
        if(!email || !fullName || !password) return res.status(400).json({message:"fill your all details"})

        if(password.length<6){
            return res.status(400).json({message:"password must be atleast 6 characters"})
        }

        const user = await User.findOne({email});

        if(user) return res.status(400).json({message: "user already exists"})

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new User({
            fullName,
            email,
            password:hashedPassword
        })

        if(newUser) {
            //generate jwt token here
            generateToken(newUser._id,res);
            await newUser.save();
            res.status(201).json({message:"new user is succesfully created",
                user_id: newUser._id,
                fullName:newUser.fullName,
                email:newUser.email,
                
            })

        }else{
            res.status(400).json({message:"invalid user data"});
        }

    } catch (error) {
        console.log("Error in signup controller",error.message)
        res.status(400).json({message:"interval server error"})
    }

}

export const login = async (req,res) =>{
     const {email,password} = req.body;
    try {
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({message:"user not found"})
        }

        const isPasswordCorrect = await bcrypt.compare(password,user.password)
        if(!isPasswordCorrect){
           return res.status(400).json({message:"your password is wrong"})
        }

        generateToken(user._id,res)

        res.status(200).json({
            _id:user._id,
            fullName:user.fullName,
            email:user.email
        })

    } catch (error) {
        console.log("error in login crendtials",error.message)
        res.status(500).json({message: "Interval server error"})
    }

}

export const logout = (req,res) =>{
    try {
        res.cookie("jwt","",{maxAge:0})
        res.status(200).json({message:"loggout successfully"})
    } catch (error) {
        console.log("error in logout controller",error.message)
    }

}