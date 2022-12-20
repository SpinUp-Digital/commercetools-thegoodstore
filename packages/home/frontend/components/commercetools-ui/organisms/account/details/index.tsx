import React, { useEffect } from 'react';
import Button from 'components/commercetools-ui/atoms/button';
import Typography from 'components/commercetools-ui/atoms/typography';
import { useFormat } from 'helpers/hooks/useFormat';
import useHash from 'helpers/hooks/useHash';
import useI18n from 'helpers/hooks/useI18n';
import Redirect from 'helpers/redirect';
import { Reference } from 'types/reference';
import { useAccount, useCart } from 'frontastic';
import {
  MyAccountSection,
  OrdersHistorySection,
  PaymentMethodsSection,
  AddressesSection,
  CustomerSupportSection,
} from './sections/exporter';

export interface AccountDetailsProps {
  loginLink?: Reference;
}

const AccountDetails: React.FC<AccountDetailsProps> = ({ loginLink }) => {
  //account data
  const { account, loggedIn, logout } = useAccount();

  //Cart
  const { updateCart } = useCart();
  const { formatMessage: formatAccountMessage } = useFormat({ name: 'account' });
  const hash = useHash();

  //I18n info
  const { country } = useI18n();

  //update associated cart data using account data
  useEffect(() => {
    if (!account) return;

    const email = account.email;
    const addresses = account.addresses.filter((address) => address.country === country);

    const shippingAddress = addresses?.find((address) => address.isDefaultShippingAddress) || addresses?.[0];
    const billingAddress = addresses?.find((address) => address.isDefaultBillingAddress) || addresses?.[0];

    updateCart({
      account: { email },
      shipping: shippingAddress,
      billing: billingAddress,
    });
  }, [account, country, updateCart]);

  //user not logged in
  //if (!loggedIn) return <Redirect target={loginLink} />;

  //tabs
  const tabs = [
    { name: formatAccountMessage({ id: 'my.account', defaultMessage: 'My Account' }), href: '#' },
    { name: formatAccountMessage({ id: 'orders', defaultMessage: 'Orders' }), href: '#orders' },
    { name: formatAccountMessage({ id: 'payment.methods', defaultMessage: 'Payment methods' }), href: '#payment' },
    { name: formatAccountMessage({ id: 'addresses', defaultMessage: 'Addresses' }), href: '#addresses' },
    { name: formatAccountMessage({ id: 'customer.support', defaultMessage: 'Customer support' }), href: '#support' },
  ];

  //tabs-content mapping
  const mapping = {
    '#': MyAccountSection,
    '#orders': OrdersHistorySection,
    '#payment': PaymentMethodsSection,
    '#addresses': AddressesSection,
    '#support': CustomerSupportSection,
  };

  //current rendered content
  const Content = mapping[hash];

  return (
    <div className="min-h-[80vh] bg-neutral-200 md:h-[80vh] xl:py-[68px]">
      <div className="mx-auto grid h-full w-full max-w-[1116px] grid-cols-4 bg-white">
        <div className="hidden h-full flex-col justify-between border-r border-neutral-400 px-24 pt-24 pb-16 md:flex xl:pt-36">
          <ul className="grid gap-36 pl-8">
            {tabs.map((tab) => (
              <a key={tab.name} href={tab.href}>
                <Typography className="hover:underline" fontSize={16} medium={tab.href === hash}>
                  {tab.name}
                </Typography>
              </a>
            ))}
          </ul>
          <Button onClick={logout} variant="secondary" className="w-full border border-primary-black py-8 px-0">
            {formatAccountMessage({ id: 'sign.out', defaultMessage: 'Sign out' })}
          </Button>
        </div>
        <div className="col-span-4 py-20 px-16 md:col-span-3 md:overflow-auto md:p-24 2xl:p-44">
          {Content && <Content />}
        </div>
      </div>
    </div>
  );
};

export default AccountDetails;
