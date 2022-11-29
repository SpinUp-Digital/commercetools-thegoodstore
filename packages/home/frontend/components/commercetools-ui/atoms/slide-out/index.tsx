import React, { useMemo } from 'react';
import { HeartIcon } from '@heroicons/react/24/outline';
import CartIcon from 'components/icons/cart';
import CloseIcon from 'components/icons/close';
import useClassNames from 'helpers/hooks/useClassNames';
import { useFormat } from 'helpers/hooks/useFormat';
import { useCart, useWishlist } from 'frontastic';
import Cart from 'components/commercetools-ui/organisms/cart';

export type State = 'wishlist' | 'cart';

export interface Props {
  state?: State;
  changeState?: (newState?: State) => void;
  onClose?: () => void;
}

const Slideout: React.FC<Props> = ({ state, changeState, onClose }) => {
  const { formatMessage: formatCartMessage } = useFormat({ name: 'cart' });
  const { formatMessage: formatWishlistMessage } = useFormat({ name: 'wishlist' });

  const { totalItems: totalCartItems } = useCart();

  const { totalItems: totalWishlistItems } = useWishlist();

  const title = useMemo(() => {
    switch (state) {
      case 'cart':
        return formatCartMessage({ id: 'myCart', defaultMessage: 'My Cart' });
      case 'wishlist':
        return formatWishlistMessage({ id: 'myWishlist', defaultMessage: 'My Wishlist' });
    }
  }, [formatCartMessage, formatWishlistMessage, state]);

  const iconClassName = 'absolute -bottom-1 left-[-4px] h-2 w-34 transition duration-200';

  const wishlistClassName = useClassNames([
    iconClassName,
    state === 'wishlist' ? 'bg-secondary-grey ease-out' : 'bg-transparent ease-in',
  ]);

  const cartClassName = useClassNames([
    iconClassName,
    state === 'cart' ? 'bg-secondary-grey ease-out' : 'bg-transparent ease-in',
  ]);

  const ActiveSection = useMemo(
    () =>
      ({
        cart: <Cart />,
      }[state] ?? <></>),
    [state],
  );

  return (
    <>
      <div className="flex items-center justify-between border-b border-neutral-400 px-12 pt-24 md:px-22 md:pt-32">
        <h3 className="pb-22 text-18 font-medium leading-normal md:text-20">{title}</h3>
        <div className="flex h-full items-center gap-24 md:gap-38">
          <div className="relative h-full cursor-pointer hover:opacity-80" onClick={() => changeState?.('wishlist')}>
            <div className={wishlistClassName} />
            {totalWishlistItems > 0 && (
              <span className="absolute top-[-5px] right-[-5px] h-8 w-8 rounded-full bg-green-500" />
            )}
            <HeartIcon className="w-28" />
          </div>
          <div className="relative h-full cursor-pointer hover:opacity-80" onClick={() => changeState?.('cart')}>
            <>
              <div className={cartClassName} />
              <div className="relative pb-6">
                <CartIcon className="w-28" totalCartItems={totalCartItems} />
              </div>
            </>
          </div>
          <div onClick={onClose} className="ml-4 cursor-pointer pb-22 pt-6">
            <CloseIcon className="h-18 w-18" />
          </div>
        </div>
      </div>
      {ActiveSection}
    </>
  );
};

export default Slideout;
