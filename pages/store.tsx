import { useState } from "react"
import { useRouter } from "next/router"
import { useEffect } from "react"
import products from "../products/products"
import Card from "@/components/card"
import Cart from "@/components/cart"
import { useStateContext } from "@/context/StateContext"
export default function Store(){
    const { showCart, setShowCart, totalQuantities } = useStateContext();

    return (
        <main>
        <div    
        className="hero min-h-screen h-screen w-screen"
        style={{
            backgroundImage:
                "url('https://images.unsplash.com/photo-1517816743773-6e0fd518b4a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2370&q=80')",
            }}
        >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
            <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">esness</h1>
            <p className="mb-5">/ Store /</p>
            <button className="" onClick={()=>setShowCart(!showCart)}>Cart</button>
            {showCart && <Cart/>}
            <div className="flex justify-evenly w-full">
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