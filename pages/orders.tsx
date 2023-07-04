import { User } from "@/hooks/useLogin";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useState } from "react";
import Link from "next/link";
export default function Order() {


    const [orders, setOrders] = useState<any[]>([]);
    useEffect(()=> {
        const fetchData = async ()=>{
            var temp = Cookies.get("currentUser");
      temp = temp?.substring(1, temp.length - 1);
      const currUser = JSON.parse(temp as string) as User;
      const token = currUser.accessToken;
      console.log(token);
            const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/orders/get-orders",{
            method: "POST",
            headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  user: token,
                }),
          });
           var orders = await res.json();
          orders = orders.body.Items
          console.log(orders);
          setOrders(orders);
        }
       fetchData();
    },[])
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
            <h1 className="mb-5 text-5xl font-bold">Orders</h1>
            <p className="mb-5">/ Your Placed Orders /</p>
            <Link href = "/store" className="btn btn-outline">Store</Link>
            {
                orders?.map((order)=>{
                    return(
                        <div key = {order.orderId} className="card w-96 bg-base-100 shadow-xl m-5">
                            <div className="card-body">
                                <h2 className="card-title w-auto">Order ID: {order.orderId["S"]}</h2>
                            </div>
                        </div>
                    )
                })
            }
          </div>
        </div>
      </div>
    </main>
  );
}
