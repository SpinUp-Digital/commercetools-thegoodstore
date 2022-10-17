import React, { useState } from 'react';
import { Account } from '@Types/account/Account';
import Slideout, { State as MenuState } from 'components/commercetools-ui/slide-out';
import AccountIcon from 'components/icons/account';
import CartIcon from 'components/icons/cart';
import WishlistIcon from 'components/icons/wishlist';
import { useFormat } from 'helpers/hooks/useFormat';
import { Reference, ReferenceLink } from 'helpers/reference';
import { useCart, useWishlist } from 'frontastic';

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
        <ReferenceLink
          title={formatAccountMessage({ id: 'account', defaultMessage: 'Account' })}
          target={accountLink}
          className="mx-17 h-fit w-15"
        >
          <AccountIcon />
        </ReferenceLink>

        <i
          title={formatWishlistMessage({ id: 'wishlist', defaultMessage: 'Wishlist' })}
          className="relative mx-17 mt-2 h-fit w-15 cursor-pointer"
          onClick={() => setMenuState('wishlist')}
        >
          {wishlistItemCount > 0 && (
            <span className="absolute top-[-8px] right-[-15px] h-8 w-8 rounded-full bg-green-500" />
          )}
          <WishlistIcon />
        </i>

        <i
          title={formatCartMessage({ id: 'myCart', defaultMessage: 'My Cart' })}
          className="relative mx-17 h-fit w-15 cursor-pointer"
          onClick={() => setMenuState('cart')}
        >
          {cartItemCount > 0 && (
            <span className="absolute top-[-5px] right-[-15px] h-8 w-8 rounded-full bg-green-500" />
          )}

          {cartItemCount > 0 && <span className="absolute top-9 left-8 h-8 w-8 text-10">{cartItemCount}</span>}
          <CartIcon />
        </i>
      </div>

      <Slideout
        state={menuState}
        onClose={() => setMenuState(null)}
        changeState={(newState) => setMenuState(newState)}
      />
    </div>
  );
};

export default UtilitySection;
