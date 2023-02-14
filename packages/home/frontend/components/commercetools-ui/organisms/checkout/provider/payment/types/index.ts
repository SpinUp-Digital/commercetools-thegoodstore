import {
  PaymentAction,
  PaymentMethod,
  PaymentRequestPayload,
  KlarnaPaymentRequestPayload,
  PaymentResponse,
} from 'types/payment';

export interface SchemeData {
  type: 'scheme';
  brand: string;
  holderName: string;
  number: string;
  expiryMonth: string;
  expiryYear: string;
  cvc: string;
}

export interface KlarnaData {
  type: 'klarna_paynow';
  shopperEmail: string;
  shopperFirstName: string;
  shopperLastName?: string;
}

export type PaymentData = SchemeData | KlarnaData;

export type ThreeDS2AuthCallback = (response: PaymentResponse) => void;

export interface PaymentProvider {
  paymentData: PaymentData;
  paymentDataIsValid: boolean;
  processing: boolean;
  setProcessing: (val: boolean) => void;
  setPaymentData: (data: PaymentData) => void;
  getPaymentMethods: () => Promise<PaymentMethod[]>;
  makePayment: (data: Omit<PaymentRequestPayload, 'paymentMethod'>) => Promise<PaymentResponse>;
  makeKlarnaPayment: (
    data: Omit<KlarnaPaymentRequestPayload, 'paymentMethod' | 'shopperEmail' | 'shopperName'>,
  ) => Promise<PaymentResponse>;
  handleThreeDS2Action: (action: PaymentAction, cb: ThreeDS2AuthCallback) => Promise<void>;
}
