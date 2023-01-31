import React, { useState } from 'react';
import Drawer from 'components/commercetools-ui/atoms/drawer';
import Slideout, { State as MenuState } from 'components/commercetools-ui/atoms/slide-out';
import { Link } from 'components/commercetools-ui/organisms/header/types';
import CartIcon from 'components/icons/cart';
import WishlistIcon from 'components/icons/wishlist';
import { useFormat } from 'helpers/hooks/useFormat';
import { useCart, useWishlist } from 'frontastic';
import { NextFrontasticImage } from 'frontastic/lib/image';
import AccountButton from './account-button';

export interface Props {
  emptyCartTitle: string;
  emptyCartSubtitle: string;
  emptyCartImage: NextFrontasticImage;
  emptyCartCategories: Link[];
  emptyWishlistTitle: string;
  emptyWishlistSubtitle: string;
  emptyWishlistImage: NextFrontasticImage;
  emptyWishlistCategories: Link[];
}

const UtilitySection: React.FC<Props> = ({
  emptyCartTitle,
  emptyCartSubtitle,
  emptyCartImage,
  emptyCartCategories,
  emptyWishlistTitle,
  emptyWishlistSubtitle,
  emptyWishlistImage,
  emptyWishlistCategories,
}) => {
  const { totalItems: totalCartItems } = useCart();
  const { totalItems: totalWishlistItems } = useWishlist();
  const { formatMessage: formatCartMessage } = useFormat({ name: 'cart' });
  const { formatMessage: formatWishlistMessage } = useFormat({ name: 'wishlist' });

  const [menuState, setMenuState] = useState<MenuState>();
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const onWishlistClicked = () => {
    setIsDrawerOpen(true);
    setMenuState('wishlist');
  };

  const onCartClicked = () => {
    setIsDrawerOpen(true);
    setMenuState('cart');
  };

  return (
    <div className="flex h-30 items-center">
      <div className="flex w-full justify-center">
        <AccountButton />

        <div
          title={formatWishlistMessage({ id: 'wishlist', defaultMessage: 'Wishlist' })}
          className="relative cursor-pointer px-16 md:mx-16"
          onClick={onWishlistClicked}
        >
          <WishlistIcon totalWishlistItems={totalWishlistItems} className="w-28 text-secondary-black" />
        </div>

        <div
          title={formatCartMessage({ id: 'myCart', defaultMessage: 'My Cart' })}
          className="cursor-pointer"
          onClick={onCartClicked}
        >
          <CartIcon
            className="w-28 text-secondary-black"
            totalCartItems={totalCartItems}
            counterClassName="-translate-y-1/4"
          />
        </div>
      </div>

      <Drawer
        isOpen={isDrawerOpen}
        direction="right"
        className="w-[90%] max-w-[380px] bg-white"
        onClose={() => setIsDrawerOpen(false)}
      >
        <Slideout
          state={menuState}
          onClose={() => setIsDrawerOpen(false)}
          changeState={(newState) => setMenuState(newState)}
          emptyCartTitle={emptyCartTitle}
          emptyCartSubtitle={emptyCartSubtitle}
          emptyCartImage={emptyCartImage}
          emptyCartCategories={emptyCartCategories}
          emptyWishlistTitle={emptyWishlistTitle}
          emptyWishlistSubtitle={emptyWishlistSubtitle}
          emptyWishlistImage={emptyWishlistImage}
          emptyWishlistCategories={emptyWishlistCategories}
        />
      </Drawer>
    </div>
  );
};

export default UtilitySection;
