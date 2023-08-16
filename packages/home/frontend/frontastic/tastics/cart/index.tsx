import React from 'react';
import { Category } from 'shared/types/product/Category';
import Cart from 'components/commercetools-ui/organisms/cart';
import { CartProps } from 'components/commercetools-ui/organisms/cart/types';

interface Props {
  data: CartProps;
  categories: Category[];
}

const CartTastic: React.FC<Props> = ({ data, categories }) => {
  return <Cart {...data} categories={categories} />;
};

export default CartTastic;
