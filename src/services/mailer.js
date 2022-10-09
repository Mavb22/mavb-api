import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
    // host: process.env.USER,
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.USER, // generated ethereal user
      pass: process.env.PASSWORD, // generated ethereal password
    },
  });
transporter.verify((error, success) => {
    console.log('Readey to send mails');
})