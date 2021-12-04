const nodemailer = require('nodemailer');

const config = {
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: true,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
}

const from = process.env.MAIL_FROM;

const transporter = nodemailer.createTransport(config);

module.exports = (to, subject, html) => {
    const message = {
        from,
        to,
        subject,
        html
    }
    
    transporter.sendMail(message, function(err, info) {
        if (err) {
          console.log(err)
        } else {
          console.log(info)
        }
    });
}