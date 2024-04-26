'use client'
import authConfig from "@/lib/NextAuth/auth";
import { Button } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Home() {

  const {data : session , status} = useSession();
  const [user , setUser] = useState<any>({})
  console.log(user);
  console.log(status)
  useEffect(()=>{
    setUser(session?.user);
  },[session,status])
  return (
   <div className="flex items-center justify-center gap-[100px] min-h-screen">
       <Button  loading={status == 'loading' ? true : false}>
        {status == 'unauthenticated' ? 'un-Signed' : "Signed"}
       </Button>

       <Button onClick={()=>{ signOut()}}>
        sign-out
       </Button>
   </div>
  );
}
