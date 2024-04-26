"use client";
import {
  verifyEmail_sendCode,
  verify_PinCode,
} from "@/lib/authactions/resetAction";
import { EnvelopeClosedIcon, CheckIcon } from "@radix-ui/react-icons";
import {
  Card,
  Container,
  Flex,
  Text,
  TextArea,
  Button,
  TextField,
  Badge,
  Box,
} from "@radix-ui/themes";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const ResetPassword = () => {
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [verified, setVerified] = useState(false);
  const [pin, setPin] = useState<number>();
  const [pinButton, setPinButton] = useState(false);
  const [pinError, setPinError] = useState("");

  const [loading, setLoading] = useState(false);

  const router = useRouter();
  console.log(email);
  console.log(pin);

  async function checkEmail() {
    setEmailError("");
    setVerified(false);
    setLoading(true);
    try {
      const user = await verifyEmail_sendCode(email);
      if (!user) {
        setEmailError("Email Doesnt Exist");
        setLoading(false);
        return;
      }
      console.log(user);
      setVerified(true);
      setPinButton(true);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  async function verifyPin() {
    setPinError("");
    setLoading(true);
    try {
      const verify = await verify_PinCode(pin!);
      if (!verify) {
        setPinError("Invalid Pin, Try Reseting Again");
      } else {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  const handlePinChange = (newPin: any) => {
    setPin(newPin);
  };

  return (
    <Box maxWidth={"lg:560px"} pt={"5"}>
      <Flex className="flex flex-col items-center justify-center gap-[25px] p-[30px]">
        <Card className="w-[300px]">
          <Text
            className=" flex items-center justify-center"
            weight={"bold"}
            size={"3"}
          >
            Reset Password
          </Text>
        </Card>

        {/* Email Field */}
        <Flex direction={"column"} gap={"2"}>
          <Text size={"2"}>Enter your email address</Text>
          <TextField.Root
            type="email"
            className="w-[300px]"
            name="email"
            value={email}
            disabled={verified}
            onChange={(e: any) => setEmail(e.target.value)}
          >
            <TextField.Slot side="left">
              <EnvelopeClosedIcon />
            </TextField.Slot>

            {verified && (
              <TextField.Slot side="right">
                <CheckIcon />
              </TextField.Slot>
            )}
          </TextField.Root>
        </Flex>
        {emailError && (
          <Badge size={"1"} color="red">
            {" "}
            {emailError}{" "}
          </Badge>
        )}
        {verified && (
          <Badge
            size={"1"}
            className="w-[300px] flex items-center justify-center"
            color="green"
          >
            {" "}
            Check your email for code{" "}
          </Badge>
        )}

        {verified && (
          <>
            {/* InputOTP component for entering the PIN */}
            <InputOTP
              maxLength={6}
              pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
              onChange={handlePinChange} // This will call handlePinChange with the new PIN
            >
              <InputOTPGroup>
                {[...Array(6)].map((_, index) => (
                  <InputOTPSlot key={index} index={index} />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </>
        )}
        {!pinButton && (
          <Flex className="flex items-center justify-center gap-[20px]">
            <Button
              style={{ width: "140px", cursor: "pointer" }}
              onClick={checkEmail}
              loading={loading}
            >
              Send Code
            </Button>

            <Link href={"/sign-in"}>
              <Button style={{ width: "200", cursor: "pointer" }}>
                Go Back
              </Button>
            </Link>
          </Flex>
        )}

        {pinButton && (
          <Button
            style={{ width: "300px", cursor: "pointer" }}
            loading={loading}
            onClick={verifyPin}
          >
            Verify
          </Button>
        )}

        {pinError && (
          <Badge size={"1"} color="red">
            {" "}
            {pinError}{" "}
          </Badge>
        )}
      </Flex>
    </Box>
  );
};

export default ResetPassword;
