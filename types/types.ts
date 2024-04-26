
interface signup {
    name : string | undefined,
    username : string | undefined,
    email : string | undefined,
    password: string  | undefined,
    confirm_password: string  | undefined,
}

interface login {
    username ?: string | undefined,
    email ?: string | undefined,
    password: string  | undefined,
}

export type {
    signup,
    login
}