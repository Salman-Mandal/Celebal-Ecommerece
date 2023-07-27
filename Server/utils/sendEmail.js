const nodeMailer = require("nodemailer");
// const SMPT_SERVICE = "gmail";
// const SMPT_MAIL = "salmanmandal23313@gmail.com";
// const SMPT_PASSWORD = "excubohtshzznhac";
require("dotenv").config();


const sendEmail = async (options) => {
    const transporter = nodeMailer.createTransport({
        host:"smpt.gmail.com",
        port:465,
        service: process.env.SMPT_SERVICE,
        auth: {
            user: process.env.SMPT_MAIL,
            pass: process.env.SMPT_PASSWORD
        }
    });

    const mailOptions = {
        from: SMPT_MAIL,
        to: options.email,
        subject: options.subject,
        text: options.message
    };

    await transporter.sendMail(mailOptions);
}

module.exports = sendEmail;