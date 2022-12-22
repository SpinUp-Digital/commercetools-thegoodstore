import React, { useEffect } from 'react';
import Button from 'components/commercetools-ui/atoms/button';
import Typography from 'components/commercetools-ui/atoms/typography';
import useClassNames from 'helpers/hooks/useClassNames';
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

export interface FAQ {
  question: string;
  answer: string;
}

export interface AccountDetailsProps {
  loginLink?: Reference;
  phoneNumber: string;
  workingHoursWeekdays: string;
  workingHoursWeekends: string;
  email: string;
  addressLine: string;
  cityAndPostalCode: string;
  country: string;
  faqs: FAQ[];
}

const AccountDetails: React.FC<AccountDetailsProps> = ({
  loginLink,
  phoneNumber,
  workingHoursWeekdays,
  workingHoursWeekends,
  email,
  addressLine,
  cityAndPostalCode,
  country: organizationCountry,
  faqs,
}) => {
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

  const navigationButtonClassNames = useClassNames(['hover:underline']);

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
    '#': <MyAccountSection />,
    '#orders': <OrdersHistorySection />,
    '#payment': <PaymentMethodsSection />,
    '#addresses': <AddressesSection />,
    '#support': (
      <CustomerSupportSection
        phoneNumber={phoneNumber}
        workingHoursWeekdays={workingHoursWeekdays}
        workingHoursWeekends={workingHoursWeekends}
        email={email}
        addressLine={addressLine}
        cityAndPostalCode={cityAndPostalCode}
        country={organizationCountry}
        faqs={faqs}
      />
    ),
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
                <Typography
                  className={`hover:underline ${tab.href === hash ? 'text-primary-black' : 'text-secondary-black'}`}
                  color="neutral-400"
                  fontSize={16}
                  medium={tab.href === hash}
                >
                  {tab.name}
                </Typography>
              </a>
            ))}
          </ul>
          <div className="overflow-hidden rounded-md border-[0.5px] border-transparent hover:border-primary-black">
            <Button
              onClick={logout}
              variant="ghost"
              className="w-full rounded-md border border-primary-black py-8 px-0"
            >
              {formatAccountMessage({ id: 'sign.out', defaultMessage: 'Sign out' })}
            </Button>
          </div>
        </div>
        <div className="col-span-4 py-20 px-16 md:col-span-3 md:overflow-auto md:p-24 2xl:p-44">
          {Content && Content}
        </div>
      </div>
    </div>
  );
};

export default AccountDetails;
