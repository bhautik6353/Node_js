const nodemailer=require("nodemailer")

const transport=nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"kapuriyabhautik04@gmail.com",
        pass:"tuwietugnidrlhzb",
    }
})

module.exports.sendotp=(to,otp)=>{
    let mailoptions={
        from:"kapuriyabhautik04@gmail.com",
        to:to,
        subject:"Your Seo_Dash Recover Password OTP",
        text:`Your OTP is ${otp}`
    }
    transport.sendMail(mailoptions,(err)=>{
        if(err){
            console.log(err)
        }else{
            console.log("Otp Send successfully...")

        }

    })
}