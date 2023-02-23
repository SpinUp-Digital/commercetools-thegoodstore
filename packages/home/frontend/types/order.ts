import { Order as OrderType } from '@commercetools/frontend-domain-types/cart/Order';
import { Payment as PaymentType } from '@commercetools/frontend-domain-types/cart/Payment';
import { ShippingInfo as ShippingInfoType } from '@commercetools/frontend-domain-types/cart/ShippingInfo';
import { Tax as TaxType } from '@commercetools/frontend-domain-types/cart/Tax';
import { Money } from '@commercetools/frontend-domain-types/product/Money';

export type ShipmentState = 'Backorder' | 'Delayed' | 'Partial' | 'Pending' | 'Ready' | 'Shipped';

export interface Tax extends TaxType {
  amount: Required<Money>;
}
export interface ShippingInfo extends ShippingInfoType {
  price: Required<Money>;
  discountedPrice?: Required<Money>;
}

export interface Payment extends PaymentType {
  cardSummary: string;
}

export interface Order extends OrderType {
  sum: Required<Money>;
  subtotal: Money;
  shippingInfo: ShippingInfo;
  payments?: Array<Payment>;
  shipmentState: ShipmentState;
}
