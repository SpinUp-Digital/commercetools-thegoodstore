import React, { FC } from 'react';
import { useRouter } from 'next/router';
import Button from 'components/commercetools-ui/atoms/button';
import Link from 'components/commercetools-ui/atoms/link';
import Typography from 'components/commercetools-ui/atoms/typography';
import MarketButtonMobile from 'components/commercetools-ui/organisms/market-button/market-button-mobile';
import { useFormat } from 'helpers/hooks/useFormat';
import { Category } from 'types/category';
import { useAccount } from 'frontastic';
import MobileMenuNavButton from '../atoms/menu-nav-button';

export interface Props {
  insertCategory: (category: Category) => void;
  hideHeaderMenu: () => void;
}

const MobileMenuFooter: FC<Props> = ({ hideHeaderMenu, insertCategory }) => {
  const router = useRouter();
  const { account, logout } = useAccount();
  const { formatMessage } = useFormat({ name: 'common' });
  const { formatMessage: formatAccountMessage } = useFormat({ name: 'account' });

  const tabs = [
    { name: formatAccountMessage({ id: 'my.account', defaultMessage: 'My Account' }), href: '/account#' },
    { name: formatAccountMessage({ id: 'orders', defaultMessage: 'Orders' }), href: '/account#orders' },
    {
      name: formatAccountMessage({ id: 'payment.methods', defaultMessage: 'Payment methods' }),
      href: '/account#payment',
    },
    { name: formatAccountMessage({ id: 'addresses', defaultMessage: 'Addresses' }), href: '/account#addresses' },
    {
      name: formatAccountMessage({ id: 'customer.support', defaultMessage: 'Customer support' }),
      href: '/account#support',
    },
  ];

  const accountButton: Category = {
    categoryId: 'myAccount',
    name: formatAccountMessage({ id: 'my.account', defaultMessage: 'My Account' }),
    depth: 1,
    subCategories: tabs.map((tab) => {
      return { categoryId: tab.href, name: tab.name, slug: tab.href, subCategories: [], depth: 1 };
    }),
  };

  const handleLogout = () => {
    logout().then(() => router.push('/login'));
    hideHeaderMenu();
  };
  return (
    <>
      <div className="mt-12 mb-16 w-full border border-neutral-400" />

      <div className="ml-24 mr-22 block pt-16 md:hidden">
        {account ? (
          <MobileMenuNavButton
            link={accountButton}
            onClick={() => insertCategory(accountButton)}
            hideHeaderMenu={hideHeaderMenu}
          />
        ) : (
          <Link link="/help" onClick={hideHeaderMenu}>
            <Typography fontSize={14} className="text-primary-black">
              {formatMessage({ id: 'help.and.support', defaultMessage: 'Help & Customer Service' })}
            </Typography>
          </Link>
        )}
      </div>

      <div className="mx-24 flex py-16">
        {account ? (
          <Button variant="ghost" onClick={handleLogout} className="p-0">
            <Typography fontSize={14} className="font-normal text-primary-black">
              {formatAccountMessage({ id: 'sign.out', defaultMessage: 'Sign out' })}
            </Typography>
          </Button>
        ) : (
          <Link link="/login" onClick={hideHeaderMenu} className="px-0">
            <Typography fontSize={14} className="text-primary-black">
              {formatAccountMessage({ id: 'sign.in', defaultMessage: 'Sign in' })}
            </Typography>
          </Link>
        )}
      </div>
      <div className="py-16">
        <MarketButtonMobile />
      </div>
    </>
  );
};

export default MobileMenuFooter;
