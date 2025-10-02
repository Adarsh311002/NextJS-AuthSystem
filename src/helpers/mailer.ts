import nodemailer from 'nodemailer'
import User from '@/models/userModel'
import bcrypt from 'bcryptjs'

export const sendEmail = async({email,emailType,userId}: any ) => {
    try {
        //create a hashed token
        const hashedToken = await bcrypt.hash(userId.toString(),10)

        if(emailType === "VERIFY"){
            await User.findByIdAndUpdate(userId,{
                verifyToken : hashedToken,
                verifyTokenExpiry: Date.now() + 3600000
            })
        } else if(emailType === "RESET"){
            await User.findByIdAndUpdate(userId,{
                forgotPasswordToken : hashedToken,
                forgotPasswordTokenExpiry : Date.now() + 3600000
            })
        };

    // Looking to send emails in production? Check out our Email API/SMTP product!
        var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: process.env.USER,
            pass: process.env.PASS
        }
        });

         const mailOptions = {
            from:'addy74884@gmail.com',
            to:email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">
            here</a> to ${emailType === "VERIFY" ? "Verify your email" : "Reset your password"}</p>`
         }

         const mailResponse = await transport.sendEmail(mailOptions);
         return mailResponse;
        
    } catch (error:any) {
        throw new Error(error.message);
        
    }
}

