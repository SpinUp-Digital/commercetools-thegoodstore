import { Cart as BaseCart } from '@commercetools/frontend-domain-types/cart/Cart';
import { LineItem as BaseLineItem } from '@commercetools/frontend-domain-types/cart/LineItem';
import { Money } from '@commercetools/frontend-domain-types/product/Money';
import { Variant } from './product';

export interface LineItem extends BaseLineItem {
  variant: Variant;
  taxedPrice: Money;
}

export interface Cart extends BaseCart {
  lineItems: LineItem[];
}
