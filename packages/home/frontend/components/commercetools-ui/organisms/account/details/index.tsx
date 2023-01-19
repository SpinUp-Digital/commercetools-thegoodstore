import React, { useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import Skeleton from 'react-loading-skeleton';
import Button from 'components/commercetools-ui/atoms/button';
import Link from 'components/commercetools-ui/atoms/link';
import Typography from 'components/commercetools-ui/atoms/typography';
import { useFormat } from 'helpers/hooks/useFormat';
import useHash from 'helpers/hooks/useHash';
import useI18n from 'helpers/hooks/useI18n';
import { Reference } from 'types/reference';
import { useAccount, useCart } from 'frontastic';
import AccountTabsMobile from '../account-atoms/account-tabs-mobile';
import AddressForm from './sections/addresses/address-form';
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

export interface AccountTab {
  name: string;
  href: string;
}
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
  const [hash, id] = useHash();
  const { country } = useI18n();

  const isLoading = useMemo(() => !!router.query.verify, [router]);

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
  }, [account, country, router, updateCart]);

  const handleLogout = () => {
    logout().then(() => router.push('login'));
  };

  const tabs = useMemo<AccountTab[]>(() => {
    return [
      { name: formatAccountMessage({ id: 'my.account', defaultMessage: 'My Account' }), href: '#' },
      { name: formatAccountMessage({ id: 'addresses', defaultMessage: 'Addresses' }), href: '#addresses' },
      { name: formatAccountMessage({ id: 'orders', defaultMessage: 'Orders' }), href: '#orders' },
      { name: formatAccountMessage({ id: 'payment.methods', defaultMessage: 'Payment methods' }), href: '#payment' },
      { name: formatAccountMessage({ id: 'customer.support', defaultMessage: 'Customer support' }), href: '#support' },
    ];
  }, [formatAccountMessage]);

  const mapping = {
    '#': <MyAccountSection isLoading={isLoading} />,
    '#edit-personal-info': <PersonalInfoForm />,
    '#edit-newsletter': <SubscribeForm />,
    '#change-password': <ChangePasswordForm />,
    '#delete-account': <DeleteAccountForm />,
    '#orders': <OrdersHistorySection />,
    '#payment': <PaymentMethodsSection />,
    '#addresses': <AddressesSection />,
    '#edit-address': <AddressForm editedAddressId={id} />,
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

  const contentTitle = useMemo(() => {
    const tabIndex = tabs?.findIndex((tab) => tab?.href === hash);
    if (tabs[tabIndex]) return tabs[tabIndex].name;
    else return '';
  }, [hash, tabs]);

  const Content = mapping[hash as keyof typeof mapping];

  return (
    <div className="bg-neutral-200 md:h-[80vh] xl:py-[68px]">
      <div className="mx-auto grid h-full w-full max-w-[1116px] grid-cols-4 bg-white">
        <div className="hidden h-full flex-col justify-between border-r border-neutral-400  pt-24 md:flex xl:pt-36">
          <div className="grid gap-36 px-24">
            {tabs.map((tab) => (
              <Link
                link={isLoading ? '' : tab.href}
                key={tab.name}
                className={`whitespace-nowrap ${isLoading ? 'cursor-default' : ''}`}
              >
                {isLoading ? (
                  <Skeleton />
                ) : (
                  <Typography
                    className={`hover:underline ${tab.href === hash ? 'text-primary-black' : 'text-secondary-black'}`}
                    fontSize={16}
                    medium={tab.href === hash}
                  >
                    {tab.name}
                  </Typography>
                )}
              </Link>
            ))}
          </div>
          <div className="p-16">
            <div className="overflow-hidden rounded-md border-[0.5px] border-transparent hover:border-primary-black">
              {isLoading ? (
                <Skeleton className="h-[30px]" />
              ) : (
                <Button
                  onClick={handleLogout}
                  variant="ghost"
                  className="w-full rounded-md border border-primary-black py-8 px-0 text-14"
                >
                  {formatAccountMessage({ id: 'sign.out', defaultMessage: 'Sign out' })}
                </Button>
              )}
            </div>
          </div>
        </div>
        <div className="col-span-4 py-20 px-16 md:col-span-3 md:overflow-auto md:p-24 2xl:px-44 2xl:py-28 ">
          <div className="block pb-12 pt-16 md:hidden">
            {contentTitle && (
              <Typography as="h2" fontFamily="libre" className="text-18 text-primary-black">
                {contentTitle}
              </Typography>
            )}
          </div>

          <AccountTabsMobile contentTitle={contentTitle} tabs={tabs} />
          {Content && Content}
        </div>
      </div>
    </div>
  );
};
export default AccountDetails;
