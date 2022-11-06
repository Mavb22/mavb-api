import User from '../../models/Users.js';
import { changePasswordSchema } from '../../utils/validate-schema.js';
import dotenv from 'dotenv';
dotenv.config();
export const ChangePassword = async (req, res) => {
    const { error } = changePasswordSchema.validate(req.body);
    const {new_password, confirm_password} = req.body;
    const { userId } = req.params;
    const user = await User.findOne({_id: userId,confirmed: true});
    if(!user){
        return res.status(400).json({
            message: "User not found"
        });
    }
    const { password } = user;
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
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(new_password, salt);
        await User.findOneAndUpdate({ userId }, { password: hashedPassword });
        return res.status(200).json({
            message: "Password changed successfully"
        });
    } catch (error) {
        return res.status(400).json({ 
            error: error 
        });
    }
}
