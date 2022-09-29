import React from 'react';
import { Account } from '@Types/account/Account';
import AccountIcon from 'components/icons/account';
import CartIcon from 'components/icons/cart';
import WishlistIcon from 'components/icons/wishlist';
import { useFormat } from 'helpers/hooks/useFormat';
import { Reference, ReferenceLink } from 'helpers/reference';

interface Props {
  accountLink: Reference;
  account: Account;
  cartItemCount?: number;
  cartLink?: Reference;
  wishlistItemCount?: number;
  wishlistLink?: Reference;
}

const UtilitySection: React.FC<Props> = ({ accountLink, cartLink, wishlistLink }) => {
  const { formatMessage: formatAccountMessage } = useFormat({ name: 'account' });
  const { formatMessage: formatCartMessage } = useFormat({ name: 'cart' });
  const { formatMessage: formatWishlistMessage } = useFormat({ name: 'wishlist' });

  return (
    <div className="mr-12 flex w-109 items-center justify-between lg:w-300">
      <ReferenceLink
        title={formatAccountMessage({ id: 'account', defaultMessage: 'Account' })}
        target={accountLink}
        className="h-fit w-15 lg:ml-65"
      >
        <AccountIcon />
      </ReferenceLink>
      <ReferenceLink
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
      </ReferenceLink>
    </div>
  );
};

export default UtilitySection;
