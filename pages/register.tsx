import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
export default function Home(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    return(
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
            <h1 className="mb-5 text-5xl font-bold">esness</h1>
            <p className="mb-5">/ Register /</p>
            
                <form className="">
                  <label className="label">
                    <span className="label-text text-slate-700">Username</span>
                  </label>
                  <input
                    type="text"
                    placeholder="username"
                    className="input input-bordered"
                    value = {username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                  <label className="label">
                    <span className="label-text text-slate-700">Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="password"
                    className="input input-bordered"
                    value = {password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <div>
                    <button
                  className="btn btn-ghost"
                  type="submit"
                >
                  Register
                </button>
                  </div>
                  

                  
                </form>
                
        </div>
      </div>
      </div>
    </main>
    )
}
