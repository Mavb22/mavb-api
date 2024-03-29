import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import User from "../models/Users.js";
import {registerSchema , loginSchema, changePasswordSchema} from '../utils/validate-schema.js';
import {transporter} from '../services/mailer.js';
dotenv.config();
export const GetUsers = async (req, res) => {
    const users = await User.find({ 
        confirmed: true
    });
    if (!users) {
        return res.status(400).json({ 
            error: "Users not found" 
        });
    }

    res.status(200).json({
        message: "Users found",
        users: {
            users
        }
    });
}//✅
export const Register = async (req, res) => {
    const { error } = registerSchema.validate(req.body);
    const {name,surname, username, email, password, confirm_password} = req.body;
    const err = []
    if (error) {
        return res.status(400).json({ 
            error: error.details[0].message 
        });
    }

    const emailExist = await User.findOne({email:email.toLowerCase()});
    const usernameExist = await User.findOne({ username:username.toLowerCase()});
    if (emailExist) {
        err.push('Email already exist');
    }
    if (usernameExist) {
        err.push('Username already exist');
    }
    if (err.length > 0) {
        return res.status(403).json({ 
            error: err 
        });
    }
    try {
        if (name && surname && username && email && password && confirm_password) {
            if (password !== confirm_password) {
                return res.status(400).json({ 
                    error: "Password and confirm password are not the same" 
                });
            }
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const user = new User({
                name : name.toLowerCase(),
                surname: surname.toLowerCase(),
                username: username.toLowerCase(),
                email: email.toLowerCase(),
                password: hashedPassword});
            const result = await user.save();
                if (!result) {
                    return res.status(400).json({ 
                        error: "User not created" 
                    });
                }
            await transporter.sendMail({
                from: 'Confirm email <mavb.gmail.com>', // sender address
                to: email, // list of receivers
                subject: "Confirm email", // Subject line
                html: `
                <b>Please click on the link to confirm email</b>
                <a href="http://localhost:3000/api/users/confirm/${result.token}">http://localhost:3000/api/users/confirm/${result.token}</a>`, // html body
            });
            return res.status(200).json({
                message: "User created, please check your email to confirm your account",
            });
        }
    } catch (error) {
        return res.status(400).json({
            error: error.message
        });
    }
}//✅✅
 
export const ChangePassword = async (req, res) => {
    const { error } = changePasswordSchema.validate(req.body);
    const {new_password, confirm_password} = req.body;
    const { userId } = req.params;
    const user = await User.findOne({_id: userId});
    if(!user){
        return res.status(400).json({
            message: "User not found"
        });
    }
    const { email,password,confirmed } = user;
    if (error) {
        return res.status(400).json({
            error: error.details[0].message
        });
    }
    if (req.user.email !== email) {
        return res.status(400).json({
            message: "User not authorized"
        });
    }
    if(new_password !== confirm_password){
        return res.status(400).json({
            message: "Password and confirm password are not the same"
        });
    }
    const isMatch = await bcrypt.compare(new_password, password);
    if (isMatch) {
        return res.status(400).json({
            message: "New password is equal to old password"
        });
    }
    
    try {
        if(!email && !password){
            return res.status(400).json({
                message: "User not found"
            });
        }
        if(!confirmed){
            return res.status(400).json({
                message: "User not confirmed"
            });
        }
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(new_password, salt);
        const user = await User.findOneAndUpdate({ userId }, { password: hashedPassword });
        if (!user) {
            return res.status(400).json({
                message: "User not found"
            });
        }
        return res.status(200).json({
            message: "Password changed successfully"
        });
    } catch (error) {
        return res.status(400).json({ 
            error: error 
        });
    }
}//✅✅
export const ForgotPassword = async (req, res) => {
    const { error } = changePasswordSchema.validate(req.body);
    const {new_password, confirm_password} = req.body;
    const { userId } = req.params;
    const user = await User.findOne({_id: userId});
    if(!user){
        return res.status(400).json({
            message: "User not found"
        });
    }
    const { email,password,confirmed } = user;
    if (error) {
        return res.status(400).json({
            error: error.details[0].message
        });
    }
    if(new_password !== confirm_password){
        return res.status(400).json({
            message: "Password and confirm password are not the same"
        });
    }
    const isMatch = await bcrypt.compare(new_password, password);
    if (isMatch) {
        return res.status(400).json({
            message: "New password is equal to old password"
        });
    }
    try {
        if(!email && !password){
            return res.status(400).json({
                message: "User not found"
            });
        }
        if(!confirmed){
            return res.status(400).json({
                message: "User not confirmed"
            });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(new_password, salt);
        const user = await User.findOneAndUpdate({ userId }, { password: hashedPassword });
        if (!user) {
            return res.status(400).json({
                message: "User not found"
            });
        }
        return res.status(200).json({
            message: "Password changed successfully"
        });
    } catch (error) {
        return res.status(400).json({ 
            error: error 
        });
    }
}//✅✅
export const UpdateDataUser = async (req, res) => {
    const { name, surname, username } = req.body;
    const { userId } = req.params;
    const {email, confirmed} = await User.findOne({ userId });
    const usernameExist = await User.findOne({ username});
    if (usernameExist){
        return res.status(400).json({
            error: "Username already exist"
        });
    }
    if(name && surname && username ){
        if (confirmed){
            if (email){
                if (req.user.email){
                    if(email === req.user.email){
                        const user = await User.findOneAndUpdate({ email }, { name, surname, username });
                        if (user) {
                            res.status(200).json({
                                message: "User updated successfully",
                            });
                        } else {
                            return res.status(400).json({
                                error: "User not updated"
                            });
                        }
                    } else {
                        return res.status(400).json({
                            error: "Not authorized"
                        });
                    }
                } else {
                    return res.status(400).json({
                        error: "Not user logged"
                    });
                }
            } else{
                return res.status(400).json({ 
                    error: "User not found"
                });
            }
        } else {
            return res.status(400).json({
                error: "User not confirmed"
            });
        }
    }
}//✅
export const DeleteUser = async (req, res) => {
    const { userId } = req.params;
    const {email, confirmed} = await User.findOne({ userId });
    if(confirmed){
        if (email){
            if(req.user.email){
                if (email === req.user.email){
                    const user = await User.findOneAndDelete({ email });
                    if (user) {
                        res.status(200).json({
                            message: "User deleted successfully",
                        });
                    } else {
                        return res.status(400).json({
                            error: "User not deleted"
                        });
                    } 
                } else{
                    return res.status(400).json({
                        error: "Not authorized"
                    });
                }
            } else {
                return res.status(400).json({
                    error: "Not user logged"
                });
            }
        } else{
            return res.status(400).json({ 
                error: "User not found"
            });
        }
    } else {
        return res.status(400).json({
            error: "User not confirmed"
        });
    }
}//✅
export const UpdateImage = async (req, res) => {
    console.log(req.file);
    if(req.file){
        res.status(200).json({
            message: "Listo"
        });
    }
}
 