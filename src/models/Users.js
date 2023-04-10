import mongoose from "mongoose";
const { Schema, model } = mongoose;
const date = Date.now().toString(32) + Math.random().toString(32).substring(2)
const random = Math.random().toString(32).substring(2)
const UsersSchema = new Schema({
    name: {
        type: String,
        required: true,
        min: 5,
        max: 60
    },
    surname: {
        type: String,
        required: true,
        min: 5,
        max: 60
    },
    username: {
        type: String,
        required: true,
        unique: true,
        min: 5,
        max: 60
    },
    email: {
        type: String,
        required: true,
        unique: true,
        min: 10,
        max: 255
    },
    password: {
        type: String,
        required: true,
        min: 8,
        max: 255,
    },
    image : {
        type: String,
        // default:'/upload/image/usuario.png'
    },
    token: {
        type: String,
        default: date + random
    },
    confirmed: {
        type: Boolean,
        default: false
    },
    removed:{
        type:Boolean,
        default: true
    }
});
export default model("User", UsersSchema);