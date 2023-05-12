import React, { useContext } from 'react';
import AdyenPaymentProvider, { AdyenContext } from './payment/adyen';

const CheckoutContext = React.createContext({});

const CheckoutProvider: React.FC<React.PropsWithChildren<object>> = ({ children }) => {
  return (
    <CheckoutContext.Provider value={{}}>
      <AdyenPaymentProvider>{children}</AdyenPaymentProvider>
    </CheckoutContext.Provider>
  );
};

export default CheckoutProvider;

export const useCheckout = () => useContext(AdyenContext);
