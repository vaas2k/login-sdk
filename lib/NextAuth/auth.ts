import { NextAuthOptions } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google";
import { connectToDatabase } from "../database/database";
import User from "../database/model/user";
import * as bcrypt from 'bcryptjs'
import { login } from "@/types/types";

const authConfig: NextAuthOptions = {
    providers : [
        Credentials({
            name : 'Sign in',
            credentials:{
                username:{
                    label :'Username',
                    type : 'text',
                    placeholder:'username'
                },
                email : {
                    label:'Email',
                    type :'email',
                    placeholder: 'Enter Your Email'
                },
                password:{label:'Password',type:'password'}
            },
            async authorize(credentials){

                console.log(credentials);
                if(!credentials || !credentials.email || !credentials.password) {
                    return null;
                }
                
                try{
                    await connectToDatabase();
                    const user = await User.findOne({email : credentials.email});
                    if(!user){return null;}
                    const decryptPassword = bcrypt.compareSync(credentials.password,user.password);
                    console.log(decryptPassword);
                    console.log(user);
                    
                    if(user && decryptPassword === false){
                        return null
                    }
                    else if(!user){
                        return null;
                    }
                    return user;

                }catch(error){
                    console.log(error)
                    return null
                }

            },
        }),
        GoogleProvider({
            clientId:process.env.GOOGLE_CLIENT_ID! as string,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET! as string,
        }),
    ],
    callbacks : {
        async signIn({account, profile,user}) {
            //if custom sign in then return user from authorize func
            if(account?.provider === 'credentials'){
                return user;
            }
            else if (account?.provider !== 'credentials' && profile?.email) {
                try {
                    
                    await connectToDatabase();
    
                    const is_user = await User.findOne({email : profile.email});
                    if(is_user && is_user.OAuth_ID){
                        console.log(is_user);
                        return is_user;
                    }
                    // if user signedup manually then add providers data to theri profile
                    else if(is_user && !is_user.OAuth_ID){
                        console.log('enter update')
                        const updatedUser = await User.findOneAndUpdate(
                            { email: profile.email },
                            {
                                image: profile.picture || 'default-image.png',
                                name: profile.name,
                                OAuth_ID: account!.providerAccountId
                            },
                            { new: true } // This option returns the modified document instead of the original one
                        );
                        console.log('updated User');
                        console.log(updatedUser);
                        return updatedUser;
                    }
                    else{
                        const newUser = new User({
                            image: profile?.picture! || 'default-image.png',
                            email: profile.email,
                            username: profile.name,
                            OAuth_ID: account!.providerAccountId // Assuming OAuth_ID is a property
                        });
    
                        await newUser.save();
                        console.log(newUser)
                        return newUser;
                    }
                    
                } catch (error) {
                    return null; 
                }
            }
            else{
                return null;
            }
        },   
    }
    
}

export default authConfig;
