import jwt from 'jsonwebtoken';
import User from '../models/Users.js';
export const auth = async (req, res, next) => {
    if (req.headers.authenticated) {
        const token = req.headers.authenticated.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ email: decoded.email });
        if (user) {
            req.user = {email:user.email, id:user._id};
            return next();
        } else {
            return res.status(400).json({
                error: "User not found"
            });
        }
    }else{
        return res.status(400).json({
            error: "Token not found"
        });
    }
}