const nodeMailer = require("nodemailer");

const sendEmail = async (options) => {

    const transporter = nodeMailer.createTransport({
        service:process.env.SMPT_SERVICE,
        auth:{
            user:process.env.SMPT_SERVICE,
            password:process.env.SMPT_PASSWORD
        }
    })


    const mailOption = {
        from: process.env.SMPT_MAIL,
        to: option.email,
        subject: option.subject,
        text: option.message
    }

    await transporter.sendMail(mailOptions);

};

module.exports = sendEmail;