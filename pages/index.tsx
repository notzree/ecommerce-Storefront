import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";

import { useLogin } from "@/hooks/useLogin";
declare const window: any;
export default function Home() {

  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const {login} = useLogin();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (username.length < 4 || password.length < 4) {
      toast.error(
        "Please enter a username and password with at least 4 characters"
      );
      return;
    }
    try {
      login(username,password);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <main>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1517816743773-6e0fd518b4a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2370&q=80')",
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">TREE STORE</h1>
            <p className="mb-5">/ Sign-in /</p>

            <form className="" onSubmit={handleSubmit}>
              <label className="label px-10">
                <span className="label-text text-slate-700">Username</span>
              </label>
              <input
                type="text"
                placeholder="username"
                className="input input-bordered"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <label className="label px-10">
                <span className="label-text text-slate-700">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div>
                <button className="btn btn-outline btn-md my-2" type="submit">
                  sign-in
                </button>
              </div>
            </form>
            <p>
              Don&apos;t have an account?
              <Link href="/register" className=" underline">
                {" "}
                Register
              </Link>
            </p>
            <p className="my-2">Check out the repository: <a href="https://github.com/notzree/ecommerce-Storefront" className="underline">frontend</a>, <a href="https://github.com/notzree/jitto_lambda_functions" className="underline">backend</a></p>
          </div>
        </div>
      </div>
    </main>
  );
}
