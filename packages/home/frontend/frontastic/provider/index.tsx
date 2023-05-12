import * as React from 'react';
import { SWRConfig } from 'swr';
import AddToCartOverlayProvider from 'context/add-to-cart-overlay';

export const FrontasticProvider: React.FC<React.PropsWithChildren<object>> = ({ children }) => {
  return (
    <SWRConfig>
      <AddToCartOverlayProvider>{children}</AddToCartOverlayProvider>
    </SWRConfig>
  );
};
