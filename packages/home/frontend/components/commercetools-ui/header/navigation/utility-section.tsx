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

const UtilitySection: React.FC<Props> = ({ accountLink, cartLink, wishlistLink }) => {
  const { data: cartData, addItem } = useCart();
  const { data: wishlistData } = useWishlist();

  const cartItems = cartData?.lineItems;
  const wishlistItems = wishlistData?.lineItems;

  const { formatMessage: formatAccountMessage } = useFormat({ name: 'account' });
  const { formatMessage: formatCartMessage } = useFormat({ name: 'cart' });
  const { formatMessage: formatWishlistMessage } = useFormat({ name: 'wishlist' });

  const [menuState, setMenuState] = useState<MenuState>();

  return (
    <div className="mr-12 flex w-109 items-center justify-between lg:w-300">
      <ReferenceLink
        title={formatAccountMessage({ id: 'account', defaultMessage: 'Account' })}
        target={accountLink}
        className="h-fit w-fit lg:ml-65"
      >
        <AccountIcon className="h-26 w-26" />
      </ReferenceLink>
      {/* <ReferenceLink
        title={formatWishlistMessage({ id: 'wishlist', defaultMessage: 'Wishlist' })}
        target={wishlistLink}
        className="h-fit w-18 lg:mx-34"
      >
        <WishlistIcon />
      </ReferenceLink>
      <ReferenceLink
        title={formatCartMessage({ id: 'myCart', defaultMessage: 'My Cart' })}
        target={cartLink}
        className="h-fit w-18 lg:mr-65"
      >
        <CartIcon />
      </ReferenceLink> */}

      <div
        title={formatWishlistMessage({ id: 'wishlist', defaultMessage: 'Wishlist' })}
        className="relative h-fit w-fit cursor-pointer lg:mx-34"
        onClick={() => setMenuState('wishlist')}
      >
        {wishlistItems?.length > 0 && (
          <span className="absolute top-[-6px] right-[-7px] h-8 w-8 rounded-full bg-green-500" />
        )}
        <WishlistIcon className="h-24 w-24" />
      </div>

      <div
        title={formatCartMessage({ id: 'myCart', defaultMessage: 'My Cart' })}
        className="relative h-fit w-fit cursor-pointer lg:mr-65"
        onClick={() => setMenuState('cart')}
      >
        {cartItems?.length > 0 && (
          <>
            <span className="absolute top-[-4px] right-[-4px] h-8 w-8 rounded-full bg-green-500" />
            <span className="absolute top-[12px] left-1/2 -translate-x-1/2 text-8">
              {cartItems.length > 9 ? '9+' : cartItems.length}
            </span>
          </>
        )}
        <CartIcon className="h-26 w-26" />
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
