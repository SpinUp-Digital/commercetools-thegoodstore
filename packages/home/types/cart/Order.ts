import { Money } from '../product/Money';
import { Cart } from './Cart';
import { ShippingInfo } from './ShippingInfo';
import { Payment } from './Payment';

export type ShipmentState = 'Backorder' | 'Delayed' | 'Partial' | 'Pending' | 'Ready' | 'Shipped';
export interface Order extends Cart {
  orderId?: string;
  orderVersion?: string;
  orderState?: string;
  createdAt?: Date;
  sum: Required<Money>;
  subtotal: Money;
  shippingInfo: ShippingInfo;
  payments?: Array<Payment>;
  shipmentState: ShipmentState;
}
