import React, { useCallback, useMemo } from 'react';
import { useRouter } from 'next/router';
import Skeleton from 'react-loading-skeleton';
import Button from 'components/commercetools-ui/atoms/button';
import Link from 'components/commercetools-ui/atoms/link';
import Typography from 'components/commercetools-ui/atoms/typography';
import useClassNames from 'helpers/hooks/useClassNames';
import { useFormat } from 'helpers/hooks/useFormat';
import useHash from 'helpers/hooks/useHash';
import { Reference } from 'types/reference';
import { useAccount } from 'frontastic';
import AccountTabsMobile from './account-atoms/account-tabs-mobile';
import Addresses from './sections/addresses';
import AddressForm from './sections/addresses/address-form';
import CustomerSupport from './sections/customer-support';
import MyAccount from './sections/my-account';
import ChangePasswordForm from './sections/my-account/forms/change-password-form';
import DeleteAccountForm from './sections/my-account/forms/delete-account-form';
import PersonalInfoForm from './sections/my-account/forms/personal-info-form';
import SubscribeForm from './sections/my-account/forms/subscribe-form';
import Orders from './sections/orders';
import OrderPage from './sections/orders/order-page';
import PaymentMethods from './sections/payment-methods';
import PaymentAdd from './sections/payment-methods/payment-add';
import PaymentEdit from './sections/payment-methods/payment-edit';

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
  const { logout } = useAccount();
  const { formatMessage: formatAccountMessage } = useFormat({ name: 'account' });
  const [hash, id] = useHash();
  const isLoading = useMemo(() => !!router.query.verify, [router]);

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
    '#': <MyAccount isLoading={isLoading} />,
    '#edit-personal-info': <PersonalInfoForm />,
    '#edit-newsletter': <SubscribeForm />,
    '#edit-address': <AddressForm editedAddressId={id} />,
    '#change-password': <ChangePasswordForm />,
    '#delete-account': <DeleteAccountForm />,
    '#orders': <Orders />,
    '#order': <OrderPage orderId={id} />,
    '#payment': <PaymentMethods />,
    '#edit-payment': <PaymentEdit />,
    '#add-payment': <PaymentAdd />,
    '#addresses': <Addresses />,
    '#support': (
      <CustomerSupport
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
    if (tabs[tabIndex]) return tabs[tabIndex].name ?? '';
    else return '';
  }, [hash, tabs]);

  const Content = mapping[hash as keyof typeof mapping];

  const tabButtonClassNames = useClassNames(['whitespace-nowrap', isLoading ? 'cursor-default' : '']);

  const tabButtonLabelClassNames = useCallback(
    (tab: AccountTab) => {
      return `hover:underline ${tab.href === hash ? 'text-primary-black' : 'text-secondary-black'}`;
    },
    [hash],
  );

  return (
    <div className="relative flex bg-neutral-100">
      <div className="sticky top-[175px] w-0 self-start md:h-[calc(100vh-200px)] md:w-[25%]">
        <div className="hidden h-full w-full flex-col justify-between pt-24 md:flex lg:pt-44">
          <div className="grid gap-36 px-28 lg:px-56">
            {tabs.map((tab) => (
              <Link link={isLoading ? '' : tab.href} key={tab.name} className={tabButtonClassNames}>
                {isLoading ? (
                  <Skeleton />
                ) : (
                  <Typography className={tabButtonLabelClassNames(tab)} fontSize={16} medium={tab.href === hash}>
                    {tab.name}
                  </Typography>
                )}
              </Link>
            ))}
          </div>
          <div className="px-20 py-16 lg:px-40">
            {isLoading ? (
              <Skeleton className="h-[30px]" />
            ) : (
              <Button
                onClick={handleLogout}
                variant="secondary"
                className="w-full rounded-md border border-primary-black px-0 py-8 text-14"
              >
                {formatAccountMessage({ id: 'sign.out', defaultMessage: 'Sign out' })}
              </Button>
            )}
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col border-neutral-400 md:border-l lg:items-start">
        <div className="w-full pb-48">
          <div className="mt-20 px-16">
            {contentTitle && (
              <div className="block md:hidden">
                <Typography as="h2" fontFamily="libre" className="text-18 text-primary-black">
                  {contentTitle}
                </Typography>
              </div>
            )}

            {contentTitle && (
              <AccountTabsMobile contentTitle={contentTitle} hash={hash} tabs={tabs} className="mt-20" />
            )}
          </div>
          <div key={hash}>{Content && Content}</div>
        </div>
      </div>
    </div>
  );
};
export default AccountDetails;
