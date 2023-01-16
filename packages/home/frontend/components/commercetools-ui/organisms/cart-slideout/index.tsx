import React, { FC } from 'react';
import { useFormat } from 'helpers/hooks/useFormat';
import { useCart } from 'frontastic';
import { NextFrontasticImage } from 'frontastic/lib/image';
import CartItem from '../../atoms/cart-item';
import { EmptyState } from '../empty-state';
import { Link } from '../header/types';
import OrderSummary from '../order-summary';

export interface Props {
  emptyStateImage: NextFrontasticImage;
  emptyStateTitle: string;
  emptyStateSubtitle: string;
  emptyStateCategories: Link[];
}

const CartSlideout: FC<Props> = ({ emptyStateImage, emptyStateTitle, emptyStateSubtitle, emptyStateCategories }) => {
  const { formatMessage: formatCartMessage } = useFormat({ name: 'cart' });

  const { data, isEmpty } = useCart();

  return (
    <>
      {isEmpty ? (
        <EmptyState
          className="grow"
          categories={emptyStateCategories}
          image={emptyStateImage}
          title={emptyStateTitle}
          subtitle={emptyStateSubtitle}
        />
      ) : (
        <div className="h-[65vh] grow divide-y divide-neutral-400 overflow-auto px-12 md:px-22">
          {data?.lineItems?.map((lineItem) => (
            <CartItem key={lineItem.lineItemId} item={lineItem} />
          ))}
        </div>
      )}
      <OrderSummary
        button={{
          text: formatCartMessage({ id: 'cart.go', defaultMessage: 'Go to cart' }),
          link: '/cart',
        }}
      />
    </>
  );
};
export default CartSlideout;
