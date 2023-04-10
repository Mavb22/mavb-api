import nodemailer from 'nodemailer';
import dotenv from "dotenv";
dotenv.config();
export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.USER,
      pass: process.env.PASSWORD, 
    },
});
transporter.verify().then(()=> {
  console.log('Readey to send mails');
}); 
