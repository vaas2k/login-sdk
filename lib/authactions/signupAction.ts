'use server'

import { signup } from "@/types/types";
import { connectToDatabase } from "../database/database";
import User from "../database/model/user";
import * as bcrypt from 'bcryptjs';


export async function registerUser(user:signup) {

    try{
        await connectToDatabase();

        const email = await User.findOne({email : user.email});
        if(email){
            return 'email taken';
        }
        const username = await User.findOne({username : user.username});
        if(username){
            return 'username taken';
        }

        const hashed_password = await bcrypt.hash(user.password!,10);
        console.log(hashed_password);
        const newuser = new User({
            name : user.name,
            username : user.username,
            email : user.email,
            password : hashed_password
        })

        await newuser.save();
        return JSON.stringify(newuser);
        
    }catch(error){
        console.log(error);
    }
}