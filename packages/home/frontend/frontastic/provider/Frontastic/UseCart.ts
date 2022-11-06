import { Cart } from '@commercetools/domain-types/cart/Cart';
import { Discount } from '@commercetools/domain-types/cart/Discount';
import { Order } from '@commercetools/domain-types/cart/Order';
import { ShippingMethod } from '@commercetools/domain-types/cart/ShippingMethod';
import { Variant } from '@commercetools/domain-types/product/Variant';
import { CartDetails } from 'frontastic/actions/cart';
import { ProjectSettings } from '@commercetools/domain-types/ProjectSettings';

export interface UseCart {
  data?: Cart;
  totalItems: number;
  addItem: (variant: Variant, quantity: number) => Promise<void>;
  updateCart: (payload: CartDetails) => Promise<Cart>;
  setShippingMethod: (shippingMethodId: string) => Promise<void>;
  removeItem: (lineItemId: string) => Promise<void>;
  updateItem: (lineItemId: string, newQuantity: number) => Promise<void>;
  removeDiscountCode?: (discount: Discount) => Promise<void>;
  redeemDiscountCode?: (code: string) => Promise<void>;
  shippingMethods: { data?: ShippingMethod[] };
  orderCart: () => Promise<void>;
  orderHistory?: () => Promise<Order[]>;
  getProjectSettings?: () => Promise<ProjectSettings>;
}
