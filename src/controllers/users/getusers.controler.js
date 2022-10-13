import  User  from '../../models/Users.js';
export const GetUsers = async (req, res) => {
    const users = await User.find({ 
        confirmed: true,
        show:true
    }, ' name surname username image');
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
}