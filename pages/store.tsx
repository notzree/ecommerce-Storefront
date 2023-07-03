import { useState } from "react"
import { useRouter } from "next/router"
import { useEffect } from "react"
import products from "../products/products"
import Card from "@/components/card"
import Cart from "@/components/cart"
import { useStateContext } from "@/context/StateContext"
import Link from "next/link"
export default function Store(){
    const { showCart, setShowCart, totalQuantities } = useStateContext();

    return (
        <main>
        <div    
        className="hero h-screen w-screen"
        style={{
            backgroundImage:
                "url('https://images.unsplash.com/photo-1517816743773-6e0fd518b4a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2370&q=80')",
            }}
        >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content w-screen">
            <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">TREE STORE</h1>
            <p className="mb-5">/ Store /</p>
            <Link href="/orders" className="btn-outline btn">View my orders</Link>
            </div>
            <div className="w-full h-full flex flex-col">
                 <button className="btn btn-outline fixed top-0 right-0 mt-2 mx-12" onClick={()=>setShowCart(!showCart)}>Cart</button>
            {showCart && <Cart/>}
            <div className=" grid grid-cols-3 justify-evenly w-max">
                {products.map((product) => (
                    <Card
                    key={product.id}
                    product={product}
                    />
                )
                )}

            </div>
            </div>
           
            
        </div>
        </div>
        </main>

    )
}