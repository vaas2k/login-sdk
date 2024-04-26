'use server'

import { connectToDatabase } from "../database/database";
import reset_token from "../database/model/reset_token";
import User from "../database/model/user";
import mailgun from 'mailgun-js'

const DOMAIN = process.env.DOMAIN;
const mg = mailgun({ apiKey: process.env.MAILGUN_API_KEY!, domain: DOMAIN! });

export async function verifyEmail_sendCode (email : string ) {
    if(!email){return null;}
    
    try{
        await connectToDatabase();
        
        // verify user email address
        console.log(email);
        const user = await User.findOne({email : email});
        if(!user) {
            console.log('null');
            return null;
        }

        console.log('1');
        // generate a six digit pin code
        const token = (Math.floor(100000 + Math.random() * 900000));
        const reset_Token = new reset_token({
            userID : user._id,
            token : token
        })
        console.log('2');

        await reset_Token.save();

        console.log('3');
        // send that pin code at user email address
        const emailData = {
        from: 'gyikxx2@gmail.com',
        to: email,
        subject: 'Password Reset Code',
        text: `Your password reset code is: ${token}`
        };
        console.log('4');
        // Send the email
       mg.messages().send(emailData, (error, body) => {
        if (error) {
          console.error('Error sending email:', error);
        } else {
          console.log('Email sent successfully:', body);
        }
       });
        // return that pin code
        return JSON.parse(JSON.stringify(token));
    }catch(error){
        console.log(error);
    }
}

export async function verify_PinCode (token :number ) { 

    try{

        await connectToDatabase();
        const passwordResetToken = await reset_token.findOne({
            token: token,
            createdAt: { $gt: new Date(Date.now() - 1000 * 60 * 60 * 4) },
            resetAt: null,
          });
        if(!passwordResetToken){
            console.log(3);
            return null;
        }  
        return true;
    }catch(error){
        console.log(error);
    }
}
