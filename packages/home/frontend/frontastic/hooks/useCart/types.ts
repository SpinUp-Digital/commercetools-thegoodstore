import { Address } from '@commercetools/frontend-domain-types/account/Address';
import { Discount } from '@commercetools/frontend-domain-types/cart/Discount';
import { Order } from '@commercetools/frontend-domain-types/cart/Order';
import { ShippingMethod } from '@commercetools/frontend-domain-types/cart/ShippingMethod';
import { Money } from '@commercetools/frontend-domain-types/product/Money';
import { Variant } from '@commercetools/frontend-domain-types/product/Variant';
import { ProjectSettings } from '@commercetools/frontend-domain-types/ProjectSettings';
import { Cart } from 'types/cart';

export interface CartDetails {
  account?: { email: string };
  shipping?: Address;
  billing?: Address;
}

export interface UseCartReturn {
  data?: Cart;
  totalItems: number;
  isEmpty: boolean;
  isShippingAccurate: boolean;
  hasOutOfStockItems: boolean;
  transaction: {
    subtotal: Required<Money>;
    discount: Required<Money>;
    shipping: Required<Money>;
    tax: Required<Money>;
    total: Required<Money>;
  };
  addItem: (variant: Variant, quantity: number) => Promise<void>;
  updateCart: (payload: CartDetails) => Promise<Cart>;
  setShippingMethod: (shippingMethodId: string) => Promise<void>;
  removeItem: (lineItemId: string) => Promise<void>;
  updateItem: (lineItemId: string, newQuantity: number) => Promise<void>;
  removeDiscountCode?: (discount: Discount) => Promise<void>;
  redeemDiscountCode?: (code: string) => Promise<void>;
  shippingMethods: { data?: ShippingMethod[] };
  orderCart: () => Promise<Order>;
  orderHistory?: () => Promise<Order[]>;
  getProjectSettings?: () => Promise<ProjectSettings>;
}
