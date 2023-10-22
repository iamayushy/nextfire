"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Input } from "@nextui-org/react";
import toast, {Toaster} from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [errorMessage, setErrorMessage] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [isLogin, setIsLogin] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const dataObject = [
    {
      name: "username",
      type: "text",
      placeholder: "Username",
      value: user.username,
      message: "",
    },
    {
      name: "email",
      type: "email",
      placeholder: "Enter your email",
      value: user.email,
      message: "",
    },
    {
      name: "password",
      type: "password",
      placeholder: "Password",
      value: user.password,
      message: "",
    },
  ];

  const handleFromInformation = (event: any) => {
    if (
      event.target.name === "username" ||
      event.target.name === "email" ||
      event.target.name === "password"
    ) {
      if (event.target.name === "username") {
        setErrorMessage({
          ...errorMessage,
          username:
            event.target.value.length < 3
              ? "Username must be at least 3 characters"
              : "",
        });
      } else if (event.target.name === "email") {
        setErrorMessage({
          ...errorMessage,
          email:
            event.target.value.length < 3
              ? "Email must be at least 3 characters"
              : "",
        });
      } else if (event.target.name === "password") {
        setErrorMessage({
          ...errorMessage,
          password:
            event.target.value.length < 6
              ? "Password must be at least 6 characters"
              : "",
        });
      }
    }

    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    if (
      user.username.length > 3 &&
      user.password.length > 5 &&
      user.email.length > 3
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [user]);

  const onSignUp = async () => {
    try {
        const resBody = await axios.post("/api/users/signup", user);
        if(resBody.data.success) {
            toast.success( resBody.data.message ||"Sign up successfully")
            // router.replace("/profile")
        }
        else {
            toast.error(resBody.data.message || "Sign up failed")
            if(resBody.data.message ==="User already exists") {
                // router.replace("/login")
            }
        }
    } catch (error: any) {
        toast.error(error.message || "Sign up failed")
        console.log(error);
    }
  };
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
                <Input
                  key={index}
                  type={item.type}
                  name={item.name}
                  label={item.placeholder}
                  value={item.value}
                  variant="bordered"
                  size="lg"
                  onChange={handleFromInformation}
                  errorMessage={
                    item.name === "username"
                      ? errorMessage.username
                      : item.name === "email"
                      ? errorMessage.email
                      : errorMessage.password
                  }
                />
              );
            })}
            <Button
              onClick={onSignUp}
              variant="shadow"
              color="primary"
              size="lg"
              isDisabled={isDisabled}
            >
              Sign Up
            </Button>
            <Toaster/>
          </form>
        </div>
      </div>
    </div>
  );
}
