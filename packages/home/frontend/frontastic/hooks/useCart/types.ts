import { Address } from 'shared/types/account/Address';
import { Discount } from 'shared/types/cart/Discount';
import { ShippingMethod } from 'shared/types/cart/ShippingMethod';
import { Money } from 'shared/types/product/Money';
import { Variant } from 'shared/types/product';
import { ProjectSettings } from 'shared/types/ProjectSettings';
import { Cart } from 'shared/types/cart';
import { Order } from 'shared/types/cart/Order';

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
  getOrder: (orderId: Order['orderId']) => Promise<Order>;
  orderHistory?: () => Promise<Order[]>;
  getProjectSettings?: () => Promise<ProjectSettings>;
}
