import { useEffect } from "react";
import {
  AiOutlineLeft,
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineShopping,
} from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import { useStateContext } from "../context/StateContext";
import { useRef } from "react";
import { toast } from "react-hot-toast";
import jwt from "jsonwebtoken";
import { useRouter } from "next/router";
interface Token {
  username: string;
  iat: number;
  exp: number;
}
export default function Cart() {
  useEffect(() => {
    if (!token) {
      router.push("/");
    }
  }, []);
  const router = useRouter();
  const cartRef = useRef<HTMLDivElement | null>(null);
  const {
    totalPrice,
    totalQuantities,
    cartItems,
    setShowCart,
    decQty,
    incQty,
    qty,
    deleteProduct,
    toggleCartItemQuantity,
    token,
  } = useStateContext();

  const handleCheckout = async (e: any) => {
    e.preventDefault();
    
    const temp = JSON.stringify({
      user: token,
      cartItems: cartItems,
    })
    console.log(temp);
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_URL + "/orders/add-order",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user: token,
          cartItems: cartItems,
        }),
      }
    );

    console.log(response);
  };
  return (
    <div
      className="w-96 bg-base-100 h-screen float-right fixed top-0 right-0 z-40 overflow-y-scroll"
      ref={cartRef}
    >
      <div className="">
        <button
          className=" ml-2 btn btn-outline"
          onClick={() => setShowCart(false)}
        >
          <AiOutlineLeft />
          <span>Your Cart</span>{" "}
          <span className=" text-red-400">
            {" "}
            &nbsp;({totalQuantities} items)
          </span>
        </button>
        {cartItems.length < 1 && (
          <div className=" flex flex-col justify-center items-center">
            <AiOutlineShopping size={100} />
            <h3>Your shopping bag is empty</h3>
            <button
              onClick={() => setShowCart(false)}
              className="btn btn-secondary  my-2"
            >
              Continue Shopping
            </button>
          </div>
        )}
        <div>
          {cartItems.length >= 1 &&
            cartItems.map((item) => {
              return (
                <div className="flex  my-2" key={item.id}>
                  <div className="w-40 m-4">
                    <img src={item?.url} className="mask mask-squircle" />
                  </div>
                  <div className="">
                    <h5>{item.name}</h5>
                    <h4>${item.price}</h4>
                  </div>
                  <div className="flex flex-col m-3 justify-evenly items-center">
                    <div className="btn-group py-2">
                      <button
                        className="btn btn-xs py-2  px-2 "
                        onClick={() => toggleCartItemQuantity(item.id, "dec")}
                      >
                        -
                      </button>
                      <p className=" btn btn-disabled btn-xs px-2 text-black">
                        {item.quantity}
                      </p>
                      <button
                        className="btn btn-xs px-2"
                        onClick={() => toggleCartItemQuantity(item.id, "inc")}
                      >
                        +
                      </button>
                    </div>
                    <div className="ml-10 items-end ">
                      <button
                        className="btn btn-sm"
                        onClick={() => deleteProduct(item)}
                      >
                        <TiDeleteOutline />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        {cartItems.length >= 1 && (
          <div>
            <div>
              <h3>Subtotal:</h3>
              <h3>${totalPrice}</h3>
            </div>
            <div className="flex items-center justify-center">
              <button className="btn btn-info" onClick={handleCheckout}>
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
