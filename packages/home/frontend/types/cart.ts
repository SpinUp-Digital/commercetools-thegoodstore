import { Cart as CommercetoolsCart } from '@commercetools/frontend-domain-types/cart/Cart';
import { LineItem } from '@commercetools/frontend-domain-types/cart/LineItem';
import { Money } from '@commercetools/frontend-domain-types/product/Money';

export interface Cart extends Omit<CommercetoolsCart, 'lineItems'> {
  lineItems: Array<
    LineItem & {
      taxedPrice: Money;
    }
  >;
}
