
import Cookies from "js-cookie";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
  export const useRegister = () => {
    const router = useRouter();
    const register = async (username: string, password: string) => {
        //TO:DO: Register user and return nothing.
       const res = await fetch(
            process.env.NEXT_PUBLIC_API_URL + "/users/register",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ username, password }),
            }
          );
          const data = await res.json();
          if (res.ok && data.body) {
            toast.success("Registered, Please sign-in!");
            router.push("/");
          } else {
            toast.error("Something went wrong, maybe you are already registered?");
          }
    }
    return { register };
    
  };

