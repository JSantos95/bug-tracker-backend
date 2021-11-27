const nodemailer = require('nodemailer');
import { Options } from '../interface';

export const sendEmail = (options: Options) => {
    const transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE,
        auth: ({
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        })
    });

    const mailOptions = {
        form: process.env.EMAIL_FROM,
        to: options.to,
        subject: options.subject,
        html: options.text
    };

    transporter.sendMail(mailOptions, function (err: any, info: any) {
        if (err) {
            console.log(err);
        } else {
            console.log(info)
        }
    });
}