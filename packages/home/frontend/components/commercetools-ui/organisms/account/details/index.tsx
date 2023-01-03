import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Button from 'components/commercetools-ui/atoms/button';
import Typography from 'components/commercetools-ui/atoms/typography';
import { useFormat } from 'helpers/hooks/useFormat';
import useHash from 'helpers/hooks/useHash';
import useI18n from 'helpers/hooks/useI18n';
import { Reference } from 'types/reference';
import { useAccount, useCart } from 'frontastic';
import {
  MyAccountSection,
  OrdersHistorySection,
  PaymentMethodsSection,
  AddressesSection,
  CustomerSupportSection,
} from './sections/exporter';
import ChangePasswordForm from './sections/general/forms/change-password-form';
import DeleteAccountForm from './sections/general/forms/delete-account-form';
import PersonalInfoForm from './sections/general/forms/personal-info-form';
import SubscribeForm from './sections/general/forms/subscribe-form';

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
  phoneNumber,
  workingHoursWeekdays,
  workingHoursWeekends,
  email,
  addressLine,
  cityAndPostalCode,
  country: organizationCountry,
  faqs,
}) => {
  const router = useRouter();
  const { account, logout } = useAccount();
  const { updateCart } = useCart();
  const { formatMessage: formatAccountMessage } = useFormat({ name: 'account' });
  const hash = useHash();
  const { country } = useI18n();

  //update associated cart data using account data
  useEffect(() => {
    if (!account) {
      router.push('login');
    } else {
      const email = account.email;
      const addresses = account.addresses?.filter((address) => address.country === country);
      const shippingAddress = addresses?.find((address) => address.isDefaultShippingAddress) || addresses?.[0];
      const billingAddress = addresses?.find((address) => address.isDefaultBillingAddress) || addresses?.[0];

      updateCart({
        account: { email },
        shipping: shippingAddress,
        billing: billingAddress,
      });
    }
  }, [account, country, updateCart]);

  const handleLogout = () => {
    logout().then(() => router.push('login'));
  };

  const tabs = [
    { name: formatAccountMessage({ id: 'account.details', defaultMessage: 'Account details' }), href: '#' },
    { name: formatAccountMessage({ id: 'addresses', defaultMessage: 'Addresses' }), href: '#addresses' },
    { name: formatAccountMessage({ id: 'orders', defaultMessage: 'Orders' }), href: '#orders' },
    { name: formatAccountMessage({ id: 'payment.methods', defaultMessage: 'Payment methods' }), href: '#payment' },
    { name: formatAccountMessage({ id: 'customer.support', defaultMessage: 'Customer support' }), href: '#support' },
  ];

  const mapping = {
    '#': <MyAccountSection />,
    '#edit-personal-info': <PersonalInfoForm />,
    '#edit-newsletter': <SubscribeForm />,
    '#change-password': <ChangePasswordForm />,
    '#delete-account': <DeleteAccountForm />,
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

  const Content = mapping[hash as keyof typeof mapping];

  return (
    <div className="bg-neutral-200 md:h-[80vh] xl:py-[68px]">
      <div className="mx-auto grid h-full w-full max-w-[1116px] grid-cols-4 bg-white">
        <div className="hidden h-full flex-col justify-between border-r border-neutral-400  pt-24 md:flex xl:pt-36">
          <div className="grid gap-36 px-24">
            {tabs.map((tab) => (
              <a key={tab.name} href={tab.href} className="whitespace-nowrap">
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
          </div>
          <div className="p-16">
            <div className="overflow-hidden rounded-md border-[0.5px] border-transparent hover:border-primary-black">
              <Button
                onClick={handleLogout}
                variant="ghost"
                className="w-full rounded-md border border-primary-black py-8 px-0 text-14"
              >
                {formatAccountMessage({ id: 'sign.out', defaultMessage: 'Sign out' })}
              </Button>
            </div>
          </div>
        </div>
        <div className="col-span-4 py-20 px-16 md:col-span-3 md:overflow-auto md:p-24 2xl:px-44 2xl:py-28 ">
          {Content && Content}
        </div>
      </div>
    </div>
  );
};
export default AccountDetails;
