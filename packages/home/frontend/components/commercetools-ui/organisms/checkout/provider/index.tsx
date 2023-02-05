import React, { useContext } from 'react';

const CheckoutContext = React.createContext({});

const CheckoutProvider: React.FC = ({ children }) => {
  return <CheckoutContext.Provider value={{}}>{children}</CheckoutContext.Provider>;
};

export default CheckoutProvider;

export const useCheckout = () => useContext(CheckoutContext);
