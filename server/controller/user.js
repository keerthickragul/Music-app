const {userModel} = require("../model/user")
const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");

const register = async(req,res) =>{
    try{
        const newUser = await new userModel({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password
        })
        await newUser.save()
        res.status(201).send({message:"user created successfully"});
    }
    catch(err){
        res.status(500).json({message:err})
    }
}

const login = async(req,res) =>{
    const {email,password} = req.body;
    const user = await userModel.findOne({email})
    try{
        if(!user){
            return res.status(404).json({message: "User not found"});
        }
        const isValidPassword = await bcrypt.compare(password,user.password);
        if(!isValidPassword){
            return res.status(401).json({message: "Invalid Password"})
        }
        const token = jwt.sign({userId: user._id,email:user.email,name:user.name}, "secret_key",{
            expiresIn:"1h",
        });
        res.json({token});
        
    }
    catch(err){
        res.status(500).json({message : err}) 
        console.log(err);
    }
}

module.exports = {register,login}

