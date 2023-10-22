"use client"
import Link from "next/link";
import {useRouter} from "next/navigation";
import axios from "axios";
import { useState } from "react";
import { Button, Input } from "@nextui-org/react";



export default function LoginPage () {
    const [user, setUser] = useState({
        password: "",
        content: ""
    })

    const dataObject  = [
        {
            name: "content",
            type: "text",
            placeholder: "Enter your email or username",
            value: user.content
        },
        {
            name: "password",
            type: "password",
            placeholder: "Enter your password",
            value: user.password
        }
    ]

    const onSignIn = async () => {
        try {
            const rspBody = await axios.post("/api/users/login", user)
            console.log(rspBody)
            
        } catch (error) {
            
        }
    }
    return (
        <div className="grid place-items-center h-[100vh]">
            <div>
            <h1 className="font-black text-2xl py-8 text-center">
                Signup For New Adventure
            </h1>
            <div className="w-[32rem]">
                <form className="flex flex-col gap-4">
                    {dataObject.map((item, index) => {
                        return (
                            <Input key={index} 
                            type={item.type}
                            name={item.name}
                            label={item.placeholder} 
                            value={item.value}
                            variant="bordered" size="lg"
                            onChange={(event) => {
                                setUser({
                                    ...user,
                                    [item.name]: event.target.value
                                })
                            }}
                            />
                        )
                    })}
                    <Button onClick={onSignIn} variant="shadow" color="primary"
                    size="lg"
                    >Log In</Button>
                </form>
            </div>
            </div>
        </div>
    )
}