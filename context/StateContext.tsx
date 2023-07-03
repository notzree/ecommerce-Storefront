import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { toast } from "react-hot-toast";

interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  url: string;
}

interface StateContextProps {
  showCart: boolean;
  setShowCart: React.Dispatch<React.SetStateAction<boolean>>;
  cartItems: Product[];
  totalPrice: number;
  totalQuantities: number;
  qty: number;
  incQty: () => void;
  decQty: () => void;
  onAdd: (product: Product, quantity: number) => void;
  deleteProduct: (product: Product) => void;
  toggleCartItemQuantity: (id: string, values: "inc" | "dec") => void;
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
}

const Context = createContext<StateContextProps | undefined>(undefined);

interface StateContextProviderProps {
  children: ReactNode;
}

export const StateContext = ({ children }: StateContextProviderProps) => {
  const [showCart, setShowCart] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalQuantities, setTotalQuantities] = useState<number>(0);
  const [qty, setQty] = useState<number>(1);
  const [token, setToken] = useState<string>("");
  let foundProduct: Product | undefined;
  let index: number;

  const toggleCartItemQuantity = (id: string, values: "inc" | "dec") => {
    foundProduct = cartItems.find((item) => item.id === id);
    index = cartItems.findIndex((product) => product.id === id);
    const newCartItems = [...cartItems];
    if (values === "inc") {
      newCartItems[index].quantity = newCartItems[index].quantity + 1;

      setCartItems(newCartItems);

      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct!.price);
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
    } else if (values === "dec") {
      if (foundProduct!.quantity > 1) {
        newCartItems[index].quantity = newCartItems[index].quantity - 1;
        setCartItems(newCartItems);

        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct!.price);
        setTotalQuantities((prevTotalQuantities) => {
          if (prevTotalQuantities > 1) {
            return prevTotalQuantities - 1;
          } else return prevTotalQuantities;
        });
      }
    }
  };

  const deleteProduct = (product: Product) => {
    const target = cartItems.find((item) => item.id === product.id);
    const newCartItems = cartItems.filter((item) => item.id !== product.id);
    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice - target!.price * target!.quantity
    );
    setTotalQuantities((prevQty) => prevQty - target!.quantity);
    setCartItems(newCartItems);
  };

  const onAdd = (product: Product, quantity: number) => {
    console.log("product", product.id);
    const checkProductInCart = cartItems.find(
      (item) => item?.id === product.id
    );

    if (checkProductInCart) {
      // already know that product is in cart, just have to increment the quantity.
      const productIndex = cartItems.findIndex(
        (item) => item.id === checkProductInCart.id
      );
      const updatedCartItems = [...cartItems];
      updatedCartItems[productIndex].quantity =
        updatedCartItems[productIndex].quantity + 1;

      setCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;
      setCartItems([...cartItems, { ...product }]);
    }

    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + product.price * quantity
    );

    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);
    toast.success(`${qty} ${product.name} added to cart`);
  };

  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  };
  const decQty = () => {
    if (qty - 1 < 1) {
      setQty(1);
    } else {
      setQty((prevQty) => prevQty - 1);
    }
  };

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        onAdd,
        deleteProduct,
        toggleCartItemQuantity,
        token,
        setToken,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = (): StateContextProps => {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error(
      "useStateContext must be used within a StateContextProvider"
    );
  }
  return context;
};
