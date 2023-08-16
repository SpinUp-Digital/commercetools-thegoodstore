import { Money } from '../product/Money';
import { KlarnaData, SchemeData } from 'components/commercetools-ui/organisms/checkout/provider/payment/types';

export enum PaymentStatuses {
  INIT = 'init',
  PENDING = 'pending',
  PAID = 'paid',
  FAILED = 'failed',
}

export type PaymentMethodType =
  | 'scheme'
  | 'klarna'
  | 'klarna_account'
  | 'klarna_paynow'
  | 'paysafecard'
  | 'swish'
  | 'trustly'
  | 'vipps'
  | 'multibanco'
  | 'ideal';

export interface PaymentMethod {
  name: string;
  type: PaymentMethodType;
  image: {
    src: string;
  };
}

export interface RedirectAction {
  type: 'redirect';
  method: string;
  data?: unknown;
  url: string;
  paymentMethodType: string;
}

export interface ThreeDS2Action {
  type: 'threeDS2';
  authorisationToken: string;
  paymentData: string;
  paymentMethodType: string;
  subtype: string;
  token: string;
  url: string;
}
export type PaymentAction = RedirectAction | ThreeDS2Action;

export type PaymentResponse = {
  additionalData: Record<string, string>;
  pspReference: string;
  resultCode:
    | 'Authorised'
    | 'Cancelled'
    | 'Error'
    | 'Refused'
    | 'RedirectShopper'
    | 'IdentifyShopper'
    | 'ChallengeShopper';
  merchantReference: string;
  action?: PaymentAction;
};

export interface SchemePaymentRequestPayload {
  amount: {
    currency: string;
    value: number;
  };
  reference: string;
  paymentMethod: SchemeData;
  returnUrl: string;
  channel: 'web';
  origin: string;
  countryCode: string;
  shopperLocale: string;
  browserInfo: {
    acceptHeader: string;
    colorDepth: number;
    javaEnabled: boolean;
    javaScriptEnabled?: boolean;
    language: string;
    screenHeight: number;
    screenWidth: number;
    timeZoneOffset: number;
    userAgent: string;
  };
  authenticationData: {
    threeDSRequestData: {
      nativeThreeDS: 'preferred';
    };
  };
  metadata?: Record<string, unknown>;
}

export interface KlarnaLineItem {
  id: string;
  quantity: string;
  description: string;
  amountIncludingTax: number | string;
  productUrl?: string;
  imageUrl?: string;
}

export interface KlarnaPaymentRequestPayload {
  amount: {
    currency: string;
    value: number;
  };
  reference: string;
  paymentMethod: Pick<KlarnaData, 'type'>;
  returnUrl: string;
  countryCode: string;
  shopperLocale: string;
  shopperReference: string;
  shopperEmail: string;
  shopperName?: {
    firstName: string;
    lastName?: string;
  };
  lineItems: Array<KlarnaLineItem>;
  metadata?: Record<string, unknown>;
}

export type PaymentRequestPayload = SchemePaymentRequestPayload | KlarnaPaymentRequestPayload;
export interface Payment {
  /**
   * An internal ID to identify this payment
   */
  id: string;

  /**
   * The name of the payment service provider
   */
  paymentProvider: string;

  /**
   * The ID used by the payment service provider for this payment
   */
  paymentId: string;

  /**
   * How much money this payment intends to receive from the customer. The value usually matches the cart or order gross total.
   */
  amountPlanned: Money;

  /**
   * A text describing the current status of the payment
   */
  debug?: string;

  /**
   * One of the `PaymentStatuses` constants
   */
  paymentStatus: string;

  version?: number;

  /**
   * The descriptor of the payment method used for this payment
   */
  paymentMethod: string;

  // TODO: do we need paymentDetails if not using custom fields?
  paymentDetails?: [];
  cardSummary: string;
}
