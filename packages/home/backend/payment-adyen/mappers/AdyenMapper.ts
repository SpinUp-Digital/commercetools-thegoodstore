import { AdyenPaymentResponse } from 'payment-adyen/types/payment';
import { AdyenPaymentMethod } from '../types/paymentMethod';
import { PaymentMethod, PaymentResponse } from '../../types/payment';

export class AdyenMapper {
  static adyenPaymentMethodToPaymentMethod(adyenPaymentMethod: AdyenPaymentMethod) {
    return adyenPaymentMethod as PaymentMethod;
  }

  static adyenPaymentResponseToPaymentResponse(adyenPaymentResponse: AdyenPaymentResponse) {
    return adyenPaymentResponse as PaymentResponse;
  }
}
