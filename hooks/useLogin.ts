import Cookies from "js-cookie";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import jwt, { Jwt } from "jsonwebtoken";
 export type User = {
    username: string;
    exp: number;
    accessToken: string;
  };
  type LoginResponse = {
    statusCode: number;
    body: string;
  }
  type JwtPayload= {
    username: string;
    exp: number;
    iat: number;
  }
  export const useLogin = () => {
    const router = useRouter();
    const login = async (username: string, password: string) => {
        //TO:DO: call Login API. and return user object.
      const res = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/users/sign-in",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );
      const data:LoginResponse = await res.json();
      if (data.body) {
        const {username}  = jwt.decode(data.body) as JwtPayload;
        const {exp}  = jwt.decode(data.body) as JwtPayload;
        const user:User = {
            username: username ,
            exp: exp,
            accessToken: data.body,
        }
        const cookie =JSON.stringify(user);
        
        //It wasn't working with just the cookie so I added the extra quotes, probably because it was parsing it as map
        Cookies.set("currentUser", '"'+cookie+'"');
       router.push("/store")
        return user as User
      } else if (data.statusCode == 401) {
        //I coudlnt figure out how to get CORS to work with custom HTTP codes on lambda so im returning a statusCode prop in the JSON payload
        toast.error("Not Registered");
        router.push("/register")
      }
      else{
        toast.error("Invalid Username or Password");
      }
    }
    return { login };
    
  };