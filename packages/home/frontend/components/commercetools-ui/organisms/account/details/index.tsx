import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
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
  const { account, loggedIn, logout } = useAccount();
  const { query } = useRouter();
  const { verify: verifying } = query;
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
  if (!loggedIn) return <Redirect target={loginLink} />;

  //tabs
  const tabs = [
    { name: formatAccountMessage({ id: 'my.account', defaultMessage: 'My Account' }), href: '#' },
    { name: formatAccountMessage({ id: 'orders', defaultMessage: 'Orders' }), href: '#orders' },
    { name: formatAccountMessage({ id: 'payment.methods', defaultMessage: 'Payment methods' }), href: '#payment' },
    { name: formatAccountMessage({ id: 'addresses', defaultMessage: 'Addresses' }), href: '#addresses' },
    { name: formatAccountMessage({ id: 'customer.support', defaultMessage: 'Customer support' }), href: '#support' },
  ];

  //tabs change (mobile only)
  const handleTabChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    window.location.hash = e.target.value;
  };

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
    <div className="flex w-full justify-center bg-neutral-200 py-67">
      <div className="flex h-[700px] w-[78%]  bg-white ">
        <div className="flex h-full w-[20%] flex-col justify-between border-r border-neutral-400">
          <ul className="pt-37 pl-24">
            {tabs.map((tab) => (
              <li key={tab.name} className="pb-24">
                <a href={tab.href} className="font-">
                  <Typography fontSize={16} fontFamily="inter" className={tab.href === hash ? 'font-medium' : ''}>
                    {tab.name}
                  </Typography>
                </a>
              </li>
            ))}
          </ul>
          <div className="p-16">
            <div className="overflow-hidden rounded-md border-[0.5px] border-transparent hover:border-primary-black">
              <Button onClick={logout} variant="ghost" className="w-full border border-primary-black py-8">
                <Typography fontSize={14} fontFamily="inter" align="center">
                  {formatAccountMessage({ id: 'sign.out', defaultMessage: 'Sign out' })}
                </Typography>
              </Button>
            </div>
          </div>
        </div>
        <div className="w-[80%]">{Content && <Content />}</div>
      </div>
    </div>
  );
};

export default AccountDetails;
