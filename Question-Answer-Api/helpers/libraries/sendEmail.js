const nodemailer = require("nodemailer");


const { SMTP_HOST, SMTP_PORT, SMTP_USERNAME, SMTP_PASSWORD } = process.env;
const sendEmail = async (mailOptions) => {
    let transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: SMTP_PORT,
        auth: {
            user: SMTP_USERNAME,
            pass: SMTP_PASSWORD
        }
    });

    let info = await transporter.sendMail(mailOptions);
    console.log("Message send " + info.messageId);
}



module.exports = sendEmail;