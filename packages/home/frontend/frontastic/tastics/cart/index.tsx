import React from 'react';
import Cart, { Props as CartProps } from 'components/commercetools-ui/organisms/cart';
import { Category } from 'shared/types/product/Category';

interface Props {
  data: CartProps;
  categories: Category[];
}

const CartTastic: React.FC<Props> = ({ data, categories }) => {
  return <Cart {...data} categories={categories} />;
};

export default CartTastic;
