import User from "../../models/Users.js";
export const Confirm = async (req, res) => {
    const { token } = req.params;
    const user_token = await User.findOne({ token });
    try {
        if(user_token){
            user_token.confirmed = true;
            user_token.token = ' '
            await user_token.save();
            res.send('Thank you for confirming your email');
            // res.status(200).json({
            //     message: "User confirmed successfully",
            // });
        } else {
            res.status(400).send('User not found or confirmed');
        }
    } catch (error) {
        return res.status(400).json({ 
            error: error 
        });
    }
}