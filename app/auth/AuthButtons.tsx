import Link from "next/link"

export function LoginBtn() {
    return (
        <Link href='/auth/login'>
            <p className=" text-blue-500 transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
                Log in
            </p>
        </Link>
    )
}

export function RegisterBtn() {
    return (
        <Link href='/auth/signup'>
            <p className=" text-blue-500 transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
                Sign up
            </p>
        </Link>
    )
}