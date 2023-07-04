import Cookies from "js-cookie";
import { useRouter } from "next/router";
export const useLogout = () => {
    const router = useRouter();
  const logout = () => {
    console.log("trying to delete cookie")
    Cookies.remove("currentUser");
    router.push("/");

  };

  return { logout };
};