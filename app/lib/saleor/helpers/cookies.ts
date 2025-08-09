import Cookies from 'js-cookie';

export const getCheckoutToken = () => Cookies.get('checkoutToken');
export const setCheckoutToken = (token: string) =>
  Cookies.set('checkoutToken', token, { expires: 7 });
export const clearCheckoutToken = () => Cookies.remove('checkoutToken');