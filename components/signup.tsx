'use client'
import { Box, Button, Card,Flex, Strong, Text, TextField } from "@radix-ui/themes";
import {  EnvelopeClosedIcon, EyeClosedIcon, EyeOpenIcon, LockClosedIcon, PersonIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { useState } from "react";

const Signup = () => {

    const [showPassword , setShowPassword] = useState(false);
    const [error , setError] = useState<any>(false);
    const [form , setForm ] = useState({
        name : '',
        username : '',
        email : '',
        password : '',
        confirm_password : ''
    }) 


    async function onSubmit (e:any) {
        setError(false);
        if(!form.name){setError(true); return}
    }

  return (
      <Card className="sm:w-[400px] lg:w-[550px] overflow-auto">
        <Flex className="flex flex-col items-center justify-center gap-[25px] p-[30px]">
          <Card>
            <Image src={"./next.svg"} width={90} height={60} alt="logo" />
          </Card>

          <Text>Sign into name</Text>

          {/**Name Field */}
          <Flex direction={"column"} gap={"2"}>
            <TextField.Root
              className="w-[250px]"
              placeholder={error ? 'name required' : 'name'}
              color={error && 'red'}
              variant={error && "soft"}
            >
              <TextField.Slot side="left">
                <PersonIcon />
              </TextField.Slot>
            </TextField.Root>
          </Flex>

          {/** username Field */}
          <Flex direction={"column"} gap={"2"}>
            <TextField.Root
              className="w-[250px]"
              placeholder="username"
            >
              <TextField.Slot side="left">
              <PersonIcon />
              </TextField.Slot>
            </TextField.Root>
          </Flex>

          {/* Email Field */}
          <Flex direction={"column"} gap={"2"}>
            <TextField.Root
              type="email"
              className="w-[250px]"
              placeholder="email"
              required
            >
              <TextField.Slot side="left">
                <EnvelopeClosedIcon />
              </TextField.Slot>
            </TextField.Root>
          </Flex>

          {/* Password Field */}
          <Flex direction={"column"} gap={"2"}>
            <TextField.Root
            type={showPassword ? 'text' : 'password'}
            required
              className="w-[250px]"
              placeholder="password"
            >
              <TextField.Slot side="left">
                <LockClosedIcon />
              </TextField.Slot>

              <TextField.Slot style={{cursor:'pointer'}} side="right">
                {showPassword ? 
                <EyeOpenIcon onClick={()=> { setShowPassword(false)}} />
                :
                <EyeClosedIcon onClick={()=> { setShowPassword(true)}} />
                }
              </TextField.Slot>
            </TextField.Root>
          </Flex>

          {/* Confirm Password Field */}
          <Flex direction={"column"} gap={"2"}>
            <TextField.Root
            type={showPassword ? 'text' : 'password'}
            required
              className="w-[250px]"
              placeholder="confirm password"
            >
              <TextField.Slot>
                <LockClosedIcon />
              </TextField.Slot>
            </TextField.Root>
          </Flex>

          {/* Login Button */}
          <Button
            variant={"surface"}
            style={{ width: "250px", cursor: "pointer" }}
            onSubmit={onSubmit}
          >
            Continue
          </Button>

          {/* line */}
          <Flex direction={"row"} className="items-center justify-center">
            <span
              style={{
                border: "1px solid",
                width: "60px",
                height: "0px",
                opacity: "20%",
              }}
            ></span>
            <Text size={"1"} className="px-[10px]">
              OR
            </Text>
            <span
              style={{
                border: "1px solid",
                width: "60px",
                height: "0px",
                opacity: "20%",
              }}
            ></span>
          </Flex>

          {/* login through socials */}
          
          <Flex direction={"column"} gap={"4"}>
            <Button
              variant={"surface"}
              style={{ width: "250px", cursor: "pointer" }}
            >
              <Image src={"/google.png"} width={20} height={20} alt="google" />
              Continue with Google
            </Button>
            <Button
              variant={"surface"}
              style={{ width: "250px", cursor: "pointer" }}
            >
              <Image
                src={"/facebook.png"}
                width={20}
                height={20}
                alt="facebook"
              />
              Continue with Facebook
            </Button>
          </Flex>
          

          {/* Go To Sign Up */}

          <Text size={'1'}>
            Don't have an account ?{" "}
            <Strong style={{cursor:'pointer'}}>Sign up</Strong>.
          </Text>
          
        </Flex>
      </Card>
);
};

export default Signup;
