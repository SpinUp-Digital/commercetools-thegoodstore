import { Account } from '@Types/account/Account';
import { Order } from '@Types/cart/Order';

export interface BaseEmailApi {
  sendWelcomeCustomerEmail: (customer: Account) => Promise<void>;
  sendAccountVerificationEmail: (customer: Account) => Promise<void>;
  sendPasswordResetEmail: (customer: Account, token: string) => Promise<void>;
  sendAccountDeletionEmail: (customer: Account) => Promise<void>;
  sendOrderConfirmationEmail: (order: Order) => Promise<void>;
}
