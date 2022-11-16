import React, { useState } from 'react';
import { Account } from '@commercetools/domain-types/account/Account';
import { UserIcon } from '@heroicons/react/24/outline';
import Link from 'components/commercetools-ui/atoms/link';
import Slideout, { State as MenuState } from 'components/commercetools-ui/atoms/slide-out';
import CartIcon from 'components/icons/cart';
import WishlistIcon from 'components/icons/wishlist';
import { useFormat } from 'helpers/hooks/useFormat';
import { Reference } from 'types/reference';
import { useCart, useWishlist } from 'frontastic/provider';

interface Props {
  accountLink: Reference;
  account: Account;
  cartItemCount?: number;
  cartLink?: Reference;
  wishlistLink?: Reference;
}

const UtilitySection: React.FC<Props> = ({ accountLink }) => {
  const { totalItems: totalCartItems } = useCart();
  const { totalItems: totalWishlistItems } = useWishlist();
  const { formatMessage: formatAccountMessage } = useFormat({ name: 'account' });
  const { formatMessage: formatCartMessage } = useFormat({ name: 'cart' });
  const { formatMessage: formatWishlistMessage } = useFormat({ name: 'wishlist' });

  const [menuState, setMenuState] = useState<MenuState>();

  return (
    <div className="flex h-30 w-109 items-center justify-between lg:mr-12 lg:w-200 xl:w-300">
      <div className="flex w-full justify-center lg:w-210">
        <Link
          title={formatAccountMessage({ id: 'account', defaultMessage: 'Account' })}
          link={accountLink}
          className="mx-5 lg:mx-10"
        >
          <UserIcon className="w-25 text-secondary-black" />
        </Link>

        <div
          title={formatWishlistMessage({ id: 'wishlist', defaultMessage: 'Wishlist' })}
          className="relative mx-5 h-30  cursor-pointer lg:mx-10"
          onClick={() => setMenuState('wishlist')}
        >
          <WishlistIcon totalWishlistItems={totalWishlistItems} className="w-25 text-secondary-black" />
        </div>

        <div
          title={formatCartMessage({ id: 'myCart', defaultMessage: 'My Cart' })}
          className="relative mx-5 cursor-pointer lg:mx-10"
          onClick={() => setMenuState('cart')}
        >
          <CartIcon className="w-25" totalCartItems={totalCartItems} />
        </div>
      </div>

      {menuState && <div className="fixed top-0 left-0 z-10 h-full w-full bg-black opacity-50" />}

      <Slideout
        state={menuState}
        onClose={() => setMenuState(null)}
        changeState={(newState) => setMenuState(newState)}
      />
    </div>
  );
};

export default UtilitySection;
