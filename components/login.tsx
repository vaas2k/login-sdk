import { Box, Button, Card, Container, Flex, Strong, Text, TextField } from "@radix-ui/themes";
import { CircleIcon, DashIcon, EnvelopeClosedIcon, LockClosedIcon } from "@radix-ui/react-icons";
import Image from "next/image";

const Login = () => {

  return (
      <Card className="sm:w-[400px] lg:w-[550px]">
        <Flex className="flex flex-col items-center justify-center gap-[25px] p-[30px]">
          <Card>
            <Image src={"./next.svg"} width={90} height={60} alt="logo" />
          </Card>

          <Text>Sign into name</Text>

          {/* Email Field */}
          <Flex direction={"column"} gap={"2"}>
            <Text size={"2"}>Email</Text>
            <TextField.Root
              className="w-[250px]"
              placeholder="enter your email"
            >
              <TextField.Slot side="left">
                <EnvelopeClosedIcon />
              </TextField.Slot>
            </TextField.Root>
          </Flex>

          {/* Password Field */}
          <Flex direction={"column"} gap={"2"}>
            <Text size={"2"}>Password</Text>
            <TextField.Root
              className="w-[250px]"
              placeholder="enter your password"
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

export default Login;
