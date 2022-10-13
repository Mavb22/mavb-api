import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../../models/Users.js';
import {loginSchema} from '../../utils/validate-schema.js';
export const Login = async (req, res) => {
    const { error } = loginSchema.validate(req.body);
    const { email, password } = req.body;
    if (error) {
        return res.status(400).json({ 
            error: error.details[0].message 
        });
    }
    try {
        const user = await User.findOne({ email:email.toLowerCase() });
        if (!email && !password) {
            return res.status(400).json({ 
                msj: "Email or password is empty" 
            });
        }
        if (!user) {
            return res.status(400).json({
                message: "User not found"
            });
        }
        if (!user.confirmed) {
            return res.status(400).json({
                message: "User not confirmed"
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Password is incorrect"
            });
        }
        const token = jwt.sign({
            name: user.name,
            surname: user.surname,
            username: user.username,
            email: user.email
        }, process.env.JWT_SECRET, {
            expiresIn: '7d'
            });
        return res.status(200).json({
            message: "User logged in successfully",
            token: token,
        });
    } catch (error) {
        return res.status(400).json({ 
            error: error.message
        });
    }
}