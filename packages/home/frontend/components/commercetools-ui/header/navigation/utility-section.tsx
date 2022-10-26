import React, { useState } from 'react';
import { Account } from '@Types/account/Account';
import Link from 'components/commercetools-ui/link';
import Slideout, { State as MenuState } from 'components/commercetools-ui/slide-out';
import AccountIcon from 'components/icons/account';
import CartIcon from 'components/icons/cart';
import WishlistIcon from 'components/icons/wishlist';
import { useFormat } from 'helpers/hooks/useFormat';
import { Reference } from 'types/reference';

interface Props {
  accountLink: Reference;
  account: Account;
  cartItemCount?: number;
  cartLink?: Reference;
  wishlistItemCount?: number;
  wishlistLink?: Reference;
}

const UtilitySection: React.FC<Props> = ({ accountLink, wishlistItemCount, cartItemCount }) => {
  const { formatMessage: formatAccountMessage } = useFormat({ name: 'account' });
  const { formatMessage: formatCartMessage } = useFormat({ name: 'cart' });
  const { formatMessage: formatWishlistMessage } = useFormat({ name: 'wishlist' });

  const [menuState, setMenuState] = useState<MenuState>();

  return (
    <div className="mr-15 flex w-109 items-center justify-between lg:mr-12 lg:w-200 xl:w-300">
      <div className="flex w-full justify-center lg:w-210">
        <Link
          title={formatAccountMessage({ id: 'account', defaultMessage: 'Account' })}
          link={accountLink}
          className="mx-17 h-fit w-15"
        >
          <AccountIcon />
        </Link>

        <div
          title={formatWishlistMessage({ id: 'wishlist', defaultMessage: 'Wishlist' })}
          className="relative mx-17 mt-2 h-fit w-15 cursor-pointer"
          onClick={() => setMenuState('wishlist')}
        >
          {wishlistItemCount > 0 && (
            <span className="absolute top-[-8px] right-[-15px] h-8 w-8 rounded-full bg-green-500" />
          )}
          <WishlistIcon />
        </div>

        <div
          title={formatCartMessage({ id: 'myCart', defaultMessage: 'My Cart' })}
          className="relative mx-17 h-fit w-15 cursor-pointer"
          onClick={() => setMenuState('cart')}
        >
          {cartItemCount > 0 && (
            <span className="absolute top-[-5px] right-[-15px] h-8 w-8 rounded-full bg-green-500" />
          )}

          {cartItemCount > 0 && <span className="absolute top-10 left-6 h-8 w-8 text-10">{cartItemCount}</span>}
          <CartIcon />
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
