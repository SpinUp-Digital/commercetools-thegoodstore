import React, { useState } from 'react';
import Drawer from 'components/commercetools-ui/atoms/drawer';
import Slideout, { State as MenuState } from 'components/commercetools-ui/atoms/slide-out';
import CartIcon from 'components/icons/cart';
import WishlistIcon from 'components/icons/wishlist';
import { useFormat } from 'helpers/hooks/useFormat';
import { useCart, useWishlist } from 'frontastic/provider';
import AccountButton from './account-button';

const UtilitySection: React.FC = () => {
  const { totalItems: totalCartItems } = useCart();
  const { totalItems: totalWishlistItems } = useWishlist();
  const { formatMessage: formatCartMessage } = useFormat({ name: 'cart' });
  const { formatMessage: formatWishlistMessage } = useFormat({ name: 'wishlist' });

  const [menuState, setMenuState] = useState<MenuState>();

  return (
    <div className="flex h-30 w-109 items-center justify-between lg:mr-12 lg:w-200 xl:w-300">
      <div className="flex w-full justify-center lg:w-210">
        <AccountButton />

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
          <CartIcon className="w-23 text-secondary-black" totalCartItems={totalCartItems} />
        </div>
      </div>

      <Drawer isOpen={menuState} direction="right" className="w-[90%] max-w-[380px]" onClose={() => setMenuState(null)}>
        <Slideout
          state={menuState}
          onClose={() => setMenuState(null)}
          changeState={(newState) => setMenuState(newState)}
        />
      </Drawer>
    </div>
  );
};

export default UtilitySection;
