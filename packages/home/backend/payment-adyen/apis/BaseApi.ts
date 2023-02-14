import axios, { AxiosInstance } from 'axios';
import { AdyenMapper } from '../mappers/AdyenMapper';
import { AdyenPaymentMethod } from '../types/paymentMethod';
import { AdyenPaymentResponse } from '../types/payment';

interface AdyenConfig {
  apiKey: string;
  merchantAccount: string;
  baseUrl: string;
  clientKey: string;
}

class BaseApi {
  private instance: AxiosInstance;

  constructor(config: AdyenConfig) {
    //Axios instance
    this.instance = axios.create({
      baseURL: config.baseUrl,
      headers: {
        'x-API-key': config.apiKey,
        'content-type': 'application/json',
      },
    });

    //Request interceptor
    this.instance.interceptors.request.use((req) => {
      req.data = { ...(req.data || {}), merchantAccount: config.merchantAccount };
      return req;
    });
  }

  async getPaymentMethods({ locale, country }: { locale: string; country: string }) {
    const response = await this.instance.post<{ paymentMethods: AdyenPaymentMethod[] }>('/paymentMethods', {
      countryCode: country,
      shopperLocale: locale,
    });

    return response.data.paymentMethods.map((paymentMethod) =>
      AdyenMapper.adyenPaymentMethodToPaymentMethod(paymentMethod),
    );
  }

  async makePayment(data: unknown) {
    const response = await this.instance.post<AdyenPaymentResponse>('/payments', data);

    return AdyenMapper.adyenPaymentResponseToPaymentResponse(response.data);
  }

  async paymentDetails(data: unknown) {
    const response = await this.instance.post<AdyenPaymentResponse>('/payments/details', data);

    return AdyenMapper.adyenPaymentResponseToPaymentResponse(response.data);
  }
}

export default BaseApi;
