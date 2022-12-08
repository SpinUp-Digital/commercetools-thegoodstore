import React from 'react';
import Button from 'components/commercetools-ui/atoms/button';
import { EmptyState } from 'components/commercetools-ui/organisms/empty-state';
import { FooterLink } from 'components/commercetools-ui/organisms/footer/column';
import { useFormat } from 'helpers/hooks/useFormat';
import { useWishlist } from 'frontastic';
import { NextFrontasticImage } from 'frontastic/lib/image';
import WishlistItem from './wishlist-item';

export interface Props {
  emptyWishlistTitle: string;
  emptyWishlistSubtitle: string;
  emptyWishlistImage: NextFrontasticImage;
  emptyWishlistCategories: FooterLink[];
}
const Wishlist = ({ emptyWishlistTitle, emptyWishlistSubtitle, emptyWishlistImage, emptyWishlistCategories }) => {
  const { formatMessage: formatWishlistMessage } = useFormat({ name: 'wishlist' });
  const { data: wishlistData, clearWishlist } = useWishlist();
  const handleClearWishlist = async () => {
    await clearWishlist(wishlistData);
  };

  return (
    <>
      {
        <>
          {!wishlistData?.lineItems?.length ? (
            <>
              <EmptyState
                title={emptyWishlistTitle}
                subtitle={emptyWishlistSubtitle}
                image={emptyWishlistImage}
                categories={emptyWishlistCategories}
              />
            </>
          ) : (
            <>
              <div className="grow divide-y divide-neutral-400 overflow-auto px-12 md:px-22">
                {wishlistData?.lineItems?.map((lineItem) => (
                  <WishlistItem key={lineItem.lineItemId} item={lineItem} />
                ))}
              </div>
              <div className="mt-16 p-20">
                <div className="overflow-hidden rounded-md border-[0.5px] border-transparent hover:border-primary-black">
                  <Button
                    onClick={handleClearWishlist}
                    variant="ghost"
                    className="w-full border border-primary-black text-16"
                  >
                    {formatWishlistMessage({ id: 'wishlist.clear.list', defaultMessage: 'Clear the list' })}
                  </Button>
                </div>
              </div>
            </>
          )}
        </>
      }
    </>
  );
};

export default Wishlist;
