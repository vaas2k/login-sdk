'use client'
import { Badge, Box, Button, Card, Flex, Strong, Text, TextField } from "@radix-ui/themes";
import { EnvelopeClosedIcon, EyeClosedIcon, EyeOpenIcon, LockClosedIcon, PersonIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { useState } from "react";
import { signup } from "@/types/types";
import { registerUser } from "@/lib/authactions/signupAction";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {

    const router = useRouter();
    const [credError ,setcredError] = useState('');
    const [loading , setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<any>({
        name: false,
        username: false,
        email: false,
        password: false,
        confirm_password: false,
        passwordFormatError: false,
        emailFormatError: false,
        usernameLengthError: false,
    });

    const handleError = (field:any) => error[field];

    const [form, setForm] = useState<signup>({
        name: "",
        username: "",
        email: "",
        password: "",
        confirm_password: "", 
    });

    console.log(form);

    async function onSubmit(e:any) {
        e.preventDefault();
        setLoading(true);
        setError({});
        setcredError('');

        setError({ ...error, name: !form.name, username: !form.username, email: !form.email, password: !form.password, confirm_password: !form.confirm_password });
        if (!form.name || !form.username || !form.email || !form.password || !form.confirm_password) {
            setLoading(false);
            return;
        }
        if (form.password !== form.confirm_password) {
            setError({ ...error, password: true, confirm_password: true });
            setLoading(false);
            return;
        }
        if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(form.password)) {
            setError({ passwordFormatError: true });
            setLoading(false);
            return;
        }
        if (!/^[a-zA-Z0-9._%+-]+@(?:gmail|hotmail|outlook|yahoo)\.[a-zA-Z]{2,}$/.test(form.email)) {
            setError({  emailFormatError: true });
            setLoading(false);
            return;
        }
        if (form.username.length < 4) {
            setError({  usernameLengthError: true });
            setLoading(false);
            return;
        }

        try {
            const res = await registerUser(form);

            if (res == 'email taken') {
                setcredError('email');
                setLoading(false);
            } else if (res == 'username taken') {
                setcredError('username');
                setLoading(false);
            } else {
                toast.success("Account Created Successfully", {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                setLoading(false);
                setTimeout(() => { router.push('/sign-in'); }, 3000)
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Card className="sm:w-[400px] lg:w-[480px] overflow-auto drop-shadow-2xl">
            <ToastContainer  />
            <Flex className="flex flex-col items-center justify-center gap-[25px] p-[30px]">
                <Card>
                    <Image src={"/next.svg"} width={90} height={60} alt="logo" />
                </Card>

                <Text>Sign Up</Text>

                {/* Name Field */}
                <Flex direction={"column"} gap={"2"}>
                    <TextField.Root
                        className="w-[250px]"
                        placeholder={handleError("name") ? "Name required" : "Name"}
                        color={handleError("name") && "red"}
                        variant={handleError("name") && "soft"}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                    >
                        <TextField.Slot side="left">
                            <PersonIcon />
                        </TextField.Slot>
                    </TextField.Root>
                </Flex>

                {/* Username Field */}
                <Flex direction={"column"} gap={"2"}>
                    <TextField.Root
                        className="w-[250px]"
                        placeholder={handleError("username") ? "Username required" : "Username" }
                        color={handleError("username") && "red"}
                        variant={handleError("username") && "soft"}
                        onChange={(e) => setForm({ ...form, username: e.target.value })}
                    >
                        <TextField.Slot side="left">
                            <PersonIcon />
                        </TextField.Slot>
                    </TextField.Root>
                </Flex>
                {error.usernameLengthError && <Badge color="red" variant='soft'>Username must be at least 4 characters long</Badge>}
                {credError == 'username' && <Badge color="red" variant='soft'>Username already taken</Badge>}

                {/* Email Field */}
                <Flex direction={"column"} gap={"2"}>
                    <TextField.Root
                        type="email"
                        className="w-[250px]"
                        placeholder={handleError("email") ? "Email required" : "Email"}
                        color={handleError("email") && "red"}
                        variant={handleError("email") && "soft"}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                    >
                        <TextField.Slot side="left">
                            <EnvelopeClosedIcon />
                        </TextField.Slot>
                    </TextField.Root>
                </Flex>
                {error.emailFormatError && <Badge color="red" variant='soft'>Please enter a valid email address</Badge>}
                {credError == 'email' && <Badge color="red" variant='soft'>Email already registered</Badge>}

                {/* Password Field */}
                <Flex direction={"column"} gap={"2"}>
                    <TextField.Root
                        type={showPassword ? "text" : "password"}
                        className="w-[250px]"
                        placeholder={handleError("password") ? "Password required" : "Password"}
                        color={handleError("password") && "red"}
                        variant={handleError("password") && "soft"}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                    >
                        <TextField.Slot side="left">
                            <LockClosedIcon />
                        </TextField.Slot>
                        <TextField.Slot side="right">
                            <Button variant="ghost" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? "Hide password" : "Show password"}>
                                {showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
                            </Button>
                        </TextField.Slot>
                    </TextField.Root>
                </Flex>
                {error.passwordFormatError && <Badge className="flex flex-wrap" size={'1'} color="red" variant='soft'>Minimum eight characters, at least one letter and one number</Badge>}

                {/* Confirm Password Field */}
                <Flex direction={"column"} gap={"2"}>
                    <TextField.Root
                        type={showPassword ? "text" : "password"}
                        className="w-[250px]"
                        placeholder={handleError("confirm_password") ? "Confirm Password required" : "Confirm Password"}
                        color={handleError("confirm_password") && "red"}
                        variant={handleError("confirm_password") && "soft"}
                        onChange={(e) => setForm({ ...form, confirm_password: e.target.value })}
                    >
                        <TextField.Slot side="left">
                            <LockClosedIcon />
                        </TextField.Slot>
                    </TextField.Root>
                    {error.confirm_password && <Text color="red" size="1">Passwords do not match</Text>}
                </Flex>

                {/* Submit Button */}
                <Button
                    style={{ width: "250px", cursor: "pointer" }}
                    onClick={onSubmit}
                >
                    Continue
                </Button>

                {/* Line */}
                <Flex direction={"row"} className="items-center justify-center">
                    <span style={{ border: "1px solid", width: "60px", height: "0px", opacity: "20%" }}></span>
                    <Text size={"1"} className="px-[10px]">OR</Text>
                    <span style={{ border: "1px solid", width: "60px", height: "0px", opacity: "20%" }}></span>
                </Flex>

                {/* Login through socials */}
                <Flex direction={"column"} gap={"4"}>
                    <Button 
                    
                    variant={"surface"} 
                    style={{ width: "250px", cursor: "pointer" }}
                    onClick={()=>{
                         signIn('google');
                    }}
                    >
                        <Image src={"/google.png"} width={20} height={20} alt="google" />
                        Continue with Google
                    </Button>
                    {/** 
                     * 
                    <Button variant={"surface"} style={{ width: "250px", cursor: "pointer" }}>
                        <Image src={"/facebook.png"} width={20} height={20} alt="facebook" />
                        Continue with Facebook
                    </Button>
                    */}
                </Flex>

                {/* Go To Sign Up */}
                <Text size={'1'}>
                    Already registered?{" "}
                    <Link href={"/sign-in"}>
                    <Strong style={{ cursor: 'pointer' }}>Sign in</Strong>.
                    </Link>
                </Text>
            </Flex>
        </Card>
    );
};

export default Signup;
