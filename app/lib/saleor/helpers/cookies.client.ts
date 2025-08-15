// For browser usage
import Cookies from "js-cookie";

// Client-side token functions
export const getCheckoutToken = () => Cookies.get("checkoutToken");
export const setCheckoutToken = (token: string) =>
  Cookies.set("checkoutToken", token, { expires: 7 });
export const clearCheckoutToken = () => Cookies.remove("checkoutToken");