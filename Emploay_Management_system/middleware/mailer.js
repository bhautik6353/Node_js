const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: "gmail", 
    auth: {
        user: "kapuriyabhautik04@gmail.com",
        pass: "tuwietugnidrlhzb"
    }
});

module.exports.sendOtp = (to, otp) => {
    let mailoption = {
        from: "kapuriyabhautik04@gmail.com",
        to: to,
        subject: "Your Password Reset OTP",
        text: `Your OTP is ${otp}`
    };
    transporter.sendMail(mailoption, (err, info) => {
        if (err) {
            console.log("Error sending OTP email:", err);
        } else {
            console.log("OTP email sent successfully:", info.response);
        }
    });
};