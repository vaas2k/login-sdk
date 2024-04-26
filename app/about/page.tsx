import authConfig from "@/lib/NextAuth/auth";
import { getSession } from "next-auth/react";

const About = () => {

    console.log(getSession());
    
    return(
        <>
        Hellooo
        </>
    )

}

export default About;