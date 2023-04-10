import bcrypt from 'bcrypt';
import  User  from '../../models/Users.js';
import {registerSchema} from '../../utils/validate-schema.js';
import { transporter } from '../../services/mailer.js';
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
                html: `<b>Please click on the link to confirm email</b>
                <a href="${process.env.SEND_EMAIL}api/users/confirm/${result.token}">${process.env.SEND_EMAIL}api/users/confirm/${result.token}</a>`, // html body
            });
            return res.status(200).json({
                 message: "User created, please check your email to confirm your account",
            });
        }
    } catch (error) {
        res.status(400).json({
            error: error.message,       
        });
        
    }
}