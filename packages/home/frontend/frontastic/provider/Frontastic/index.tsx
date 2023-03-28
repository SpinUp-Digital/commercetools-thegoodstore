import * as React from 'react';
import { useRouter } from 'next/router';
import { SWRConfig } from 'swr';
import AddToCartOverlayProvider from 'context/add-to-cart-overlay';
import useI18n from 'helpers/hooks/useI18n';
import { useAccount, useCart } from 'frontastic/hooks';

export const FrontasticProvider: React.FC = ({ children }) => {
  const router = useRouter();

  const { account, accountLoading } = useAccount();
  const { updateCart } = useCart();
  const { country } = useI18n();

  //update associated cart data using account data
  React.useEffect(() => {
    if (account) {
      const email = account.email;
      const addresses = account.addresses?.filter((address) => address.country === country);
      const shippingAddress = addresses?.find((address) => address.isDefaultShippingAddress) || addresses?.[0];
      const billingAddress = addresses?.find((address) => address.isDefaultBillingAddress) || addresses?.[0];

      updateCart({
        account: { email },
        shipping: shippingAddress,
        billing: billingAddress,
      });
    } else if (accountLoading) {
    } else {
      router.push('login');
    }
  }, [account, country, router, accountLoading, updateCart]);

  return (
    <SWRConfig>
      <AddToCartOverlayProvider>{children}</AddToCartOverlayProvider>
    </SWRConfig>
  );
};
