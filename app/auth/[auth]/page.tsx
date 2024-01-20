'use client'

import Image from "next/image";
import { notFound } from 'next/navigation'
import { FormEvent, ChangeEvent, useRef, useState } from "react";
import { LoginBtn, RegisterBtn } from "../AuthButtons";
import { redirectUser } from "../authHelper";
import { useGlobalState } from "@/app/globalstatecontext";
// import { useNotification } from "@/app/notificationcontext";

export default function Auth({ params }: any) {
    params.auth !== 'login' && params.auth !== 'signup' && notFound()

    const { setState } = useGlobalState()
    // const showNotification = useNotification();

    const [isHovered, setIsHovered] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        pwd: '',
        cnfpwd: '',
    });
    const formRef = useRef(null);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const handleFormFieldValueChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const apiUrl = 'http://localhost:5000/auth';

        const requestBody: any = {
            email: formData.email,
            password: formData.pwd,
        };

        if (params.auth === 'signup') requestBody.name = formData.name;

        const endpoint = params.auth === 'login' ? '/login' : '/signup';

        try {
            const response = await fetch(apiUrl + endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(requestBody),
            });

            if (response.ok) {
                ;
                if (params.auth === 'login') {
                    // showNotification("shjdbf");
                    setState(prev => ({ ...prev, isLoggedIn: true }))
                    redirectUser("/")
                } else {
                    redirectUser("/auth/login")
                }
            } else {
                console.error('Authentication failed');
            }
        } catch (error) {
            console.error('Error during authentication:', error);
        }
    };

    return (
        <div className="relative py-24 flex justify-center gap-24 items-center bg-gray-100">
            <Image
                className="hidden md:block w-1/3 object-cover object-center"
                src="/auth.jpg"
                alt="blog"
                width={200}
                height={200}
                priority
            />
            <div className="relative sm:max-w-sm w-full">
                <div className={`bg-blue-400 shadow-lg w-full h-full rounded-3xl absolute transform transition-all ease-out duration-200 ${isHovered ? "rotate-6" : "-rotate-6"}`}></div>
                <div className={`bg-green-400 shadow-lg w-full h-full rounded-3xl absolute transform transition-all ease-out duration-200 ${!isHovered ? "rotate-6" : "-rotate-6"}`}></div>
                <div className="relative w-full h-full rounded-3xl px-8 py-10 bg-gray-100 shadow-md"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <label htmlFor="" className="block mt-3 text-lg text-gray-700 text-center font-semibold">
                        {params.auth === 'login' ? "Log in" : "Register Yourself"}
                    </label>
                    <form ref={formRef} onSubmit={handleFormSubmit} method="#" action="#" className="mt-10">

                        {
                            params.auth !== 'login' && <div>
                                <input onChange={handleFormFieldValueChange} value={formData.name} name="name" type="text" placeholder="Name" className="pl-4 mt-1 block w-full border-none bg-gray-200 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0" />
                            </div>
                        }

                        <div className="mt-7">
                            <input onChange={handleFormFieldValueChange} value={formData.email} name="email" type="email" placeholder="Email" className="pl-4 mt-1 block w-full border-none bg-gray-200 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0" />
                        </div>

                        <div className="mt-7">
                            <input onChange={handleFormFieldValueChange} value={formData.pwd} name="pwd" type="password" placeholder="Password" className="pl-4 mt-1 block w-full border-none bg-gray-200 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0" />
                        </div>

                        {
                            params.auth !== 'login' && (
                                <div className="mt-7">
                                    <input onChange={handleFormFieldValueChange} value={formData.cnfpwd} name="cnfpwd" type="password" placeholder="Confirm Password" className="pl-4 mt-1 block w-full border-none bg-gray-200 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0" />
                                </div>
                            )
                        }

                        <div className="mt-7">
                            <button type="submit" className="bg-blue-500 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
                                {params.auth === 'login' ? "Log in" : "Register"}
                            </button>
                        </div>

                        <div className="flex mt-7 items-center text-center">
                            <hr className="border-gray-300 border-1 w-12 rounded-md" />
                            <label className="block font-medium text-sm text-gray-600 w-full">
                                {params.auth === 'login' ? "Welcome Back" : "Become a member of 1StepCure"}
                            </label>
                            <hr className="border-gray-300 border-1 w-12 rounded-md" />
                        </div>

                        <div className="mt-7">
                            <div className="flex justify-center items-center">
                                <label className="mr-2" >{params.auth === 'login' ? "Don't" : "Already"} have an account?</label>
                                {
                                    params.auth !== 'login' ? <LoginBtn /> : <RegisterBtn />
                                }
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}