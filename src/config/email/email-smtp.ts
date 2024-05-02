import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
    host: "smtp.hostinger.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
  });
  console.log('Email sent successfully:', process.env.EMAIL_USER);