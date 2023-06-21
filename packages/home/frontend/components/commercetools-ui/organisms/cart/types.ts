import { PaymentMethod } from 'shared/types/cart/Payment';
import { Category } from 'shared/types/product';

export interface CartProps {
  paymentMethods: Array<PaymentMethod>;
  categories: Category[];
  emptyStateDescription?: string;
}

export type EmptyCartProps = Omit<CartProps, 'paymentMethods'>;

export type CartContentProps = EmptyCartProps & {
  className?: string;
};
